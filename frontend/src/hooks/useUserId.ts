import { gql, useQuery } from '@apollo/client';
import { useIsAuth } from './useIsAuth';
import * as jose from 'jose';

export function useUserId(token: string) {
  if (useIsAuth(token)) {
    return jose.decodeJwt(token).data.user.id;
  }
  return false;
}
