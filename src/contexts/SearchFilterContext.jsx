import contentfulClient from "../utils/contentfulConfig";
import { createContext, useCallback, useContext, useEffect, useReducer } from "react";
import { contentfulContentModel } from "../utils/contentfulConfig";

const SearchFilterContext = createContext();

const initialState = {
  posts: [],
  filteredPosts: [],
  userSearchData: [],
  filters: {
    author: "Wszyscy",
    category: "Wszystkie",
  },
  userActionInFilters: false,
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
    case "posts/loaded": {
      return {
        ...state,
        posts: [...action.payload],
        filters: { ...state.filters },
      };
    }
    case "filters/updated": {
      const { name, value } = action.payload;
      return {
        ...state,
        filters: { ...state.filters, [name]: value },
        userActionInFilters: true,
        userSearchData: [],
      };
    }
    case "posts/filtered": {
      const { posts, filters, userSearchData, userActionInFilters } = state;
      const { author, category } = filters;

      if (userActionInFilters) {
        let tempPostsFilter = [...posts];

        if (author === "Wszyscy" && category === "Wszystkie") {
          return {
            ...state,
            filteredPosts: userSearchData.length > 0 ? userSearchData : tempPostsFilter,
          };
        }

        if (author === "Wszyscy" && category !== "Wszystkie") {
          tempPostsFilter = tempPostsFilter.filter((post) => post.category === category);
        } else {
          if (author !== "Wszyscy") {
            tempPostsFilter = tempPostsFilter.filter((post) => post.author === author);
          }

          if (category !== "Wszystkie") {
            tempPostsFilter = tempPostsFilter.filter((post) => post.category === category);
          }
        }

        const postsExist = tempPostsFilter.length > 0;

        if (!postsExist) {
          return { ...state, filteredPosts: [] };
        }

        return { ...state, filteredPosts: tempPostsFilter };
      }
      return { ...state };
    }

    case "userSearchData/loaded":
      return {
        ...state,
        isLoading: false,
        userSearchData: action.payload,
        filteredPosts: [],
        filters: {
          author: "Wszyscy",
          category: "Wszystkie",
        },
        userActionInFilters: false,
      };
    default:
      throw new Error("Unknown action type");
  }
}

function SearchFilterProvider({ children }) {
  const [
    { isLoading, gridView, userSearchData, posts, filteredPosts, filters, userActionInFilters },
    dispatch,
  ] = useReducer(reducer, initialState);

  const setGridView = () => {
    dispatch({ type: "setGridView" });
  };
  const setListView = () => {
    dispatch({ type: "setListView" });
  };

  const updateFilters = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "category") {
      value = e.target.textContent;
    }
    dispatch({ type: "filters/updated", payload: { name, value } });
  };

  useEffect(() => {
    async function fetchPosts() {
      dispatch({ type: "loading" });
      try {
        const response = await contentfulClient.getEntries({
          content_type: contentfulContentModel,
        });
        const postsData = response.items.map((item) => {
          const postID = item.sys.id;
          const {
            title,
            author,
            category,
            contentPreview,
            readTime,
            slug,
            categorySlug,
            authorSlug,
            mainImg,
          } = item.fields;
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
            mainImg,
          };
        });
        dispatch({ type: "posts/loaded", payload: postsData });
      } catch {
        dispatch({ type: "rejected", payload: "There was an error loading posts" });
      }
    }
    fetchPosts();
  }, []);

  useEffect(
    function () {
      dispatch({ type: "posts/filtered" });
    },
    [filters]
  );

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
      const transformedData = mergedResponse.map((item) => {
        const postID = item.sys.id;
        const { title, author, category, contentPreview, readTime, slug, categorySlug, authorSlug, mainImg } =
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
          mainImg,
        };
      });

      dispatch({ type: "userSearchData/loaded", payload: transformedData });
    } catch (error) {
      dispatch({ type: "rejected", payload: "There was an error loading the searched query" });
    }
  }, []);

  return (
    <SearchFilterContext.Provider
      value={{
        isLoading,
        fetchUserSearchData,
        userSearchData,
        gridView,
        setGridView,
        setListView,
        updateFilters,
        filters,
        posts,
        filteredPosts,
        userActionInFilters,
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

// eslint-disable-next-line react-refresh/only-export-components
export { SearchFilterProvider, useSearchFilter };
