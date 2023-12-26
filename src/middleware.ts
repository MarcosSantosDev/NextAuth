import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { COOKIE_AUTH_TOKEN, COOKIE_AUTH_REFRESHTOKEN } from '@/common/constants/storage';

const routes = {
  guestNoAuth: ['/signIn'],
  guest: ['/about'],
  private: ['/home', '/metrics', '/users']
}

export function middleware(request: NextRequest) {
  const nextCookies = request.cookies;
  const nextPathname = request.nextUrl.pathname;

  const authorizationToken = nextCookies.get(COOKIE_AUTH_TOKEN)?.value;

  const isRootPath = nextPathname === '/'

  const mountNewUrl = (urlToRedirect: string) => new URL(urlToRedirect, request.url)

  if (authorizationToken) {
    if (isRootPath || routes.guestNoAuth.includes(nextPathname)) {
      return NextResponse.redirect(mountNewUrl('/home'));
    }

    if (routes.guest.includes(nextPathname) || routes.private.includes(nextPathname)) {
      return NextResponse.next();
    }
  }
  
  if (!authorizationToken) {
    if (isRootPath || routes.private.includes(nextPathname)) {
      const response = NextResponse.redirect(mountNewUrl('/signIn'));
      response.cookies.delete(COOKIE_AUTH_REFRESHTOKEN)
      return response;
    }
    
    if (routes.guest.includes(nextPathname) || routes.guestNoAuth.includes(nextPathname)) {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!.*\\.).*)', '/signIn', '/about', '/home', '/metrics', '/users'],
};