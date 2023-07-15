import Link from 'next/link';
import {
  NodeWithAuthorToUserConnectionEdge,
  PostToTagConnection,
} from '../../__generated__/graphql';
import ArticleHeader from './ArticleHeader';
import ArticleTags from './ArticleTags';
import styles from './styles/Article.module.css';
import { useUserId } from '../../hooks/useUserId';
import { getCookie } from 'cookies-next';
import { useMutation, useQuery } from '@apollo/client';
import DeletePost from '../../apollo/graphql/mutation/DeletePost.graphql';
import { useEffect, useState } from 'react';
import hljs from 'highlight.js';

export default function Article(props: {
  author: NodeWithAuthorToUserConnectionEdge;
  title: string;
  date: string;
  tags: PostToTagConnection;
  content: string;
  postId: string | number;
  isShort?: true;
  srcSet?: string;
  isAuthor?: boolean;
}) {
  const [isAvatarValid, setIsAvatarValid] = useState(false);

  const isAuthor =
    props.isAuthor == undefined
      ? useUserId(getCookie('userRefreshToken')) == props.author.node.userId
      : props.isAuthor;
  const [deletePost, {}] = useMutation(DeletePost, {
    variables: {
      id: props.postId,
    },
  });

  function checkImage(imageSrc: string) {
    const img = new Image();
    img.onload = () => setIsAvatarValid(true);
    img.onerror = () => setIsAvatarValid(false);
    img.src = imageSrc;
  }
  useEffect(() => {
    if (props.srcSet) {
      checkImage(props.srcSet);
    }
    if (typeof document !== 'undefined') {
      document.querySelectorAll('code').forEach((el) => {
        hljs.highlightElement(el);
        hljs.highlightElement(el);
      });
    }
  }, [isAvatarValid]);

  return (
    <article className={styles['article']}>
      <ArticleHeader
        author={props.author}
        title={props.title}
        date={props.date}
        postid={props.postId}
      />
      {props.isShort && isAuthor && (
        <div className={styles['article__action']}>
          <Link href={`/edit-article/${props.postId}`}>Edit</Link>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              deletePost();
            }}
          >
            <input type='submit' value={'delete'} />
          </form>
        </div>
      )}
      <ArticleTags tags={props.tags} />
      <div
        className={`${styles['article__body']} ${
          styles[props.isShort ? '--short' : '']
        }`}
      >
        {props.srcSet?.length > 0 && !props.isShort && (
          <div className={styles['article__attachment']}>
            <img srcSet={props.srcSet} className='asjkdhajksd' />
          </div>
        )}
        <div
          className={styles['article__body-content']}
          dangerouslySetInnerHTML={{ __html: props.content }}
        ></div>
        {props.srcSet?.length > 0 && props.isShort && (
          <div className={styles['article__attachment']}>
            <img
              srcSet={
                isAvatarValid
                  ? props.srcSet
                  : 'http://1.gravatar.com/avatar/1a40921eb70bd71928c01f282ccb1e2c?s=96'
              }
            />
          </div>
        )}
      </div>
      {props.isShort && (
        <Link
          href={{
            pathname: '/articles/[id]',
            query: { id: props.postId },
          }}
          className={styles['article__read-more']}
          legacyBehavior={false}
        >
          Читать далее
        </Link>
      )}
    </article>
  );
}
