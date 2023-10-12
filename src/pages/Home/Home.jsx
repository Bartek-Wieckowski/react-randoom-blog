import MainWrapper from "../../components/MainWrapper/MainWrapper";
import PostPreview from "../../components/PostPreview/PostPreview";
import PostsList from "../../components/PostsList/PostsList";
import Slider from "../../components/Slider/Slider";
import { usePosts } from "../../contexts/PostsContext";
import "./home.scss";

export default function Home() {
  const { postsPreview, isLoading } = usePosts();

  return (
    <section className="home">
      <Slider />
      <MainWrapper>
        <h3 className="home__title">Najnowsze posty</h3>
        <PostsList>
          <PostPreview postsData={postsPreview} isLoading={isLoading} />
        </PostsList>
      </MainWrapper>
    </section>
  );
}
