import * as jose from 'jose';
export function useIsAuth(token: string) {
  const backendOrigin =
    process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL;
  if (token?.length) {
    try {
      const decodedJwt = jose.decodeJwt(token);
      return decodedJwt.iss === backendOrigin;
    } catch (error) {
      console.log('err');
      console.log(error);
      return false;
    }
  }
  return false;
}
