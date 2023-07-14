import {
  Post,
  PostFormatToPostConnection,
} from '../../../src/__generated__/graphql';
import { useUserId } from '../../../hooks/useUserId';
import { getCookie } from 'cookies-next';
import styles from '../../../styles/article/Article.module.css';

import Article from './Article';
type Posts = {
  posts: PostFormatToPostConnection;
};

export default function ArticleList(props: { articles: Posts }) {
  // console.log(props.articles);
  // if (props.articles.posts?.nodes[0]?.content?.length == undefined) {
  //   return <>Постов нема</>;
  // }

  const uid = useUserId(getCookie('userRefreshToken'));
  return (
    <div className={styles['article__list']}>
      {props.articles.posts.nodes.map((post: Post) => (
        <Article
          author={post.author}
          title={post.title}
          date={post.date}
          tags={post.tags}
          content={post.content}
          postId={post.databaseId}
          isShort={true}
          key={post.id}
          srcSet={post?.featuredImageUrl}
          isAuthor={post?.author?.node?.userId == uid}
        />
      ))}
    </div>
  );
}
