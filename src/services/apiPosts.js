import supabase from "../utils/supabaseConfig";

export async function addPostIDsToSupabase(contentfulPostIDs) {
  try {
    const existingRecords = await supabase
      .from("randoomBlogPosts")
      .select("postIDContentful")
      .in("postIDContentful", contentfulPostIDs);

    const newPostIDs = contentfulPostIDs.filter(
      (contentfulPostID) =>
        !existingRecords.data.some((record) => record.postIDContentful === contentfulPostID)
    );

    if (newPostIDs.length > 0) {
      const newRecords = newPostIDs.map((contentfulPostID) => ({
        postIDContentful: contentfulPostID,
      }));

      await supabase.from("randoomBlogPosts").upsert(newRecords);
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
