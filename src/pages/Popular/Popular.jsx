import { useEffect } from "react";
import PostPreview from "../../components/PostPreview/PostPreview";
import PostsList from "../../components/PostsList/PostsList";
import { usePosts } from "../../contexts/PostsContext";
import "./popular.scss";
import MainWrapper from "../../components/MainWrapper/MainWrapper";
import Hero from "../../components/Hero/Hero";

export default function Popular() {
  const { postsPopular, isLoading, fetchPopularPosts } = usePosts();

  useEffect(() => {
    fetchPopularPosts();
  }, [fetchPopularPosts]);

  return (
    <section className="popular">
      <Hero type="hero__normal">
        <div className="hero__normal-titles">
          <h2>Poznaj najbardziej popularne posty wg naszych czytelników</h2>
        </div>
      </Hero>

      <MainWrapper>
        <h3 className="popular__title">Popularne posty</h3>
        <PostsList>
          <PostPreview postsData={postsPopular} isLoading={isLoading} />
        </PostsList>
      </MainWrapper>
    </section>
  );
}
