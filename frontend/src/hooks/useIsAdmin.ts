import { gql, useQuery } from '@apollo/client';
import { addApolloState, initializeApollo } from '../apollo';
import type { GetStaticProps } from 'next';

export function useIsAdmin() {
  const { data, loading, error } = useQuery(gql`
    query MyQuery2 {
      users(where: { role: ADMINISTRATOR }) {
        edges {
          node {
            id
          }
        }
      }
    }
  `);
  // only admin can watch this query
  if (loading || error) {
    return false;
  }
  return true;
}
