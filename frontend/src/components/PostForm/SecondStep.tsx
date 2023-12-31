import { useEffect, useState } from 'react';
import { faNewspaper, faToiletPaper } from '@fortawesome/free-solid-svg-icons';
import { gql, useQuery } from '@apollo/client';

import InputTags from '../InputTags';
import ToggleSwitch from '../ToggleSwitch';
import MarkupEditor from '../MarkupEditor/MarkupEditor';
import styles from '../../styles/create-article/CreateArticle.module.css';

type Props = {
  handleChange: Function;
  handleSubmit: Function;
  id?: string | number;
  action: 'createPost' | 'updatePost';
};
export default function SecondStep(props: Props) {
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [featuredImg, setFeaturedImg] = useState(null);
  const [featuredPreview, setFeaturedPreview] = useState(null);
  const [status, setStatus] = useState('DRAFT');
  const [description, setDescription] = useState('');
  function handleFile(e) {
    const fr = new FileReader();
    const file = e.target.files[0];
    fr.readAsDataURL(file);
    fr.onload = function (e) {
      e.preventDefault();
      setFeaturedImg(this.result);
      setFeaturedPreview(this.result);
    };
    handleChange();
  }
  function handleChange() {
    setTimeout(() => {
      props.handleChange({
        tags,
        categories,
        featuredImg,
        status,
        description,
      });
    }, 1);
  }
  const { data, loading, error, subscribeToMore } = useQuery(gql`
      query GetSecondStep($id: ID = ${props?.id}) {
        post(id: $id, idType: DATABASE_ID) {
          featuredImageUrl
          description
          status
          tags {
            nodes {
              name
              id
            }
          }
          categories {
            nodes {
              name
              id
            }
          }
        }
      }
    `);

  useEffect(() => {
    handleChange();
    console.log('effect');
  }, []);

  if (props.action === 'updatePost' && tags?.length === 0) {
    setTags(data?.post?.tags?.nodes);
    setCategories(data?.post?.categories.nodes);
    setFeaturedImg(data?.post?.featuredImageUrl);
    setFeaturedPreview(data?.post?.featuredImageUrl);
    setStatus(data?.post?.status.toUpperCase());
    setDescription(data?.post?.description || '');

    handleChange();
  }
  return (
    <div className={styles['create-article']}>
      <form
        className={styles['create-article__form']}
        onSubmit={(e) => {
          e.preventDefault();
          handleChange();
          setTimeout(() => {
            props.handleSubmit(e);
          }, 10);
        }}
      >
        <div className='form-input'>
          <label htmlFor=''>Категории</label>
          <InputTags
            oldTags={categories}
            className={''}
            handleClick={(e) => {
              setCategories(e);
              handleChange();
            }}
          />
        </div>
        <div className='form-input'>
          <label htmlFor=''>Ключевые слова</label>
          <InputTags
            oldTags={tags}
            className={''}
            handleClick={(e) => {
              setTags(e);
              handleChange();
            }}
          />
        </div>

        <div className='form-input'>
          <label htmlFor=''>Описание</label>
          <MarkupEditor
            handleInput={(e) => {
              setDescription(e);
              handleChange();
            }}
            content={description}
            className={`${styles['create-article__input']} ${styles['--content']}`}
          />
        </div>

        <div className='form-input'>
          <label htmlFor=''>Обложка</label>
          {featuredPreview && <img src={featuredPreview} alt='' width={300} />}
          <input
            type='file'
            accept='image/*'
            onChange={(e) => {
              handleFile(e);
              handleChange();
            }}
          />
        </div>
        <div className='form-input'>
          <ToggleSwitch
            value={status === 'PUBLISH' || 'publish'}
            checkedIco={faNewspaper}
            uncheckedIco={faToiletPaper}
            handleClick={(e) => {
              setStatus(e ? 'PUBLISH' : 'DRAFT');
              handleChange();
            }}
          />
        </div>
        <input type='submit' value='Опубликовать' />
      </form>
    </div>
  );
}
