import { Link } from 'react-router-dom';
import logo from '../assets/images/argentBankLogo.png';
import style from './Header.module.scss';

function Header() {
  return (
    <header>
      <nav className={style.mainNav}>
        <Link to='/' className={style.mainNavLogo}>
          <img src={logo} className={style.mainNavLogoImage} alt="Argent Bank" />
          <h1 className='sr-only'>Argent Bank</h1>
        </Link>
        <div>
          <Link className={style.mainNavItem}>
            <i className="fa fa-user-circle"></i> Sign In
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
