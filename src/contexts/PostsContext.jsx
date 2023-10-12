import { createContext, useContext, useEffect, useReducer } from "react";
import contentfulClient from "../helpers/contentfulConfig";

const PostsContext = createContext();

const initialState = {
  posts: [],
  postsPreview: [],
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
    default:
      throw new Error("Unknown action type");
  }
}

function PostsProvider({ children }) {
  const [{ postsPreview, isLoading }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchPosts() {
      dispatch({ type: "loading" });
      try {
        const response = await contentfulClient.getEntries({
          content_type: "randoomBlogPosts",
        });
        const postsData = response.items.map((item) => {
          const { title, author, category, contentPreview, readTime } = item.fields;
          return { title, author, category, contentPreview, readTime };
        });
        dispatch({ type: "postsPreview/loaded", payload: postsData });
      } catch {
        dispatch({ type: "rejected", payload: "There was an error loading posts" });
      }
    }
    fetchPosts();
  }, []);

  return <PostsContext.Provider value={{ postsPreview, isLoading }}>{children}</PostsContext.Provider>;
}

function usePosts() {
  const context = useContext(PostsContext);
  if (context === undefined) throw new Error("PostsContext was used outside the PostsProvider");
  return context;
}

export { PostsProvider, usePosts };
