import supabase from "../utils/supabaseConfig";

export async function addPostIDsToSupabase(contentfulPostIDs) {
  try {
    for (const contentfulPostID of contentfulPostIDs) {
      const existingRecord = await supabase
        .from("randoomBlogPosts")
        .select("postIDContentful")
        .eq("postIDContentful", contentfulPostID);

      if (existingRecord.data.length === 0) {
        await supabase.from("randoomBlogPosts").upsert([{ postIDContentful: contentfulPostID }]);
      }
    }
  } catch (error) {
    console.error("Błąd podczas dodawania identyfikatorów postów do Supabase:", error.message);
  }
}

export async function selectCurrentPostFromSupabase(id) {
  const { data, error } = await supabase
    .from("randoomBlogPosts")
    .select("viewCount")
    .eq("postIDContentful", id);

  if (error) {
    console.error(error);
    throw new Error("Bład podczas odczytu danych");
  }

  return data;
}

export async function updateCountViewInSupabase(id, viewCount) {
  const { data, error } = await supabase
    .from("randoomBlogPosts")
    .update({ viewCount: viewCount })
    .eq("postIDContentful", id);

  if (error) {
    console.error(error);
    throw new Error("Bład podczas odczytu danych");
  }

  return data;
}
