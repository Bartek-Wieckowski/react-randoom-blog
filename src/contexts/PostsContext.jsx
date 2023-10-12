import { createContext, useCallback, useContext, useEffect, useReducer } from "react";
import contentfulClient from "../helpers/contentfulConfig";

const PostsContext = createContext();

const initialState = {
  posts: [],
  postsPreview: [],
  postsPopular: [],
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
    default:
      throw new Error("Unknown action type");
  }
}

function PostsProvider({ children }) {
  const [{ postsPreview, isLoading, postsPopular }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchPosts() {
      dispatch({ type: "loading" });
      try {
        const response = await contentfulClient.getEntries({
          content_type: "randoomBlogPosts",
        });
        const postsData = response.items.map((item) => {
          const postID = item.sys.id;
          const { title, author, category, contentPreview, readTime, slug } = item.fields;
          return { title, author, category, contentPreview, readTime, slug, postID };
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
        content_type: "randoomBlogPosts",
        "fields.popular": true,
      });
      const postsData = response.items.map((item) => {
        const postID = item.sys.id;
        const { title, author, category, contentPreview, readTime, slug } = item.fields;
        return { title, author, category, contentPreview, readTime, slug, postID };
      });
      dispatch({ type: "postsPopular/loaded", payload: postsData });
    } catch (error) {
      dispatch({ type: "rejected", payload: "There was an error loading popular posts" });
    }
  }, []);

  return (
    <PostsContext.Provider value={{ postsPreview, isLoading, fetchPopularPosts, postsPopular }}>
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
