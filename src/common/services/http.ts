import { applyAxiosInterceptors } from './axiosInterceptors';
import { applyAxiosInterceptorsSSR } from './axiosInterceptorsSSR';

export const setupClientHttp = applyAxiosInterceptors();
export const setupSSRHttp = applyAxiosInterceptorsSSR;