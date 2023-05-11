import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { COOKIE_AUTH_TOKEN } from './common/constants/storage';

export function middleware(request: NextRequest) {
  const isSignInPage = request.nextUrl.pathname === '/signIn'
  const isRootPathPage = request.nextUrl.pathname === '/'

  const authToken = request.cookies.get(COOKIE_AUTH_TOKEN);

  const isAuthenticated = Boolean(authToken);

  if (isAuthenticated && (isRootPathPage || isSignInPage)) {
    return NextResponse.redirect(new URL('/home', request.url));
  } else if (!isAuthenticated) {
    if (!isSignInPage) {
      return NextResponse.redirect(new URL('/signIn', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!.*\\.).*)', '/signIn', '/home'],
};