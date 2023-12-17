import './user-settings-form.scss';

export default function UserSettingsForm() {
  return (
    <div className="user-settings__form-wrapper">
      <div className="user-settings-form">
        <h3>Edytuj dane</h3>
        <form onSubmit={() => alert('sended')}>
          <div className="wrapper">
            <div>
              <input type="text" id="fullName" placeholder="Imię i nazwisko" />
            </div>
            <div>
              <input type="text" id="nickName" placeholder="Nickname" />
            </div>
            <div>
              <input type="email" id="email" placeholder="Email" />
            </div>
            <div>
              <input type="password" id="password" placeholder="Hasło" />
            </div>
            <div>
              <input
                type="password"
                id="passwordConfirm"
                placeholder="Powtórz hasło"
              />
            </div>
          </div>
          <p className="co-submit">
            <input
              type="submit"
              value="Edytuj dane"
              className="btn submit read-more"
            />
          </p>
        </form>
      </div>
    </div>
  );
}
