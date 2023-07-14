import { useState } from 'react';
import { useMutation } from '@apollo/client';
import type { GetStaticPaths, GetStaticProps } from 'next';
import loginMutation from '../../graphql/mutation/Login.graphql';
import { addApolloState, initializeApollo } from '../../../apollo';
import { setCookie } from 'cookies-next';
import { LoginPayload } from '../../../src/__generated__/graphql';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  type LoginData = {
    login: LoginPayload;
  };
  const [login, { data, error, loading }] = useMutation<LoginData>(
    loginMutation,
    {
      variables: {
        password: password,
        username: username,
      },
    }
  );
  return (
    <form
      className='auth-form auth-form--login'
      onSubmit={(e) => {
        e.preventDefault();
        login({
          variables: {
            username: username,
            password: password,
          },
        })
          .then(({ data }) => {
            setCookie('userRefreshToken', data?.login.user.jwtRefreshToken);
            window.location.pathname = '/user';
          })
          .catch((err) => {
            console.log(err);
          });
      }}
    >
      <input
        type='email'
        className='auth-form__input'
        placeholder='email'
        onChange={(e) => setUsername(e.target.value)}
        autoComplete='email'
        value={username}
      />
      <input
        type='password'
        placeholder='password'
        className='auth-form__input'
        onChange={(e) => setPassword(e.target.value)}
        autoComplete='password'
        value={password}
      />
      <input type='submit' value='Войти' className='auth-form__submit' />
    </form>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const client = initializeApollo();

  return addApolloState(client, {
    props: {},
  });
};
