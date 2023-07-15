import { gql, useMutation } from '@apollo/client';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useState } from 'react';
import ChangeAvatar from '../graphql/mutation/ChangeAvatar.graphql';
import { useUserId } from '../../hooks/useUserId';
export default function Page() {
  const [img, setImg] = useState(new FormData());

  const [selectedFile, setSelectedFile] = useState(null);
  const uid = useUserId(String(getCookie('userRefreshToken')));
  const [updateAvatar, { data, error, loading }] = useMutation(ChangeAvatar);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('selectedFile', selectedFile);
    if (selectedFile.type.indexOf('image') > -1) {
      try {
        const response = await axios({
          method: 'POST',
          url: 'http://localhost/backend/wp-json/wp/v2/load-avatar',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
            AUTHORIZATION: `${getCookie('userRefreshToken')}`,
          },
        }).then(({ data }) => {
          console.log(data);
          updateAvatar({
            variables: {
              id: uid,
              userAvatarUrl: data,
            },
          }).then(() => {
            alert('Успех');
            window.location.href = '/user';
          });
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      throw new Error('huila blya, load I M A G E');
    }
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <form encType='multipart/form-data' onSubmit={handleSubmit} method='POST'>
      <input type='file' onChange={handleFileSelect} />
      <input type='submit' value='Upload File' />
    </form>
  );
}
