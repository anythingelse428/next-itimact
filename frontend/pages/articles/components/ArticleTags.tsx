import { PostToTagConnection } from '../../../src/__generated__/graphql';
import styles from '../../../styles/article/tags/Tags.module.css';
import Link from 'next/link';
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
