import styles from './styles/tags/Tags.module.css';
import Link from 'next/link';
import { PostToTagConnection } from '../../__generated__/graphql';
export default function ArticleTags(props: { tags: PostToTagConnection }) {
  return (
    <div className={`${styles['article-tags']} container`}>
      {props.tags.nodes.map((tag) => (
        <div className={styles['article__tag']} key={tag.name}>
          <Link
            href={{ pathname: '/articles/tag/[tag]', query: { tag: tag.id } }}
          >
            {tag.name}
          </Link>
        </div>
      ))}
    </div>
  );
}
