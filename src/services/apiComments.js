import supabase, { supabaseUrl } from '../utils/supabaseConfig';

export async function addCommentToSupabase(commentData) {
  const { test } = commentData;
  const { data, error } = await supabase
    .from('randoomBlogComments')
    .insert([{ some_column: 'someValue' }, { some_column: 'otherValue' }])
    .select();

  if (error) {
    throw new Error('Something went wrong');
  }
  return data;
}
