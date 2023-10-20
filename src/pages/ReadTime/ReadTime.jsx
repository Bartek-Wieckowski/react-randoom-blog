import "./read-time.scss";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { usePosts } from "../../contexts/PostsContext";
import Hero from "../../components/Hero/Hero";
import MainWrapper from "../../components/MainWrapper/MainWrapper";
import PostsList from "../../components/PostsList/PostsList";
import PostPreview from "../../components/PostPreview/PostPreview";
import Spinner from "../../components/Spinner/Spinner";

export default function ReadTIme() {
  const { postsReadTime, fetchReadTimePost, isLoading } = usePosts();
  const { value } = useParams();
  const postsElement = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchReadTimePost(Number(value));
  }, [fetchReadTimePost, value]);

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
    <section className="read-time">
      <Hero type="hero__normal">
        <div className="hero__normal-titles">
          {isLoading ? (
            <Spinner type="small-spinner" />
          ) : (
            <h2 onClick={() => scrollToTarget()}>
              Poznaj posty, które czytasz w
              <br /> {postsReadTime[0]?.readTime} min
            </h2>
          )}
        </div>
      </Hero>

      <MainWrapper>
        <h3 className="read-time__title" ref={postsElement}>
          Wszystkie posty
        </h3>
        <PostsList>
          <PostPreview postsData={postsReadTime} isLoading={isLoading} />
        </PostsList>
      </MainWrapper>
    </section>
  );
}
