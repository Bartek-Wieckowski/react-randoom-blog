import supabase from '../utils/supabaseConfig';

export async function signupApi({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: '',
      },
    },
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
