import './user-settings-form.scss';
import UserDataForm from './UserDataForm';
import UserPasswordForm from './UserPasswordForm';

export default function UserSettingsForm() {
  return (
    <div className="user-settings__form-wrapper">
      <div className="user-settings-form">
        <h3>Edytuj dane</h3>
        <UserDataForm />
      </div>
      <div className="user-settings-form">
        <h3>Edytuj hasło</h3>
        <UserPasswordForm />
      </div>
    </div>
  );
}
