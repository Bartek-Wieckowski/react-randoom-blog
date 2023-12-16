import './login-form.scss';
import { useState } from 'react';
import { useLogin } from './useLoginHook';
import Spinner from '../Spinner/Spinner';

export default function LoginForm() {
  const { login, isLoading } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const handleLogin = (e) => {
    e.preventDefault();

    const newErrors = { email: '', password: '' };

    if (!email.includes('@')) {
      newErrors.email = 'Email musi zawierać @';
    }
    if (password.length < 8) {
      newErrors.password = 'Hasło musi mieć przynajmniej 8 znaków';
    }

    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
      return;
    }

    login(
      { email, password },
      {
        onSettled: () => {
          setEmail('');
          setPassword('');
          setErrors({ email: '', password: '' });
        },
      }
    );
  };

  const handleBlur = (field) => {
    const newErrors = { ...errors, [field]: '' };
    setErrors(newErrors);
  };

  return (
    <div className="login-form">
      <h3>Zaloguj się</h3>
      <form onSubmit={handleLogin}>
        <div className="wrapper">
          <div>
            <input
              type="email"
              id="email"
              placeholder="Email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur('email')}
              disabled={isLoading}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>
          <div>
            <input
              type="password"
              id="password"
              placeholder="Hasło"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => handleBlur('password')}
              disabled={isLoading}
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>
        </div>
        {isLoading ? (
          <Spinner type="small-spinner" />
        ) : (
          <input
            type="submit"
            value="Zaloguj"
            className="btn submit read-more"
          />
        )}
      </form>
    </div>
  );
}
