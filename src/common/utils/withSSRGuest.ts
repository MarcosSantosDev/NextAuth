import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";

import AuthenticationTokens from "./AuthenticationTokens";

export function withSSRGuest<P extends { [key: string]: any; }>(fn: GetServerSideProps<P>) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const authenticationTokens = new AuthenticationTokens(ctx);
    
    const token = authenticationTokens.getToken();
    const refreshtoken = authenticationTokens.getRefreshToken();

    if(token && refreshtoken) {
      return {
        redirect: {
          destination: '/home',
          permanent: false
        }
      }
    }

    return await fn(ctx);
  }
}
