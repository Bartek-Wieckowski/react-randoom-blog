import './register-form.scss';

export default function RegisterForm() {
  return (
    <div className="register-form">
      <h3>Zarejestruj się</h3>
      <form action="">
        <div className="wrapper">
          <p>
            <input type="text" placeholder="Imię i nazwisko" required />
          </p>
          <p>
            <input type="text" placeholder="Nickname" required />
          </p>
          <p>
            <input type="email" placeholder="Email" />
          </p>
          <p>
            <input type="password" placeholder="Hasło" required />
          </p>
          <p>
            <input type="password" placeholder="Powtórz hasło" required />
          </p>
        </div>
        <p className="co-submit">
          <input
            type="submit"
            value="Wyślij"
            className="btn submit read-more"
          />
        </p>
      </form>
    </div>
  );
}
