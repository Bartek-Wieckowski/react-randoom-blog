import { useForm } from 'react-hook-form';
import { useUpdateUser } from './useUpdateUserHook';

function UserPasswordForm() {
  const { register, handleSubmit, getValues, formState, reset } = useForm();
  const { errors } = formState;
  const { updateUser, isUpdating } = useUpdateUser();

  const handleSubmitUpdateUser = ({ password }) => {
    updateUser(
      { password },
      {
        onSuccess: () => {
          reset();
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitUpdateUser)}>
      <div className="wrapper">
        <div>
          <input
            type="password"
            id="password"
            placeholder="Hasło"
            disabled={isUpdating}
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
            disabled={isUpdating}
            {...register('passwordConfirm', {
              required: 'To pole jest obowiązkowe',
              validate: (value) =>
                getValues().password === value || 'Hasła nie są takie same',
            })}
          />
          <p className="error-text">{errors?.passwordConfirm?.message}</p>
        </div>
      </div>
      <div className="buttons-wrapper">
        <p className="co-submit">
          <input
            type="submit"
            value="Edytuj hasło"
            className="btn submit read-more"
          />
        </p>
        <button
          type="button"
          className="btn cancel-btn"
          onClick={() => reset()}
        >
          Anuluj
        </button>
      </div>
    </form>
  );
}

export default UserPasswordForm;
