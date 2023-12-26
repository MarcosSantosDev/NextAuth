import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { jwtDecode } from "jwt-decode"

import { AuthTokenError } from "@/common/services/errors";

import AuthenticationTokens from "./AuthenticationTokens";
import { validateUserPermissions } from "./validateUserPermissions";

type WithSSRAuthOptions = {
  permissions?: string[];
  roles?: string[];
}

export function withSSRAuth<P extends { [key: string]: any; }>(fn: GetServerSideProps<P>, options?: WithSSRAuthOptions) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const authenticationTokens = new AuthenticationTokens(ctx);
    
    const token = authenticationTokens.getToken();

    if(!token) {
      authenticationTokens.destroyAuthenticationTokens();

      return {
        redirect: {
          destination: '/signIn',
          permanent: false
        }
      }
    }

    if (options) {
      const userJWTDecoded = jwtDecode<{ permissions: string[]; roles: string[]; }>(token)
  
      const userHasValidPermissions = validateUserPermissions({
        user: userJWTDecoded,
        permissions: options?.permissions,
        roles: options?.roles
      });

      if (!userHasValidPermissions) {
        return {
          redirect: {
            destination: '/home',
            permanent: false
          }
        }
      }
    }

    try {
      return await fn(ctx);
    } catch (error) {
      if (error instanceof AuthTokenError) {
        authenticationTokens.destroyAuthenticationTokens();
      }

      return {
        redirect: {
          destination: '/signIn',
          permanent: false
        }
      }
    }
  }
}
