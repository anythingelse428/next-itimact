import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import UserAvatarUrl from '../pages/graphql/query/queryUserAvatar.graphql';

export default function UserAvatar(props: {
  uid: string | number;
  width?: number;
  idType?: string;
}) {
  const [isAvatarValid, setIsAvatarValid] = useState(false);
  function checkImage(imageSrc: string) {
    const img = new Image();
    img.onload = () => setIsAvatarValid(true);
    img.onerror = () => setIsAvatarValid(false);
    img.src = imageSrc;
  }
  useEffect(() => {
    checkImage(data?.user?.userAvatarUrl);
  }, [isAvatarValid]);
  const { data, loading, error } = useQuery(UserAvatarUrl, {
    variables: {
      id: props.uid,
      idType: props.idType || 'DATABASE_ID',
    },
    onCompleted(data) {
      checkImage(data.user.userAvatarUrl);
      console.log(data, 55555555);
    },
  });
  return (
    <div className='user-avatar'>
      <img
        src={
          data && isAvatarValid
            ? data.user.userAvatarUrl
            : 'http://1.gravatar.com/avatar/1a40921eb70bd71928c01f282ccb1e2c?s=96'
        }
        width={props.width || 300}
        alt=''
      />
    </div>
  );
}
