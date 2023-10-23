import { createContext, useCallback, useContext, useEffect, useReducer } from "react";
import contentfulClient from "../utils/contentfulConfig";
import { contentfulContentModel } from "../utils/contentfulConfig";

const SearchFilterContext = createContext();

const initialState = {
  posts: [],
  filteredPosts: [],
  userSearchData: [],
  gridView: true,
  isLoading: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    case "setGridView":
      return { ...state, gridView: true };
    case "setListView":
      return { ...state, gridView: false };
    case "posts/loaded":
      return { ...state, isLoading: false, posts: action.payload };
    case "userSearchData/loaded":
      return { ...state, isLoading: false, userSearchData: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

function SearchFilterProvider({ children }) {
  const [{ isLoading, gridView, filteredPosts, userSearchData }, dispatch] = useReducer(reducer, initialState);

  function setGridView() {
    dispatch({ type: "setGridView" });
  }

  function setListView() {
    dispatch({ type: "setListView" });
  }

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
        dispatch({ type: "posts/loaded", payload: postsData });
      } catch {
        dispatch({ type: "rejected", payload: "There was an error loading posts" });
      }
    }
    fetchPosts();
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
    <SearchFilterContext.Provider
      value={{
        isLoading,
        gridView,
        setGridView,
        setListView,
        filteredPosts,
        fetchUserSearchData,
        userSearchData,
      }}
    >
      {children}
    </SearchFilterContext.Provider>
  );
}

function useSearchFilter() {
  const context = useContext(SearchFilterContext);
  if (context === undefined) throw new Error("SearchFilterContext was used outside the SearchFilterProvider");
  return context;
}

export { SearchFilterProvider, useSearchFilter };
