import "./search-filter-results.scss";
import { useEffect, useRef } from "react";
import { usePosts } from "../../contexts/PostsContext";
import { useLocation } from "react-router-dom";
import Hero from "../../components/Hero/Hero";
import MainWrapper from "../../components/MainWrapper/MainWrapper";
import PostsList from "../../components/PostsList/PostsList";
import Spinner from "../../components/Spinner/Spinner";

export default function SearchFilterResults() {
  const { userSearchData, fetchUserSearchData, isLoading } = usePosts();
  const postsElement = useRef(null);
  const location = useLocation();

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
    <section className="test">
      <Hero type="hero__normal">
        <div className="hero__normal-titles">
          {isLoading ? <Spinner type="small-spinner" /> : <h2 onClick={() => scrollToTarget()}>test</h2>}
        </div>
      </Hero>

      <MainWrapper>
        <h3 className="read-time__title" ref={postsElement}>
          Wszystkie posty
        </h3>
        <PostsList>
          {userSearchData.map((result) => (
            <p key={result.id}>{result.id}</p>
          ))}
        </PostsList>
      </MainWrapper>
    </section>
  );
}
