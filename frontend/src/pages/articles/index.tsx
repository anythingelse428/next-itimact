import { useQuery } from '@apollo/client';
import GetArticles from '../graphql/query/Articles.graphql';
import moment from 'moment';
import { PostFormatToPostConnection } from '../../__generated__/graphql';
import ArticleList from '../../components/Article/ArticleList';
import { useEffect, useRef, useState } from 'react';
import { addApolloState, createApolloClient } from '../../apollo';
import { getAllArticles } from '../../lib/articles';
type Posts = {
  posts: PostFormatToPostConnection;
};

const before = moment().format('DD.MM.YYYY');
const after = moment(moment().subtract(30, 'days')).format('DD.MM.YYYY');
export default function Page() {
  const [posts, setPosts] = useState<Posts>();
  getAllArticles().then(({ data }) => {
    setPosts(data);
  });

  const isMounted = useRef(false);
  useEffect(() => {
    if (isMounted.current) {
      getAllArticles().then(({ data }) => {
        setPosts(data);
      });
    }
    return () => {
      isMounted.current = false;
    };
  }, [posts]);

  return (
    <div>
      <h1>posts</h1>

      {!posts?.posts?.nodes[0]?.content?.length && <p>loading...</p>}
      {posts?.posts?.nodes[0]?.content?.length > 0 && (
        <ArticleList articles={posts} />
      )}
    </div>
  );
}

export const getServerSideProps = async () => {
  const client = createApolloClient();
  let response: Posts;
  await getAllArticles().then(({ data }) => {
    response = data;
  });
  return addApolloState(client, {
    props: { response },
  });
};
