import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { COOKIE_AUTH_TOKEN } from './common/constants/storage';

const routes = {
  guest: ['/signIn'],
  private: ['/home']
}

export function middleware(request: NextRequest) {
  const nextCookies = request.cookies;
  const nextPathname = request.nextUrl.pathname;
  const authorizationToken = nextCookies.get(COOKIE_AUTH_TOKEN);
  const isRootPath = nextPathname === '/'

  if (!!authorizationToken?.value) {
    if (routes.guest.includes(nextPathname) || isRootPath) {
      return NextResponse.redirect(new URL('/home', request.url));
    }
  } else if (routes.private.includes(nextPathname)) {
    return NextResponse.redirect(new URL('/signIn', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!.*\\.).*)', '/signIn', '/home'],
};