import { gql, useQuery } from '@apollo/client';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { addApolloState, initializeApollo } from '../../apollo';
import { useRouter } from 'next/router';
import { Post } from '../../src/__generated__/graphql';
import { useUserId } from '../../hooks/useUserId';
import { getCookie } from 'cookies-next';
import { useEffect, useRef, useState } from 'react';
import PostForm from '../../components/PostForm/PostForm';
import updatePost from '../graphql/mutation/UpdatePost.graphql';

const query = (id) => gql`query GetAuthor {
      post(id: ${id}, idType: DATABASE_ID) {
        author {
          node {
            databaseId
          }
        }
      }
    }`;

export default function Page() {
  type Data = {
    post: Post;
  };
  const uid = useUserId(getCookie('userRefreshToken'));
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<Data>(null);
  const { data, loading, error, subscribeToMore } = useQuery<Data>(query(id), {
    onCompleted(data) {
      setPost(data);
    },
  });

  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    if (isMounted) {
      subscribeToMore<Data>({
        document: query(id),
        variables: { id: id },
        updateQuery: (prev, { subscriptionData }) => {
          if (
            !subscriptionData.data &&
            subscriptionData.data?.post?.content?.length > 0
          )
            return setPost(prev);
          const newFeedItem = subscriptionData.data;
          setPost(newFeedItem);
        },
      });
    }
    return () => {
      isMounted.current = false;
    };
  }, []);
  return (
    <>
      {error || (post?.post?.author.node.databaseId != uid && <>errr</>)}
      {loading && <>loading....</>}
      {post?.post?.author.node.databaseId == uid && (
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
