import "./slider.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMostVisitedPost } from "../../services/apiPosts";
import { usePosts } from "../../contexts/PostsContext";

export default function Slider() {
  const [mostVisitedPosts, setMostVisitedPosts] = useState([]);
  const { postsPreview } = usePosts();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMostVisitedPost();
        setMostVisitedPosts(data);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchData();
  }, []);

  const sliderThreePost = postsPreview.filter((item) =>
    mostVisitedPosts.some((searchID) => searchID.postIDContentful === item.postID)
  );

  return (
    <div className="slider__swiper-wrapper">
      <Swiper spaceBetween={50} slidesPerView={1} modules={[Pagination]} pagination={{ clickable: true }}>
        {sliderThreePost.map((slider) => (
          <SwiperSlide key={slider.postID}>
            <div className="slide-content">
              <h2 className="slide-content__title">
                <Link to={`/post/${slider.slug}`}>{slider.title}</Link>
              </h2>
              <div className="slide-content__meta">
                <span className="author">
                  <Link to={`/autor/${slider.authorSlug}`}>{slider.author}</Link>
                </span>
                <span className="category">
                  <Link to={`/kategoria/${slider.categorySlug}`}>{slider.category}</Link>
                </span>
                <div className="read-time">
                  <Link to={`/czas-czytania/${slider.readTime}`}>{slider.readTime} min</Link>
                </div>
              </div>
              <Link to={`/post/${slider.slug}`} className="slide-content__btn read-more">
                Czytaj więcej
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
