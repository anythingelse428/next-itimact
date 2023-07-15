import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import TagByName from '../pages/graphql/query/queryTagsByName.graphql';
import styles from '../styles/create-article/CreateArticle.module.css';

export default function InputTags({ handleClick, oldTags, className }) {
  const [inputTag, setInputTag] = useState('');
  const [tags, setTags] = useState([]);
  const [foundTags, setFoundTags] = useState([]);
  const tagsByName = useQuery(TagByName, {
    variables: {
      nameLike: inputTag,
    },
  });
  useEffect(() => {
    if (tags.length === 0 && oldTags?.length > 0) {
      setTags(oldTags);
    }
    if (oldTags?.length != tags.length) {
      handleClick(tags);
    }
    if (inputTag.length > 2) {
      setFoundTags(tagsByName?.data?.tags.nodes);
    }
  }, [tags, foundTags, inputTag, oldTags]);
  function fillTags(evt: React.KeyboardEvent<HTMLInputElement>) {
    const newTagName = evt.target?.value || evt.target?.innerText;
    if (
      (evt.code === 'Enter' ||
        evt.target.className === styles['create-article__pseudotag']) &&
      newTagName.length > 0
    ) {
      evt.preventDefault();
      console.log('1lelvel');

      if (tags.find((el) => el.name === newTagName)?.name == undefined) {
        setTags(() => [...tags, { name: newTagName }]);
        setTimeout(() => {
          handleClick(tags);
          setInputTag('');
        }, 0);
      } else {
        alert('tag exist');
      }
    }
    return false;
  }
  return (
    <div className={styles['create-article__tags']}>
      <div className={styles['create-article__pseudotag-container']}>
        {tags &&
          tags.map((el, idx) => (
            <div className={styles['create-article__pseudotag']} key={idx}>
              {el.name}
            </div>
          ))}
      </div>
      <input
        className={`${className} ${styles['--tags']}`}
        type='text'
        placeholder={
          tags[0]?.name?.length > 0
            ? ''
            : 'Теги. Что бы добавить много тегов, ставьте ентер'
        }
        value={inputTag}
        onChange={(e) => {
          setInputTag(e.target.value);
        }}
        onKeyDown={(e) => {
          fillTags(e);
        }}
      />
      {inputTag.length > 0 && foundTags && foundTags[0]?.name.length > 0 && (
        <div className={styles['create-article__tags-guessing']}>
          {foundTags.map((el) => (
            <div
              className={styles['create-article__pseudotag']}
              key={el.id}
              onClick={(e) => {
                fillTags(e);
                setTimeout(() => {
                  setFoundTags([]);
                }, 0);
              }}
            >
              {el.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
