import "./post-preview.scss";
import { Link } from "react-router-dom";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Spinner from "../Spinner/Spinner";

export default function PostPreview({ postsData, isLoading }) {
  if (isLoading) return <Spinner type="small-spinner" />;
  return (
    <>
      {postsData?.map((post) => (
        <article className="post-preview" key={post?.postID}>
          <header>
            <h2 className="post-preview__title">
              <Link to={`/post/${post.slug}`}>{post?.title}</Link>
            </h2>
            <div className="post-preview__meta">
              <span className="author">
                <Link to={`/autor/${post?.authorSlug}`}>{post?.author ? post.author : "Anonim"}</Link>
              </span>
              <span className="category">
                <Link to={`/kategoria/${post.categorySlug}`}>{post?.category}</Link>
              </span>
              <span className="read-time">
                <Link to={`/czas-czytania/${post?.readTime}`}>{post?.readTime} min</Link>
              </span>
              <span className="comment">
                <Link to="/">3 komentarze</Link>
              </span>
            </div>
          </header>
          <section className="post-preview__content">
            {documentToReactComponents(post?.contentPreview)}
          </section>
          <footer>
            <Link to={`/post/${post.slug}`} className="post-preview__btn read-more">
              Czytaj więcej
            </Link>
          </footer>
        </article>
      ))}
    </>
  );
}
