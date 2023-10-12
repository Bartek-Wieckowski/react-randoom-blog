import { useEffect } from "react";
import PostPreview from "../../components/PostPreview/PostPreview";
import PostsList from "../../components/PostsList/PostsList";
import { usePosts } from "../../contexts/PostsContext";
import "./popular.scss";
import MainWrapper from "../../components/MainWrapper/MainWrapper";

export default function Popular() {
  const { postsPopular, isLoading, fetchPopularPosts } = usePosts();

  useEffect(() => {
    fetchPopularPosts();
  }, [fetchPopularPosts]);

  return (
    <section className="popular">
      <section className="hero">
        <div className="hero__popular">
          <h2>Poznaj najbardziej popularne posty</h2>
          <h2>wg naszych czytelników</h2>
        </div>
      </section>
      <MainWrapper>
        <h3 className="popular__title">Popularne posty</h3>
        <PostsList>
          <PostPreview postsData={postsPopular} isLoading={isLoading} />
        </PostsList>
      </MainWrapper>
    </section>
  );
}
