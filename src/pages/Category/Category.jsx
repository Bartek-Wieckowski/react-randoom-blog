import "./category.scss";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { usePosts } from "../../contexts/PostsContext";
import Hero from "../../components/Hero/Hero";
import MainWrapper from "../../components/MainWrapper/MainWrapper";
import PostsList from "../../components/PostsList/PostsList";
import PostPreview from "../../components/PostPreview/PostPreview";
import Spinner from "../../components/Spinner/Spinner";

export default function Category() {
  const { postsCategory, fetchCategoryPost, isLoading } = usePosts();
  const { slug } = useParams();
  const postsElement = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCategoryPost(slug);
  }, [fetchCategoryPost, slug]);

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
    <section className="category">
      <Hero type="hero__normal">
        <div className="hero__normal-titles">
          {isLoading ? (
            <Spinner type="small-spinner" />
          ) : (
            <h2 onClick={() => scrollToTarget()}>
              Poznaj posty z kategorii: <br />
              {postsCategory[0]?.category}
            </h2>
          )}
        </div>
      </Hero>

      <MainWrapper>
        <h3 className="category__title" ref={postsElement}>
          Wszystkie posty z kategorii
        </h3>
        <PostsList>
          <PostPreview postsData={postsCategory} isLoading={isLoading} />
        </PostsList>
      </MainWrapper>
    </section>
  );
}
