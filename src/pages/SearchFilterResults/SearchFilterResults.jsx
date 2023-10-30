import "./search-filter-results.scss";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useSearchFilter } from "../../contexts/SearchFilterContext";
import Hero from "../../components/Hero/Hero";
import MainWrapper from "../../components/MainWrapper/MainWrapper";
import Spinner from "../../components/Spinner/Spinner";
import Filters from "../../components/Filters/Filters";
import SearchResults from "../../components/SearchResults/SearchResults";

export default function SearchFilterResults() {
  const { userSearchData, fetchUserSearchData, isLoading, filteredPosts } = useSearchFilter();
  const postsElement = useRef(null);
  const location = useLocation();
  const allFoundedPosts = filteredPosts.length > 0 ? filteredPosts.length : userSearchData.length;

  const updatedResults = filteredPosts.length > 0 ? filteredPosts : userSearchData;

  useEffect(() => {
    window.scrollTo(0, 0);
    const queryParams = new URLSearchParams(location.search);
    const q = queryParams.get("q");
    fetchUserSearchData(q);
  }, [fetchUserSearchData, location.search]);

  const scrollToTarget = () => {
    if (postsElement.current) {
      const targetElement = postsElement.current;
      const targetPosition = targetElement.getBoundingClientRect().top;

      window.scrollTo({
        top: targetPosition - 125,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="search-filter-results">
      <Hero type="hero__normal">
        <div className="hero__normal-titles">
          {isLoading && <Spinner type="small-spinner" />}
          {!isLoading && location.search ? (
            <h2 onClick={() => scrollToTarget()}>
              Wyszukane wyniki dla: <br /> {location.search.replace("?q=", "").replaceAll("%20", " ")}
            </h2>
          ) : (
            <h2 onClick={() => scrollToTarget()}>Filtruj posty</h2>
          )}
        </div>
      </Hero>

      <MainWrapper>
        <h3 className="read-time__title" ref={postsElement}>
          Znaleziony posty: {allFoundedPosts}
        </h3>
        <div className="search-filter-results-wrapper">
          <Filters />
          <SearchResults results={updatedResults} />
        </div>
      </MainWrapper>
    </section>
  );
}
