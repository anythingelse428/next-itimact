import type { GetStaticPaths, GetStaticProps } from 'next';
import { addApolloState, initializeApollo } from '../../apollo';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import { useEffect, useRef, useState } from 'react';
import PostForm from '../../components/PostForm/PostForm';
import updatePost from '../graphql/mutation/UpdatePost.graphql';
import useIsAuthor from '../../hooks/useIsAuthor';

export default function Page() {
  const router = useRouter();
  const { id } = router.query;
  const [isAuthor, setIsAuthor] = useState<boolean>(null);
  useIsAuthor(String(getCookie('userRefreshToken')), id).then((res) => {
    setIsAuthor(res);
  });

  return (
    <>
      {isAuthor == null && 'loading'}
      {!isAuthor && typeof isAuthor === 'boolean' && 'err'}
      {isAuthor && (
        <PostForm mutation={updatePost} action='updatePost' id={id} />
      )}
    </>
  );
}

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const client = initializeApollo();
  return addApolloState(client, {
    props: {},
  });
};
