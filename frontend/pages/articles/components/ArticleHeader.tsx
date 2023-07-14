import moment from 'moment';
import { NodeWithAuthorToUserConnectionEdge } from '../../../src/__generated__/graphql';
import UserAvatar from '../../../components/UserAvatar';
import Link from 'next/link';
import style from '../../../styles/article/header/ArticleHeader.module.css';

export default function ArticleHeader(props: {
  title: string;
  date: string;
  author: NodeWithAuthorToUserConnectionEdge;
  postid: string | number;
}) {
  return (
    <>
      <div className={style['article__header']}>
        <div className={style['article__meta-container']}>
          <div className={style['article__meta']}>
            <div className={style['article__author']}>
              <UserAvatar
                uid={props.author.node.databaseId || props.author.node.userId}
                width={24}
              ></UserAvatar>
              <div className={style['article__author-name']}>
                {props.author.node.name}
              </div>
            </div>
            <time
              dateTime={moment(props.date).format()}
              className={style['article__date-time']}
            >
              <span>{moment(props.date).format('DD/MM/YYYY')}</span>в
              <span>{moment(props.date).format('HH:MM')}</span>
            </time>
          </div>
        </div>
        <h1>
          <Link href={`/articles/${props.postid}`}>{props.title}</Link>
        </h1>
      </div>
    </>
  );
}
