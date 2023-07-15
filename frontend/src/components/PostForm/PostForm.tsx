import { useRouter } from 'next/router';
import { useState } from 'react';
import { DocumentNode, useMutation } from '@apollo/client';
import {
  CreatePostPayload,
  UpdatePostPayload,
} from '../../__generated__/graphql';
import axios from 'axios';

import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import { createPost } from '../../lib/articles';

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
  const [status, setStatus] = useState<'DRAFT' | 'PUBLISH'>('DRAFT');
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [featuredImg, setFeaturedImg] = useState(null);
  const [description, setDescription] = useState('');
  const [action, { data, error, loading }] = useMutation<Post>(props.mutation);

  const router = useRouter();

  async function doAction(e) {
    e.preventDefault();
    createPost({
      id: props?.id,
      status: status,
      title: title,
      content: content,
      tags: tags,
      categories: categories,
      featuredImg: featuredImg,
      description: description,
    }).then(({ data }) => {
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
