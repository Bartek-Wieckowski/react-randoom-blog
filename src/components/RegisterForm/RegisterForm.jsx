import './register-form.scss';
import { useForm } from 'react-hook-form';
import { useRegister } from './useRegisterHook';

export default function RegisterForm() {
  const { register: signup, isLoading } = useRegister();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  const handleSignUpForm = ({ fullName, email, password }) => {
    signup({ fullName, email, password }, { onSettled: () => reset() });
  };

  return (
    <div className="register-form">
      <h3>Zarejestruj się</h3>
      <form onSubmit={handleSubmit(handleSignUpForm)}>
        <div className="wrapper">
          <div>
            <input
              type="text"
              id="fullName"
              placeholder="Imię i nazwisko"
              {...register('fullName', {
                required: 'To pole jest obowiązkowe',
              })}
            />
            <p className="error-text">{errors?.fullName?.message}</p>
          </div>
          <div>
            <input type="text" id="nickname" placeholder="Nickname" />
          </div>
          <div>
            <input
              type="email"
              id="email"
              placeholder="Email"
              {...register('email', {
                required: 'To pole jest obowiązkowe',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Proszę podać prawidłowy e-mail',
                },
              })}
            />
            <p className="error-text">{errors?.email?.message}</p>
          </div>
          <div>
            <input
              type="password"
              id="password"
              placeholder="Hasło"
              {...register('password', {
                required: 'To pole jest obowiązkowe',
                minLength: {
                  value: 8,
                  message: 'Hasło musi mieć conajmniej 8 znaków',
                },
              })}
            />
            <p className="error-text">{errors?.password?.message}</p>
          </div>
          <div>
            <input
              type="password"
              id="passwordConfirm"
              placeholder="Powtórz hasło"
              {...register('passwordConfirm', {
                required: 'To pole jest obowiązkowe',
                validate: (value) =>
                  value === getValues().password || 'Hasła nie są takie same',
              })}
            />
            <p className="error-text">{errors?.passwordConfirm?.message}</p>
          </div>
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
