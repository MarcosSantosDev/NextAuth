import { parseCookies, setCookie, destroyCookie } from 'nookies';

import { COOKIE_AUTH_TOKEN, COOKIE_AUTH_REFRESHTOKEN } from '@/common/constants/storage';

export function getAuthenticationToken() {
  const cookies = parseCookies();

  const authToken = cookies[COOKIE_AUTH_TOKEN];

  return authToken;
}

export function getAuthenticationRefreshToken() {
  const cookies = parseCookies();

  const authToken = cookies[COOKIE_AUTH_REFRESHTOKEN];

  return authToken;
}

type AuthenticationTokens = {
  token: string;
  refreshToken: string;
}

export function setAuthenticationTokens(tokens: AuthenticationTokens) {
  setCookie(null, COOKIE_AUTH_TOKEN, tokens.token, {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/'
  });
  setCookie(null, COOKIE_AUTH_REFRESHTOKEN, tokens.refreshToken, {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/'
  });
}

export function destroyAuthenticationTokens() {
  destroyCookie(null, COOKIE_AUTH_TOKEN);
  destroyCookie(null, COOKIE_AUTH_REFRESHTOKEN);
}
