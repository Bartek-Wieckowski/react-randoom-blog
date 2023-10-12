import { Link } from "react-router-dom";
import "./post-preview.scss";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Spinner from "../Spinner/Spinner";

export default function PostPreview({ postsData, isLoading }) {
  if (isLoading) return <Spinner />;
  return (
    <>
      {postsData?.map((post) => (
        <article className="post-preview" key={post.title}>
          <header>
            <h2 className="post-preview__title">
              <Link to="/">{post.title}</Link>
            </h2>
            <div className="post-preview__meta">
              <span className="author">
                <Link to="/">{post.author}</Link>
              </span>
              <span className="category">
                <Link to="/">{post.category}</Link>
              </span>
              <span className="read-time">
                <Link to="/">{post.readTime} min</Link>
              </span>
              <span className="comment">
                <Link to="/">3 komentarze</Link>
              </span>
            </div>
          </header>
          <section className="post-preview__content">
            {documentToReactComponents(post.contentPreview)}
          </section>
          <footer>
            <Link to="/" className="post-preview__btn read-more">
              Czytaj więcej
            </Link>
          </footer>
        </article>
      ))}
    </>
  );
}
