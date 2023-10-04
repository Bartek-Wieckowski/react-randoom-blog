import "./slider.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

export default function Slider() {
  return (
    <section className="hero">
      <div className="hero__carousel">
        <div className="hero__swiper-wrapper">
          <Swiper spaceBetween={50} slidesPerView={1} modules={[Pagination]} pagination={{ clickable: true }}>
            <SwiperSlide>
              <div className="slide-content">
                <h2 className="slide-content__title">
                  <Link to="/">This wildlife photographer doesn`t just shoot landscapes</Link>
                </h2>
                <div className="slide-content__meta">
                  <span className="author">
                    <a href="">By Sarah</a>
                  </span>
                  <span className="category">
                    <a href="">Photography</a>
                  </span>
                  <div className="read-time">
                    <a href="">2 min</a>
                  </div>
                </div>
                <a href="" className="slide-content__btn read-more">
                  Read more
                </a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <li className="slide-content">
                <h2 className="slide-content__title">
                  <a href="#">Amazon is adding a 5% fuel and inflation surcharge</a>
                </h2>
                <div className="slide-content__meta">
                  <span className="author">By Sarah</span>
                  <span className="category">Ecommerce</span>
                  <div className="read-time">2 min</div>
                </div>
                <a href="" className="slide-content__btn read-more">
                  Read more
                </a>
              </li>
            </SwiperSlide>
            <SwiperSlide>
              <li className="slide-content">
                <h2 className="slide-content__title">
                  <a href="#">Decision fatigue is real. Here`s how to reduce it</a>
                </h2>
                <div className="slide-content__meta">
                  <span className="author">By Faith</span>
                  <span className="category">Photography</span>
                  <div className="read-time">1 min</div>
                </div>
                <a href="" className="slide-content__btn read-more">
                  Read more
                </a>
              </li>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
}
