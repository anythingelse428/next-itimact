import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { useIsAuth } from './hooks/useIsAuth';

const onlyForAuthUsers = (pathname: string) =>
  pathname.indexOf('/user') > -1 || pathname.indexOf('/create-post') > -1;

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isAuth = useIsAuth(request.cookies.get('userRefreshToken'));
  if (onlyForAuthUsers(pathname) && !isAuth) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }
  // return NextResponse.redirect(new URL('/home', request.url));
}

// See "Matching Paths" below to learn more
