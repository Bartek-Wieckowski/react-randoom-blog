import { createContext, useCallback, useContext, useEffect, useReducer } from "react";
import contentfulClient from "../utils/contentfulConfig";
import { contentfulContentModel } from "../utils/contentfulConfig";

const PostsContext = createContext();

const initialState = {
  posts: [],
  postsPreview: [],
  postsPopular: [],
  postsCategory: [],
  postsAuthor: [],
  postsReadTime: [],
  currentPost: {},
  userSearchData: [],
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
    case "userSearchData/loaded":
      return { ...state, isLoading: false, userSearchData: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

function PostsProvider({ children }) {
  const [
    {
      isLoading,
      postsPreview,
      postsPopular,
      currentPost,
      postsCategory,
      postsAuthor,
      postsReadTime,
      userSearchData,
    },
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

  const fetchUserSearchData = useCallback(async (query) => {
    dispatch({ type: "loading" });
    const fieldsToSearch = {
      category: "fields.category[match]",
      author: "fields.author[match]",
      tags: "fields.tags[match]",
      title: "fields.title[match]",
      readTime: "fields.readTime",
    };

    const isNumeric = !isNaN(query);
    const queries = [];
    const deduplicatedResults = new Set();

    if (isNumeric) {
      queries.push(
        contentfulClient.getEntries({
          content_type: contentfulContentModel,
          [fieldsToSearch["readTime"]]: parseInt(query, 10),
        })
      );
    } else {
      for (const field in fieldsToSearch) {
        if (field !== "readTime") {
          queries.push(
            contentfulClient.getEntries({
              content_type: contentfulContentModel,
              [fieldsToSearch[field]]: query,
            })
          );
        }
      }
    }

    try {
      const responses = await Promise.all(queries);

      responses.forEach((response) => {
        response.items.forEach((item) => {
          deduplicatedResults.add(item.sys.id);
        });
      });

      const mergedResponse = Array.from(deduplicatedResults).map((id) =>
        responses.flatMap((response) => response.items).find((item) => item.sys.id === id)
      );

      dispatch({ type: "userSearchData/loaded", payload: mergedResponse });
    } catch (error) {
      dispatch({ type: "rejected", payload: "There was an error loading the searched query" });
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
        userSearchData,
        fetchUserSearchData,
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
