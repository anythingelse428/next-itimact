import { gql, useMutation, useQuery } from '@apollo/client';
import GetArticlesByTag from '../../graphql/query/ArticlesByTag.graphql';
import { useRouter } from 'next/router';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { addApolloState, initializeApollo } from '../../../apollo';
import ArticleList from '../components/ArticleList';
import { useEffect, useRef, useState } from 'react';
import { PostFormatToPostConnection } from '../../../src/__generated__/graphql';
type Posts = {
  posts: PostFormatToPostConnection;
};
export default function Page() {
  const [articles, setArticles] = useState<Posts>();
  const router = useRouter();
  const { tag } = router.query;
  const { data, loading, error, subscribeToMore } = useQuery<Posts>(
    GetArticlesByTag,
    {
      variables: { tagIn: tag },
      onCompleted(data) {
        setArticles(data);
      },
    }
  );
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    if (isMounted.current) {
      subscribeToMore<Posts>({
        document: GetArticlesByTag,
        variables: { tagIn: tag },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return setArticles(prev);
          const newFeedItem = subscriptionData.data;
          setArticles(newFeedItem);
        },
      });
    }
    return () => {
      isMounted.current = false;
    };
  }, [articles]);

  return (
    <div>
      <h1>posts</h1>
      {loading && <p>loading...</p>}
      {articles?.posts?.nodes[0]?.content?.length > 0 && (
        <ArticleList articles={articles}></ArticleList>
      )}
    </div>
  );
}
export const getStaticPaths: GetStaticPaths<{ tag: string }> = async () => {
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
