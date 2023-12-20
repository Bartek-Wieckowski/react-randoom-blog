import supabase, { supabaseUrl } from '../utils/supabaseConfig';

export async function addCommentCurrentPostAPI(commentData) {
  const { userName, userEmail, commentContent, postIDContentful, userID } =
    commentData;
  const { data, error } = await supabase
    .from('randoomBlogComments')
    .insert([{ userName, userEmail, commentContent, postIDContentful, userID }])
    .select();

  if (error) {
    throw new Error('Something went wrong');
  }
  return data;
}
