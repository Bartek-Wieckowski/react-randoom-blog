import { useEffect, useRef } from "react";
import Hero from "../../components/Hero/Hero";
import MainWrapper from "../../components/MainWrapper/MainWrapper";
import PostsList from "../../components/PostsList/PostsList";
import PostPreview from "../../components/PostsPreview/PostsPreview";
import "./category.scss";
import { usePosts } from "../../contexts/PostsContext";

export default function Category() {
  const { postsCategory, fetchCategoryPost, isLoading } = usePosts();
  const postsElement = useRef(null);

  useEffect(() => {
    fetchCategoryPost();
  }, [fetchCategoryPost]);

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
          <h2 onClick={() => scrollToTarget()}>Poznaj posty z kategorii: </h2>
        </div>
      </Hero>

      <MainWrapper>
        <h3 className="category__title" ref={postsElement}>
          Kategoria:
        </h3>
        <PostsList>
          <PostPreview postsData={postsCategory} isLoading={isLoading} />
        </PostsList>
      </MainWrapper>
    </section>
  );
}
