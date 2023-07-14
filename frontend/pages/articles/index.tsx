import { useQuery } from '@apollo/client';
import GetArticles from '../graphql/query/Articles.graphql';
import moment from 'moment';
import { PostFormatToPostConnection } from '../../src/__generated__/graphql';
import ArticleList from './components/ArticleList';
import { useEffect, useRef, useState } from 'react';
import { addApolloState, initializeApollo } from '../../apollo';

type Posts = {
  posts: PostFormatToPostConnection;
};

const before = moment().format('DD.MM.YYYY');
const after = moment(moment().subtract(30, 'days')).format('DD.MM.YYYY');
export default function Page() {
  const [posts, setPosts] = useState<Posts>();
  const { data, loading, error, subscribeToMore } = useQuery<Posts>(
    GetArticles,
    {
      variables: { before: before, after: after },
      onCompleted(data) {
        setPosts(data);
        console.log('data', data);
      },
    }
  );
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    if (isMounted.current) {
      subscribeToMore<Posts>({
        document: GetArticles,
        variables: { before: before, after: after },
        updateQuery: (prev, { subscriptionData }) => {
          if (
            !subscriptionData.data &&
            subscriptionData.data.posts.nodes[0].content.length > 0
          )
            return setPosts(prev);
          const newFeedItem = subscriptionData.data;
          setPosts(newFeedItem);
        },
      });
    }
    return () => {
      isMounted.current = false;
    };
  }, [posts]);
  console.log(posts);

  if (error) {
    return <p>:( an error happened</p>;
  }
  return (
    <div>
      <h1>posts</h1>

      {loading && <p>loading...</p>}
      {posts?.posts?.nodes[0]?.content?.length > 0 && (
        <ArticleList articles={posts} />
      )}
    </div>
  );
}
export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GetArticles,
    variables: { before: before, after: after },
  });

  return addApolloState(apolloClient, {
    props: {},
  });
}
