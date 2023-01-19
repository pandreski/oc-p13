import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useApiAuth } from '../hooks/useApi';
import { errorMessageSelect, isErrorSelect, isLoadingSelect, userLoggedInSelect } from '../utils/selectors';
import Loader from './Loader';
import style from './LoginForm.module.scss';

/**
 * Login form component.
 * @component
 * @example
 * return (
 *  <LoginForm />
 * )
 */
function LoginForm() {
  const [credentials, setCredentials] = useState({});
  const isError = useSelector(isErrorSelect);
  const errorMessage = useSelector(errorMessageSelect);
  const isLoadingAuth = useSelector(isLoadingSelect);
  const isAuthenticated = useSelector(userLoggedInSelect);
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/profile";

  // Setup API authentication process with form's data
  useApiAuth(credentials.email, credentials.password, credentials.persistent);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Update local state with submitted form's data
    setCredentials({
      email: formData.get('email'),
      password: formData.get('password'),
      persistent: formData.get('persistent'),
    });
  };

  // Redirect user to its previous destination on successful login process
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  return (
    <section className={style.signInContent}>
      <i className={`fa fa-user-circle ${style.signInIcon}`}></i>
      <h1>Sign In</h1>
      {
        isError ? (
          <div className={style.errorMessage}>{errorMessage}</div>
        ) : null
      }
      <form onSubmit={handleSubmit}>
        <div className={style.inputWrapper}>
          <label htmlFor="username">Email</label>
          <input type="email" name='email' id="email" required />
        </div>
        <div className={style.inputWrapper}>
          <label htmlFor="password">Password</label>
          <input type="password" name='password' id="password" required />
        </div>
        <div className={style.inputRemember}>
          <input type="checkbox" name="persistent" id="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        {
          isLoadingAuth ? (
            <Loader size={26} />
          ) : (
            <button className={style.signInButton}>Sign In</button>
          )
        }
      </form>
    </section>
  );
}

export default LoginForm;
