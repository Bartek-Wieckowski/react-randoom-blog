import noSetImg from '../../assets/noSetImg.png';
import { useUser } from '../../auth/useUserHook';
import { useUpdateUser } from './useUpdateUserHook';
import { useForm } from 'react-hook-form';

function UserDataForm() {
  const {
    user,
    user: {
      email,
      user_metadata: { fullName: currentFullName, nickName: currentNickName },
    },
  } = useUser();

  const { updateUser, isUpdating } = useUpdateUser();

  const { register, handleSubmit, setValue, reset } = useForm();

  const handleSubmitUpdateUser = (data) => {
    if (!data.fullName) return;
    updateUser(
      {
        fullName: data.fullName,
        nickName: data.nickName,
        avatar: data.avatar[0],
        password: data.password,
      },
      {
        onSuccess: () => {
          setValue('avatar', null);
          reset();
        },
      }
    );
  };

  const handleCancelUpdateUser = () => {
    setValue('fullName', currentFullName);
    setValue('avatar', null);
  };
  return (
    <form onSubmit={handleSubmit(handleSubmitUpdateUser)}>
      <div className="wrapper">
        <div>
          <input
            type="email"
            id="email"
            placeholder="Email"
            defaultValue={email}
            disabled
          />
        </div>
        <div>
          <input
            type="text"
            id="fullName"
            placeholder="Imię i nazwisko"
            disabled={isUpdating}
            defaultValue={currentFullName}
            {...register('fullName')}
          />
        </div>
        <div>
          <input
            type="text"
            id="nickName"
            placeholder="Nickname"
            disabled={isUpdating}
            defaultValue={currentNickName}
            {...register('nickName')}
          />
        </div>
        <div className="avatars-info-wrapper">
          <input
            type="file"
            accept="image/*"
            id="avatar"
            {...register('avatar')}
            disabled={isUpdating}
          />
          <span className="prev-img-view">
            <img src={user.user_metadata.avatar || noSetImg} alt="" />
          </span>
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
  );
}

export default UserDataForm;
