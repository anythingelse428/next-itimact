import { useIsAdmin } from '../../hooks/useIsAdmin';
import Navbar from './components/Navbar';
export default function Layout({ children }) {
  return (
    <div className='layout--main'>
      <Navbar />
      <div className='container'>
        <main className='layout--main__content'>{children}</main>
        <aside className='layout--main__aside'>aside for news or smth</aside>
      </div>
      <footer>footer</footer>
    </div>
  );
}
