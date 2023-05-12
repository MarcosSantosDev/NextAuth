import { GetServerSidePropsContext } from 'next';
import type {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosInstance
} from 'axios';

import AuthenticationTokens from '@/common/utils/AuthenticationTokens';
import { signOut } from '@/common/context';
import { InterceptorResponseError  } from './types';
import { AuthTokenError } from './errors/AuthTokenError';

type AxiosInterceptorConfig = {
  axiosInstance: AxiosInstance;
  context?: GetServerSidePropsContext | null;
}

type FailedRequestsQueue = {
  onSuccess: () => void;
  onFailure: (error: AxiosError<InterceptorResponseError>) => void
}

let failedRequestsQueue: FailedRequestsQueue[] = [];
let isRefreshing = false;

export const applyAxiosInterceptors = ({
  axiosInstance,
  context = null
}: AxiosInterceptorConfig) => {
  const authenticationTokens = new AuthenticationTokens(context);

  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (authenticationTokens.getToken()) {
        config.headers.Authorization = `Bearer ${authenticationTokens.getToken()}`;
      }
    
      return config;
    },
    (error: AxiosError) => error
  );

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError<InterceptorResponseError>) => {
      const originalConfig = error.config;

      if (error.response && error.response.status === 401) {
        const refreshToken = authenticationTokens.getRefreshToken();

        if (error.response.data?.code === 'token.expired' && refreshToken) {
          if (!isRefreshing) {
            isRefreshing = true;

            axiosInstance.post('refresh', { refreshToken })
              .then((response) => {
                authenticationTokens.setAuthenticationTokens({
                  token: response.data.token,
                  refreshToken: response.data.refreshToken,
                });

                failedRequestsQueue.forEach(request => request.onSuccess());
                failedRequestsQueue = [];
              })
              .catch((error) => {
                failedRequestsQueue.forEach(request => request.onFailure(error));
                failedRequestsQueue = [];

                if (typeof window !== 'undefined') {
                  signOut();
                }
              })
              .finally(() => {
                isRefreshing = false;
              });
          }

          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              onSuccess: () => {
                if (originalConfig) {
                  resolve(axiosInstance(originalConfig));
                }
              },
              onFailure: (error: AxiosError<InterceptorResponseError>) => {
                reject(error);
              },
            })
          })
        } else {
          if (typeof window !== 'undefined') {
            signOut();
          } else {
            return Promise.reject(new AuthTokenError())
          }
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
}

