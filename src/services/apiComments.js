import supabase, { supabaseUrl } from '../utils/supabaseConfig';

export async function addCommentCurrentPostAPI(commentData) {
  const {
    userName,
    userEmail,
    commentContent,
    postIDContentful,
    userID,
    postID,
  } = commentData;
  const { data, error } = await supabase
    .from('randoomBlogComments')
    .insert([
      { userName, userEmail, commentContent, postIDContentful, userID, postID },
    ])
    .select();

  if (error) {
    throw new Error('Something went wrong');
  }
  return data;
}

export async function getCurrentPostIDfromSupabase(id) {
  const { data, error } = await supabase
    .from('randoomBlogPosts')
    .select('id')
    .eq('postIDContentful', id);

  if (error) {
    console.error(error);
    throw new Error('Błąd podczas odczytu danych');
  }

  return data;
}
