import { Link } from "react-router-dom";
import "./post-preview.scss";
import clientContentful from "../../helpers/contentfulConfig";
import { useEffect, useState } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default function PostPreview() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const getData = async () => {
    try {
      const response = await clientContentful.getEntries({
        content_type: "randoomBlogPosts",
      });
      const postsData = response.items.map((item) => {
        const { title, author, category, contentPreview, readTime } = item.fields;
        return { title, author, category, contentPreview, readTime };
      });
      setLoading(false);
      setPosts(postsData);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {posts.map((post) => (
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
