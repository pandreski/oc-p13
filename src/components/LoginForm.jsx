import style from './LoginForm.module.scss';

function LoginForm() {
  return (
    <section className={style.signInContent}>
      <i className={`fa fa-user-circle ${style.signInIcon}`}></i>
      <h1>Sign In</h1>
      <form>
        <div className={style.inputWrapper}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" />
        </div>
        <div className={style.inputWrapper}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>
        <div className={style.inputRemember}>
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <button className={style.signInButton}>Sign In</button>
      </form>
    </section>
  );
}

export default LoginForm;
