import { useRouter } from 'next/router';
import {
  addApolloState,
  createApolloClient,
  initializeApollo,
} from '../../../apollo';
import ArticleList from '../../../components/Article/ArticleList';
import { useEffect, useRef, useState } from 'react';
import { PostFormatToPostConnection } from '../../../__generated__/graphql';
import { getArticlesByTag } from '../../../lib/articles';
import { GetServerSideProps } from 'next/types';
type Posts = {
  posts: PostFormatToPostConnection;
};
export default function Page() {
  const [articles, setArticles] = useState<Posts>();
  const router = useRouter();
  const { tag } = router.query;
  getArticlesByTag(tag).then(({ data }) => {
    setArticles(data);
  });
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    if (isMounted.current) {
      getArticlesByTag(tag).then(({ data }) => {
        setArticles(data);
      });
    }
    return () => {
      isMounted.current = false;
    };
  }, [articles]);

  return (
    <div>
      <h1>posts</h1>
      {!articles?.posts?.nodes[0]?.content?.length && <p>loading...</p>}
      {articles?.posts?.nodes[0]?.content?.length > 0 && (
        <ArticleList articles={articles}></ArticleList>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const client = createApolloClient();
  const tags = ctx.params;
  let response: Posts;
  await getArticlesByTag(tags).then(({ data }) => {
    response = data;
  });
  return addApolloState(client, {
    props: { response },
  });
};
