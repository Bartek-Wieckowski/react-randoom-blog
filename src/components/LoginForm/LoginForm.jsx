import "./login-form.scss";

export default function LoginForm() {
  return (
    <div className="login-form">
      <h3>Zaloguj się</h3>
      <form action="">
        <div className="wrapper">
          <p>
            <input type="email" placeholder="Email" />
          </p>
          <p>
            <input type="password" placeholder="Hasło" required />
          </p>
        </div>
        <p className="co-submit">
          <input type="submit" value="Zaloguj" className="btn submit read-more" />
        </p>
      </form>
    </div>
  );
}
