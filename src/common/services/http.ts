import { GetServerSidePropsContext } from 'next';

import axiosInstance from './axiosInstance';
import { applyAxiosInterceptors } from './axiosInterceptors';

export const serverHttp = (context: GetServerSidePropsContext) => {
  return applyAxiosInterceptors({ axiosInstance, context });
}

export const clientHttp = applyAxiosInterceptors({ axiosInstance });
