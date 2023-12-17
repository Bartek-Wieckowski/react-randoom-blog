import './user-settings-form.scss';
import { useUser } from '../../auth/useUserHook';
import { useState } from 'react';
import { useUpdateUser } from './useUpdateUserHook';
import noSetImg from '../../assets/noSetImg.png';

export default function UserSettingsForm() {
  const {
    user,
    user: {
      email,
      user_metadata: { fullName: currentFullName, nickName: currentNickName },
    },
  } = useUser();

  const { updateUser, isUpdating } = useUpdateUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [nickName, setNickName] = useState(currentNickName);
  const [avatar, setAvatar] = useState(null);

  const handleSubmitUpdateUser = (e) => {
    e.preventDefault();
    if (!fullName) return;
    updateUser(
      { fullName, nickName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  };

  const handleCancelUpdateUser = () => {
    setFullName(currentFullName);
    setAvatar(null);
  };

  return (
    <div className="user-settings__form-wrapper">
      <div className="user-settings-form">
        <h3>Edytuj dane</h3>
        <form onSubmit={handleSubmitUpdateUser}>
          <div className="wrapper">
            <div>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                disabled
              />
            </div>
            <div>
              <input
                type="text"
                id="fullName"
                placeholder="Imię i nazwisko"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                id="nickName"
                placeholder="Nickname"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
              />
            </div>
            <div className="avatars-info-wrapper">
              <input
                type="file"
                accept="image/*"
                id="avatar"
                onChange={(e) => setAvatar(e.target.files[0])}
                disabled={isUpdating}
              />
              <span className="prev-img-view">
                <img src={user.user_metadata.avatar || noSetImg} alt="" />
              </span>
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
          <div className="buttons-wrapper">
            <p className="co-submit">
              <input
                type="submit"
                value="Edytuj dane"
                className="btn submit read-more"
              />
            </p>
            <button
              type="button"
              className="btn cancel-btn"
              onClick={handleCancelUpdateUser}
            >
              Anuluj
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
