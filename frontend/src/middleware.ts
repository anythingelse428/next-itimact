import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { useIsAuth } from './hooks/useIsAuth';
import useIsAuthor from './hooks/useIsAuthor';
const onlyForAuthUsers = (pathname: string) =>
  pathname.indexOf('user') > -1 ||
  pathname.indexOf('create-') > -1 ||
  pathname.indexOf('edit-') > -1 ||
  pathname.indexOf('delete-') > -1;
const onlyForAuthor = (pathname: string) => {
  pathname.indexOf('edit-') > -1 || pathname.indexOf('delete-') > -1;
};
export async function middleware(request: NextRequest) {
  const userToken = request.cookies.get('userRefreshToken');
  const pathname = request.nextUrl.pathname;
  const isAuth = useIsAuth(userToken);
  const isAuthor = await useIsAuthor(
    userToken,
    request.nextUrl.search.replace('?id=', '')
  );
  if (onlyForAuthUsers(pathname) && !isAuth) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }
  // console.log('author', isAuthor);
  // if (onlyForAuthor && !isAuthor) {
  //   return NextResponse.redirect(new URL('/', request.url));
  // }
  // return NextResponse.redirect(new URL('/home', request.url));
}

// See "Matching Paths" below to learn more
