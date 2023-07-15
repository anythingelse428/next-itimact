import { useState } from 'react';
import { ErrorPolicy, useMutation } from '@apollo/client';
import type { GetStaticProps } from 'next';
import registerMutation from '../../graphql/mutation/Register.graphql';
import { addApolloState, initializeApollo } from '../../../apollo';
import { RegisterUserPayload } from '../../../__generated__/graphql';
import { setCookie } from 'cookies-next';
export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  type UserData = {
    registerUser: RegisterUserPayload;
  };
  const [register, { data, error, loading }] = useMutation<UserData>(
    registerMutation,
    {
      variables: {
        username: username,
        email: email,
        password: password,
      },
      onCompleted: () => {},
    }
  );
  return (
    <form
      className='auth-form auth-form--register'
      onSubmit={(e) => {
        e.preventDefault();
        if (username.length < 3 || email.length < 3 || password.length < 3) {
          throw error?.message;
        }
        register({
          variables: {
            username: username,
            email: email,
            password: password,
          },
        })
          .then(({ data }) => {
            setCookie(
              'userRefreshToken',
              data?.registerUser?.user?.jwtRefreshToken
            );
            window.location.pathname = '/user';
          })
          .catch((error) => {
            if (error?.message.indexOf('username was not') > -1) {
              console.log('username err');
            }
            if (error?.message.indexOf('email address was not') > -1) {
              console.log('email err');
            }
            if (
              error?.message.indexOf('email address is already registered') > -1
            ) {
              console.log('email used');
            }
            if (
              error?.message.indexOf('This username is already registered') > -1
            ) {
              console.log('username used');
            }
            console.log(error);
          });
      }}
    >
      <input
        type='text'
        placeholder='username'
        className='auth-form__input'
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <input
        type='email'
        placeholder='email'
        className='auth-form__input'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type='password'
        placeholder='password'
        className='auth-form__input'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <input type='submit' value='рега' className='auth-form__submit' />
    </form>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const client = initializeApollo();
  console.log(ctx);

  return addApolloState(client, {
    props: {},
  });
};
