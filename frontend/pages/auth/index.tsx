import { useState } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
export default function Page() {
  const [tabState, setTabState] = useState('login');
  return (
    <>
      <div className='auth-navbar'>
        <div className='auth-navbar__item' onClick={() => setTabState('login')}>
          Войти
        </div>
        <div
          className='auth-navbar__item'
          onClick={() => setTabState('register')}
        >
          Зарегистрироваться
        </div>
      </div>
      {tabState == 'login' && <LoginForm></LoginForm>}
      {tabState == 'register' && <RegisterForm></RegisterForm>}
    </>
  );
}
