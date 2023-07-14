import Link from 'next/link';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

import { useIsAuth } from '../../../hooks/useIsAuth';
import UserAvatar from '../../../components/UserAvatar';
import style from '../../../styles/navbar/Navbar.module.css';
import { useUserId } from '../../../hooks/useUserId';

const token = getCookie('userRefreshToken')?.valueOf();

export default function Navbar() {
  const [isAuth, setIsAuth] = useState(false);
  const isAuthHook = useIsAuth(token);
  useEffect(() => setIsAuth(isAuthHook), []);
  const uid = useUserId(token);
  return (
    <>
      <nav className={style['navbar']}>
        <div className={`${style['navbar-container']} container`}>
          <div className={style['navbar-items']}>
            <div className={style['navbar-item']}>
              <div className={style['navbar-brand']}>ITImplact</div>
            </div>
            <div className={style['navbar-item']}>
              <Link href={'/articles'}>Свежак</Link>
            </div>
          </div>
          <div className={`${style['navbar-items']} ${style['--user']}`}>
            {isAuth && (
              <>
                <div className={style['navbar-item']}>
                  <Link href={'/create-article'}>
                    <FontAwesomeIcon icon={faPencil} style={{ fontSize: 22 }} />
                  </Link>
                </div>
              </>
            )}
            <div className={style['navbar-item']}>
              {!isAuth && <Link href={'/auth'}>Войти</Link>}
              {isAuth && (
                <a href={'/user'}>
                  <UserAvatar uid={uid} width={24}></UserAvatar>
                </a>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
