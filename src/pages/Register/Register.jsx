import "./register.scss";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

export default function Register() {
  return (
    <section className="register">
      <div className="register__form-wrapper">
        <RegisterForm />
      </div>
    </section>
  );
}
