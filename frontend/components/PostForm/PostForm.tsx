import { useRouter } from 'next/router';
import { useState } from 'react';
import { DocumentNode, useMutation } from '@apollo/client';
import {
  CreatePostPayload,
  UpdatePostPayload,
} from '../../src/__generated__/graphql';
import axios from 'axios';

import FirstStep from './FirstStep';
import SecondStep from './SecondStep';

type Post = {
  createPost?: CreatePostPayload;
  updatePost?: UpdatePostPayload;
};
type Props = {
  action: 'createPost' | 'updatePost';
  mutation: DocumentNode;
  id?: string | number;
};

export default function PostForm(props: Props) {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('DRAFT');
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [featuredImg, setFeaturedImg] = useState(null);
  const [description, setDescription] = useState('');
  const [action, { data, error, loading }] = useMutation<Post>(props.mutation);

  const router = useRouter();
  async function setImg() {
    if (typeof featuredImg?.name === 'string') {
      let url = '';
      await axios
        .post(
          process.env.NEXT_PUBLIC_BACKEND_URL + '/wp-json/wp/v2/load-feature',
          {
            selectedFile: featuredImg,
          },
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        )
        .then(({ data }) => {
          if (typeof data === 'string') {
            console.log(data);
            url = data;
            return data;
          }
        });
      return url;
    } else if (featuredImg?.length > 1) {
      return featuredImg;
    }
    return '';
  }

  async function doAction(e) {
    e.preventDefault();
    const url = await setImg();

    action({
      variables: {
        id: props?.id,
        status: status,
        title: title,
        content: content,
        tags: { nodes: tags },
        categories: { nodes: categories },
        featuredImageUrl: url,
        description: description,
      },
    }).then(({ data }) => {
      console.log('INFO', props.id, status, title, content, tags);

      const id =
        props.action === 'createPost'
          ? data.createPost.post.databaseId
          : data.updatePost.post.databaseId;
      router.push('/articles/' + id);
    });
  }
  return (
    <>
      <div style={{ display: step === 1 ? 'block' : 'none' }}>
        <FirstStep
          action={props.action}
          id={props.id}
          handleChange={(e) => {
            setContent(e.content);
            setTitle(e.title);
          }}
        />
      </div>
      <div style={{ display: step === 2 ? 'block' : 'none' }}>
        <SecondStep
          action={props.action}
          id={props.id}
          handleSubmit={(e) => doAction(e)}
          handleChange={(e) => {
            setStatus(e.status);
            setTags(e.tags);
            setFeaturedImg(e.featuredImg);
            setCategories(e.categories);
            setDescription(e.description);
          }}
        />
      </div>
      <button
        className='change-step'
        onClick={() => setStep(step === 1 ? 2 : 1)}
      >
        {step === 1 ? 'Далее' : 'Назад'}
      </button>
    </>
  );
}
