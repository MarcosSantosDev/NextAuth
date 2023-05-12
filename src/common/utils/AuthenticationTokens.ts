import { GetServerSidePropsContext } from 'next';

import { parseCookies, setCookie, destroyCookie } from 'nookies';

import { COOKIE_AUTH_TOKEN, COOKIE_AUTH_REFRESHTOKEN } from '@/common/constants/storage';

type Tokens = {
  token: string;
  refreshToken: string;
}

class AuthenticationTokens {
  private context: GetServerSidePropsContext | null;

  constructor(context: GetServerSidePropsContext | null = null) {
    this.context = context;    
  }

  public getToken() {
    const cookies = parseCookies(this.context);
    const authToken = cookies[COOKIE_AUTH_TOKEN];
    return authToken;
  }

  public getRefreshToken() {
    const cookies = parseCookies(this.context);
    const authToken = cookies[COOKIE_AUTH_REFRESHTOKEN];
    return authToken;
  }

  public setAuthenticationTokens(tokens: Tokens) {
    setCookie(this.context, COOKIE_AUTH_TOKEN, tokens.token, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/'
    });
    setCookie(this.context, COOKIE_AUTH_REFRESHTOKEN, tokens.refreshToken, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/'
    });
  }

  public destroyAuthenticationTokens() {
    destroyCookie(this.context, COOKIE_AUTH_TOKEN);
    destroyCookie(this.context, COOKIE_AUTH_REFRESHTOKEN);
  }
}

export default AuthenticationTokens;
