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
