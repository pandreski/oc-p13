import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useApiAuth } from '../hooks/useApi';
import { errorMessageSelect, isErrorSelect, isLoading } from '../utils/selectors';
import Loader from './Loader';
import style from './LoginForm.module.scss';


function LoginForm() {
  const [credentials, setCredentials] = useState({});
  const isError = useSelector(isErrorSelect);
  const errorMessage = useSelector(errorMessageSelect);
  const isLoadingAuth = useSelector(isLoading);

  useApiAuth(credentials.email, credentials.password);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setCredentials({
      email: formData.get('email'),
      password: formData.get('password')
    });
  };

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
          <input type="checkbox" id="remember-me" />
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
