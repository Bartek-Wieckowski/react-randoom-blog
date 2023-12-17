import supabase, { supabaseUrl } from '../utils/supabaseConfig';

export async function signupApi({ fullName, email, password, nickName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        nickName,
        avatar: '',
      },
    },
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function loginApi({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function logoutApi() {
  const { error } = supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
}

export async function updateCurrentUserApi({
  password,
  fullName,
  nickName,
  avatar,
}) {
  let updateData;
  if (password) {
    updateData = { password };
  }
  if (fullName) {
    updateData = { data: { fullName } };
  }
  if (nickName) {
    updateData = { data: { nickName } };
  }

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from('randoomBlogUserAvatars')
    .upload(fileName, avatar);

  if (storageError) {
    throw new Error(storageError.message);
  }

  const { data: updatedUser, error: errorUpdateUser } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/randoomBlogUserAvatars/${fileName}`,
      },
    });

  if (errorUpdateUser) {
    throw new Error(errorUpdateUser.message);
  }
  return updatedUser;
}
