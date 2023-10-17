import { createContext, useCallback, useContext, useEffect, useReducer } from "react";
import contentfulClient from "../utils/contentfulConfig";
import { contentfulContentModel } from "../utils/contentfulConfig";

const PostsContext = createContext();

const initialState = {
  posts: [],
  postsPreview: [],
  postsPopular: [],
  postsCategory: [],
  currentPost: {},
  isLoading: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    case "postsPreview/loaded":
      return { ...state, isLoading: false, postsPreview: action.payload };
    case "postsPopular/loaded":
      return { ...state, isLoading: false, postsPopular: action.payload };
    case "singlePost/loaded":
      return { ...state, isLoading: false, currentPost: action.payload };
    case "postsCategory/loaded":
      return { ...state, isLoading: false, postsCategory: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

function PostsProvider({ children }) {
  const [{ isLoading, postsPreview, postsPopular, currentPost, postsCategory }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchPosts() {
      dispatch({ type: "loading" });
      try {
        const response = await contentfulClient.getEntries({
          content_type: contentfulContentModel,
        });
        const postsData = response.items.map((item) => {
          const postID = item.sys.id;
          const { title, author, category, contentPreview, readTime, slug, categorySlug } = item.fields;
          return { title, author, category, contentPreview, readTime, slug, categorySlug, postID };
        });
        dispatch({ type: "postsPreview/loaded", payload: postsData });
      } catch {
        dispatch({ type: "rejected", payload: "There was an error loading posts" });
      }
    }
    fetchPosts();
  }, []);

  const fetchPopularPosts = useCallback(async () => {
    dispatch({ type: "loading" });
    try {
      const response = await contentfulClient.getEntries({
        content_type: contentfulContentModel,
        "fields.popular": true,
      });
      const postsData = response.items.map((item) => {
        const postID = item.sys.id;
        const { title, author, category, contentPreview, readTime, slug, categorySlug } = item.fields;
        return { title, author, category, contentPreview, readTime, slug, categorySlug, postID };
      });
      dispatch({ type: "postsPopular/loaded", payload: postsData });
    } catch (error) {
      dispatch({ type: "rejected", payload: "There was an error loading popular posts" });
    }
  }, []);

  const fetchSinglePost = useCallback(
    async (slug) => {
      if (String(slug) === currentPost.slug) return;
      dispatch({ type: "loading" });
      try {
        const response = await contentfulClient.getEntries({
          content_type: contentfulContentModel,
          "fields.slug": slug,
        });
        if (response.items.length > 0) {
          const postItem = response.items[0];
          const postID = postItem.sys.id;
          const postRestDetails = postItem.fields;
          dispatch({ type: "singlePost/loaded", payload: { postID, postRestDetails } });
        } else {
          dispatch({ type: "rejected", payload: "Taki post nie istnieje!" });
        }
      } catch (error) {
        dispatch({ type: "rejected", payload: "There was an error loading single post" });
      }
    },
    [currentPost.slug]
  );

  const fetchCategoryPost = useCallback(async (category) => {
    dispatch({ type: "loading" });
    try {
      const response = await contentfulClient.getEntries({
        content_type: contentfulContentModel,
        "fields.categorySlug": category,
      });

      const postsData = response.items
        .filter((item) => item.fields.categorySlug === category)
        .map((item) => {
          const postID = item.sys.id;
          const { title, author, category, contentPreview, readTime, slug, categorySlug } = item.fields;
          return { title, author, category, contentPreview, readTime, slug, categorySlug, postID };
        });
      console.log(postsData);
      dispatch({ type: "postsCategory/loaded", payload: postsData });
    } catch (error) {
      dispatch({ type: "rejected", payload: "There was an error loading category post" });
    }
  }, []);

  return (
    <PostsContext.Provider
      value={{
        isLoading,
        postsPreview,
        postsPopular,
        currentPost,
        postsCategory,
        fetchPopularPosts,
        fetchSinglePost,
        fetchCategoryPost,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}

function usePosts() {
  const context = useContext(PostsContext);
  if (context === undefined) throw new Error("PostsContext was used outside the PostsProvider");
  return context;
}

export { PostsProvider, usePosts };
