import { useParams } from "react-router-dom";
import "./post.scss";
import Hero from "../../components/Hero/Hero";
import MainWrapper from "../../components/MainWrapper/MainWrapper";
import { useEffect } from "react";

export default function Post() {
  const { slug } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="single-post">
      <Hero type="hero__normal">
        <div className="single-post__intro">
          <div className="single-post__heading">
            <h1>
              <a href="#">This wildlife photographer doesn't just shoot landscapes</a>
            </h1>
            <div className="meta">
              <span className="date">27 April 2023</span>
              <span className="category">
                <a href="">Health</a>
              </span>
              <span className="comment">
                <a href="">3 comments</a>
              </span>
            </div>
            <div className="author">
              <img src="assets/author.png" alt="" />
              <h4>
                <a href="#">Sarah</a>
              </h4>
            </div>
          </div>
        </div>
        <p>{slug}</p>
      </Hero>
      <MainWrapper>test 2</MainWrapper>
    </div>
  );
}
