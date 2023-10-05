import MainWrapper from "../../components/MainWrapper/MainWrapper";
import Slider from "../../components/Slider/Slider";
import "./home.scss";

export default function Home() {
  return (
    <section className="home">
        <Slider />
        <MainWrapper>
          <h3 className="home__title">Najnowsze posty</h3>
        </MainWrapper>
    </section>
  );
}
