import {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError
} from 'axios';

import {
  getAuthenticationRefreshToken,
  getAuthenticationToken,
  setAuthenticationTokens,
} from '@/common/utils/auth';
import { signOut } from '@/common/context';
import clientHttp from './clientHttp';
import { authRefreshToken } from './requests/auth';
import { InterceptorResponseError  } from './types';

export const requestSuccess = (config: InternalAxiosRequestConfig) => {
  const authenticationToken = getAuthenticationToken();

  if (authenticationToken) {
    config.headers.Authorization = `Bearer ${authenticationToken}`;
  }

  return config;
}

export const requestError = (error: AxiosError) => {
  return error;
}

export const responseSuccess = (response: AxiosResponse) => {
  return response;
}

type FailedRequestsQueue = {
  onSuccess: () => void;
  onFailure: (error: AxiosError<InterceptorResponseError>) => void
}

let failedRequestsQueue: FailedRequestsQueue[] = [];
let isRefreshing = false;

export const responseError = (error: AxiosError<InterceptorResponseError>) => {
  const originalConfig = error.config;

  if (error.response && error.response.status === 401) {
    const refreshToken = getAuthenticationRefreshToken();

    if (error.response.data?.code === 'token.expired' && refreshToken) {
      if (!isRefreshing) {
        isRefreshing = true;

        authRefreshToken(refreshToken)
          .then((response) => {
            setAuthenticationTokens({
              token: response.token,
              refreshToken: response.refreshToken,
            });

            failedRequestsQueue.forEach(request => request.onSuccess());
            failedRequestsQueue = [];
          })
          .catch((error) => {
            failedRequestsQueue.forEach(request => request.onFailure(error));
            failedRequestsQueue = [];
          })
          .finally(() => {
            isRefreshing = false;
          });
      }

      return new Promise((resolve, reject) => {
        failedRequestsQueue.push({
          onSuccess: () => {
            if (originalConfig) {
              resolve(clientHttp(originalConfig));
            }
          },
          onFailure: (error: AxiosError<InterceptorResponseError>) => {
            reject(error);
          },
        })
      })
    } else {
      signOut();
    }
  }

  return Promise.reject(error);
}
