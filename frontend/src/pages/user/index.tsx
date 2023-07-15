import { gql, useMutation, useQuery } from '@apollo/client';
import type { GetStaticProps } from 'next';
import UserProfile from '../graphql/query/queryUserProfile.graphql';
import { addApolloState, initializeApollo } from '../../apollo';
import { User } from '../../__generated__/graphql';
import { useIsAdmin } from '../../hooks/useIsAdmin';
import UserAvatar from '../../components/UserAvatar';
type Data = {
  viewer: User;
};

export default function Page() {
  const isAdmin = useIsAdmin();
  const { data, loading, error } = useQuery<Data>(UserProfile, {});

  return (
    <>
      {data?.viewer?.username && (
        <>
          <div className='user'>
            <UserAvatar uid={data.viewer.databaseId}></UserAvatar>
            {data.viewer.username}
          </div>
          <div className='adminpanel'>{isAdmin && 'adminpanel'}</div>
        </>
      )}
    </>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const client = initializeApollo();
  return addApolloState(client, {
    props: {},
  });
};
