import { Link } from 'react-router-dom';
import logo from '../assets/images/argentBankLogo.png';
import style from './Header.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { userFirstNameSelect, userLoggedInSelect } from '../utils/selectors';
import { logout } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

function Header() {
  const isAuthenticated = useSelector(userLoggedInSelect);
  const userFirstName = useSelector(userFirstNameSelect);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    dispatch(logout());
    localStorage.removeItem('jwtToken');
    navigate('/');
  }

  return (
    <header>
      <nav className={style.mainNav}>
        <Link to='/' className={style.mainNavLogo}>
          <img src={logo} className={style.mainNavLogoImage} alt="Argent Bank" />
          <h1 className='sr-only'>Argent Bank</h1>
        </Link>
        <div>
          {
            isAuthenticated ? (
              <>
                <Link to='/profile' className={style.mainNavItem}>
                  <i className="fa fa-user-circle"></i> {userFirstName}
                </Link>
                <Link onClick={handleClick} className={style.mainNavItem}>
                  <i className="fa fa-sign-out"></i> Sign Out
                </Link>
              </>
            ) : (
              <Link to='/login' className={style.mainNavItem}>
                <i className="fa fa-user-circle"></i> Sign In
              </Link>
            )
          }
        </div>
      </nav>
    </header>
  );
}

export default Header;
