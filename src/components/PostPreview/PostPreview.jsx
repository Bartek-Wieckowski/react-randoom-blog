import { Link } from "react-router-dom";
import "./post-preview.scss";

export default function PostPreview() {
  return (
    <article className="post-preview">
      <header>
        <h2 className="post-preview__title">
          <Link to="/">Decision fatigue is real. Here's how to reduce it</Link>
        </h2>
        <div className="post-preview__meta">
          <span className="author">
            <Link to="/">By Sarah</Link>
          </span>
          <span className="category">
            <Link to="/">Health</Link>
          </span>
          <span className="read-time">
            <Link to="/">1 min</Link>
          </span>
          <span className="comment">
            <Link to="/">3 Comments</Link>
          </span>
        </div>
      </header>
      <section className="post-preview__content">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dignissimos laborum vitae ea
          architecto iure quis numquam impedit. Iusto, laboriosam? Earum eos expedita provident, ea commodi
          aperiam consequatur esse, corrupti assumenda aliquid inventore consequuntur accusantium, architecto
          error vitae repellendus culpa quam saepe cum ullam autem dolorem nam! Ullam ea similique, porro
          laborum eligendi architecto vel quaerat error ex qui sint quis eaque perferendis ab ipsam,
          voluptatum esse ut officia debitis repellendus repudiandae enim consectetur incidunt! Soluta beatae
          est, reiciendis quaerat expedita dignissimos incidunt, nihil voluptate ab nesciunt maxime quos. Odit
          obcaecati nam totam, minus possimus nisi. Modi, cumque quibusdam! Quibusdam quas placeat libero
          nemo, molestias dolor iste sint, voluptatibus amet quis ducimus harum unde voluptates aperiam porro?
          Iure ea nam veniam impedit repellat, voluptas sit omnis quisquam soluta accusantium expedita quos
          rerum similique dolore quas perspiciatis repellendus sequi, corporis animi.
        </p>
      </section>
      <footer>
        <Link to="/" className="post-preview__btn read-more">
          Read more
        </Link>
      </footer>
    </article>
  );
}
