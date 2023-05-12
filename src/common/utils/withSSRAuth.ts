import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import AuthenticationTokens from "./AuthenticationTokens";
import { AuthTokenError } from "../services/errors/AuthTokenError";

export function withSSRAuth<P extends { [key: string]: any; }>(fn: GetServerSideProps<P>) {
  return async (ctx: GetServerSidePropsContext) => {
    const authenticationTokens = new AuthenticationTokens(ctx);

    try {
      return await fn(ctx);
    } catch (error) {
      if (error instanceof AuthTokenError) {
        authenticationTokens.destroyAuthenticationTokens();

        return {
          redirect: {
            destination: '/signIn',
            permanent: false
          }
        }
      }
    }
  }
}
