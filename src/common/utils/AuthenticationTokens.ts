import { GetServerSidePropsContext } from 'next';
import { parseCookies, setCookie, destroyCookie } from 'nookies';

import { COOKIE_AUTH_TOKEN, COOKIE_AUTH_REFRESHTOKEN, COOKIE_AUTH_MAX_AGE } from '@/common/constants/storage';

type Tokens = {
  token: string;
  refreshToken: string;
}

class AuthenticationTokens {
  private context?: GetServerSidePropsContext;

  constructor(context?: GetServerSidePropsContext) {
    this.context = context;
  }

  public getCookies() {
    const cookies = parseCookies(this.context);
    return cookies
  }

  public getToken() {
    const cookies = this.getCookies();
    const authToken = cookies?.[COOKIE_AUTH_TOKEN];
    return authToken;
  }

  public getRefreshToken() {
    const cookies = this.getCookies();
    const authToken = cookies?.[COOKIE_AUTH_REFRESHTOKEN];
    return authToken;
  }

  public setAuthenticationTokens(tokens: Tokens) {
    setCookie(this.context, COOKIE_AUTH_TOKEN, tokens.token, {
      path: '/',
      maxAge: COOKIE_AUTH_MAX_AGE,
    });
    setCookie(this.context, COOKIE_AUTH_REFRESHTOKEN, tokens.refreshToken, {
      path: '/',
      maxAge: COOKIE_AUTH_MAX_AGE,
    });
  }

  public destroyAuthenticationTokens() {
    destroyCookie(this.context, COOKIE_AUTH_TOKEN);
    destroyCookie(this.context, COOKIE_AUTH_REFRESHTOKEN);
  }
}

export default AuthenticationTokens;
