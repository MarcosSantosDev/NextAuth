import { GetServerSidePropsContext } from 'next';
import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios'
import { serialize } from 'cookie';

import axiosDefaults from '@/common/services/axiosDefaults';
import { AuthTokenError } from '@/common/services/errors';
import { COOKIE_AUTH_TOKEN, COOKIE_AUTH_REFRESHTOKEN, COOKIE_AUTH_MAX_AGE } from '@/common/constants/storage';
import { InterceptorResponseError } from './types';

const SET_COOKIE_HEADER = 'set-cookie'

export const applyAxiosInterceptorsSSR = (context: GetServerSidePropsContext) => {
  const axiosInstance = axios.create(axiosDefaults);

  const refreshTokens = async () => {
    try {
      const response = await axiosInstance.post('/refresh', {
        refreshToken: context.req.cookies[COOKIE_AUTH_REFRESHTOKEN]
      })

      context.req.cookies = {
        [COOKIE_AUTH_TOKEN]: response.data.token,
        [COOKIE_AUTH_REFRESHTOKEN]: response.data.refreshToken
      }
      context.res.setHeader(SET_COOKIE_HEADER, [
        serialize(COOKIE_AUTH_TOKEN, response.data.token, {
          path: '/',
          maxAge: COOKIE_AUTH_MAX_AGE
        }),
        serialize(COOKIE_AUTH_REFRESHTOKEN, response.data.refreshToken, {
          path: '/',
          maxAge: COOKIE_AUTH_MAX_AGE
        })
      ])

      return response;
    } catch (error) {
      return Promise.reject(new AuthTokenError());
    }
  }

  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (context.req.cookies[COOKIE_AUTH_TOKEN]) {
        config.headers.Authorization = `Bearer ${context.req.cookies[COOKIE_AUTH_TOKEN]}`;
      }

      return config;
    },
    (error: AxiosError) => error
  );

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError<InterceptorResponseError>) => {
      const originalConfig = error.config;

      if (error.response?.status === 401) {
        if (error.response.data?.code === 'token.expired') {
          await refreshTokens()

          if (originalConfig) {
            return Promise.resolve(axiosInstance(originalConfig));
          }
        } else {
          return Promise.reject(new AuthTokenError())
        }
      }

      return Promise.reject(error);
    }
  )

  return axiosInstance
}
