import { createContext, useCallback, useContext, useEffect, useReducer } from "react";
import { contentfulContentModel } from "../utils/contentfulConfig";
import contentfulClient from "../utils/contentfulConfig";
import { addPostIDsToSupabase } from "../services/apiPosts";

const PostsContext = createContext();

const initialState = {
  postsPreview: [],
  postsPopular: [],
  postsCategory: [],
  postsAuthor: [],
  postsReadTime: [],
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
    case "postsAuthor/loaded":
      return { ...state, isLoading: false, postsAuthor: action.payload };
    case "postsReadTime/loaded":
      return { ...state, isLoading: false, postsReadTime: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

function PostsProvider({ children }) {
  const [
    { isLoading, postsPreview, postsPopular, currentPost, postsCategory, postsAuthor, postsReadTime },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchPosts() {
      dispatch({ type: "loading" });
      try {
        const response = await contentfulClient.getEntries({
          content_type: contentfulContentModel,
        });
        const postsData = response.items.map((item) => {
          const postID = item.sys.id;
          const { title, author, category, contentPreview, readTime, slug, categorySlug, authorSlug } =
            item.fields;
          return {
            title,
            author,
            category,
            contentPreview,
            readTime,
            slug,
            categorySlug,
            authorSlug,
            postID,
          };
        });

        dispatch({ type: "postsPreview/loaded", payload: postsData });

        const contentfulPostIDs = [...new Set(response.items.map((item) => item.sys.id))];

        await addPostIDsToSupabase(contentfulPostIDs);
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
        const { title, author, category, contentPreview, readTime, slug, categorySlug, authorSlug } =
          item.fields;
        return { title, author, category, contentPreview, readTime, slug, categorySlug, authorSlug, postID };
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
          const { title, author, category, contentPreview, readTime, slug, categorySlug, authorSlug } =
            item.fields;
          return {
            title,
            author,
            category,
            contentPreview,
            readTime,
            slug,
            categorySlug,
            authorSlug,
            postID,
          };
        });
      dispatch({ type: "postsCategory/loaded", payload: postsData });
    } catch (error) {
      dispatch({ type: "rejected", payload: "There was an error loading category post" });
    }
  }, []);

  const fetchAuthorPost = useCallback(async (author) => {
    dispatch({ type: "loading" });
    try {
      const response = await contentfulClient.getEntries({
        content_type: contentfulContentModel,
        "fields.authorSlug": author,
      });

      const postsData = response.items
        .filter((item) => item.fields.authorSlug === author)
        .map((item) => {
          const postID = item.sys.id;
          const { title, author, category, contentPreview, readTime, slug, categorySlug, authorSlug } =
            item.fields;
          return {
            title,
            author,
            category,
            contentPreview,
            readTime,
            slug,
            categorySlug,
            authorSlug,
            postID,
          };
        });
      dispatch({ type: "postsAuthor/loaded", payload: postsData });
    } catch (error) {
      dispatch({ type: "rejected", payload: "There was an error loading author post" });
    }
  }, []);

  const fetchReadTimePost = useCallback(async (readTimeVal) => {
    dispatch({ type: "loading" });
    try {
      const response = await contentfulClient.getEntries({
        content_type: contentfulContentModel,
        "fields.readTime": readTimeVal,
      });

      const postsData = response.items
        .filter((item) => item.fields.readTime === readTimeVal)
        .map((item) => {
          const postID = item.sys.id;
          const { title, author, category, contentPreview, readTime, slug, categorySlug, authorSlug } =
            item.fields;
          return {
            title,
            author,
            category,
            contentPreview,
            readTime,
            slug,
            categorySlug,
            authorSlug,
            postID,
          };
        });
      dispatch({ type: "postsReadTime/loaded", payload: postsData });
    } catch (error) {
      dispatch({ type: "rejected", payload: "There was an error loading read time all posts" });
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
        postsAuthor,
        postsReadTime,
        fetchPopularPosts,
        fetchSinglePost,
        fetchCategoryPost,
        fetchAuthorPost,
        fetchReadTimePost,
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
