import { useQuery } from '@apollo/client';
import type { GetStaticPaths, GetStaticProps } from 'next';
import GetArticle from '../graphql/query/ArticleById.graphql';
import { addApolloState, initializeApollo } from '../../apollo';
import { useRouter } from 'next/router';
import { Post } from '../../__generated__/graphql';
import style from '../../styles/article/Article.module.css';
import Article from '../../components/Article/Article';
import { useEffect, useRef, useState } from 'react';
type Data = {
  post: Post;
};

export default function Page() {
  const [post, setPost] = useState<Data>(null);
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, error, subscribeToMore } = useQuery<Data>(GetArticle, {
    variables: { id: id },
    onCompleted(data) {
      setPost(data);
    },
  });
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    if (isMounted) {
      subscribeToMore<Data>({
        document: GetArticle,
        variables: { id: id },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return setPost(prev);
          const newFeedItem = subscriptionData.data;
          setPost(newFeedItem);
        },
      });
    }

    return () => {
      isMounted.current = false;
    };
  }, [post]);
  if (error) {
    console.log(error.message);
    return <p>:( an error happened</p>;
  }
  return (
    <div className={style['article']}>
      {loading && <p>loading...</p>}
      {post?.post?.title && (
        <Article
          author={post?.post?.author}
          title={post?.post?.title}
          date={post?.post?.date}
          tags={post?.post?.tags}
          content={post?.post?.content}
          postId={post?.post?.databaseId}
          key={post?.post?.id}
          srcSet={post?.post?.featuredImageUrl}
        />
      )}
    </div>
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
