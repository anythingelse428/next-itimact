import { deleteCookie } from 'cookies-next';

function logout() {
  deleteCookie('userRefreshToken');
}

export default function LogoutButton() {
  return (
    <a
      href='/auth'
      onClick={(e) => {
        logout();
      }}
    >
      Выйти
    </a>
  );
}
