import "./login.scss";
import LoginForm from "../../components/LoginForm/LoginForm";

export default function Login() {
  return (
    <section className="login">
      <div className="login__form-wrapper">
        <LoginForm />
      </div>
    </section>
  );
}
