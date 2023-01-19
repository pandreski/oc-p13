import { Link } from 'react-router-dom';
import illustration from '../assets/images/undraw-not-found.png';
import style from './Error404.module.scss';

/**
 * Error page: Not found.
 * @component
 * @example
 * return (
 *  <Error404 />
 * )
 */
function Error404() {
  return (
    <main className='main'>
      <img src={illustration} className={style.illustration} alt="" />
      <h2 className={style.title}>Page not found</h2>
      <p className={style.text}>The page you are looking for has not been found.</p>
      <Link to="/" className={style.cta}>Back to home</Link>
    </main>
  );
}

export default Error404;
