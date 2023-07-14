import { useEffect, useRef, useState } from 'react';
import styles from '../../styles/create-article/CreateArticle.module.css';
import MarkupEditor from './../MarkupEditor';
import { gql, useQuery } from '@apollo/client';

type Props = {
  action: 'createPost' | 'updatePost';
  handleChange: Function;
  title?: string;
  content?: string;
  id?: string | number;
};
export default function FirstStep(props: Props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { data, loading, error, subscribeToMore } = useQuery(gql`
      query GetFirstStep($id: ID = ${props?.id}) {
        post(id: $id, idType: DATABASE_ID) {
          title
          content
        }
      }
    `);
  useEffect(() => {
    setTimeout(() => {
      props.handleChange({ title, content });
    }, 0);
  }, []);
  if (
    props.action === 'updatePost' &&
    data?.post?.content?.length > 0 &&
    content?.length === 0
  ) {
    setContent(data?.post?.content);
    setTitle(data?.post?.title);
    props.handleChange({ title, content });
  }
  {
    loading && <p>loading...</p>;
  }
  return (
    <div className={styles['create-article']}>
      <form className={styles['create-article__form']}>
        <textarea
          className={`${styles['create-article__input']} ${styles['--title']}`}
          value={title}
          placeholder='Заголовок публикации'
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <MarkupEditor
          content={content}
          className={`${styles['create-article__input']} ${styles['--content']}`}
          handleInput={(e) => setContent(e)}
        />
      </form>
    </div>
  );
}
