import { Link } from "react-router-dom";
import { useSearchFilter } from "../../contexts/SearchFilterContext";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import "./search-results.scss";

export default function SearchResults({ results }) {
  const { gridView, setListView, setGridView } = useSearchFilter();

  if (results.length < 1) return <h5 style={{ textTransform: "none" }}>Nie znaleziono</h5>;

  return (
    <div className="search-result-wrapper">
      <div className="search-result-options-view">
        <button onClick={setGridView} className={`${gridView ? "active" : ""}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000" viewBox="0 0 256 256">
            <path d="M104,40H56A16,16,0,0,0,40,56v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,104,40Zm0,64H56V56h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,64H152V56h48v48Zm-96,32H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm0,64H56V152h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,200,136Zm0,64H152V152h48v48Z"></path>
          </svg>
        </button>
        <button onClick={setListView} className={`${!gridView ? "active" : ""}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000" viewBox="0 0 256 256">
            <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
          </svg>
        </button>
      </div>
      {gridView === false ? <ListView posts={results} /> : <GridView posts={results} />}
    </div>
  );
}

function GridView({ posts }) {
  return (
    <>
      <div className="grid-posts-container">
        {posts?.map((post) => (
          <article key={post?.postID}>
            <div className="grid-post-item">
              <img src={post?.mainImg?.fields?.file?.url} alt={post?.title} />
              <Link to={`/post/${post?.slug}`} className="link">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#000"
                  viewBox="0 0 256 256"
                >
                  <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                </svg>
              </Link>
            </div>
            <footer className="grid-post-item-footer">
              <h5>{post?.title}</h5>
              <p>{post?.author}</p>
            </footer>
          </article>
        ))}
      </div>
    </>
  );
}

function ListView({ posts }) {
  return (
    <>
      <div className="list-posts-container">
        {posts?.map((post) => (
          <article className="list-post-item" key={post?.postID}>
            <div className="list-post-item-img-tags">
              <img src={post?.mainImg?.fields?.file?.url} alt={post?.title} />
              <div className="tags">
                {post?.tags?.map((tag) => (
                  <Link className="btn-tag" key={tag}>
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            <div className="list-post-item-details">
              <h4>{post?.title}</h4>
              <h5>{post?.category}</h5>
              <div>{documentToReactComponents(post?.contentPreview)}</div>
              <Link to={`/post/${post?.slug}`} className="btn">
                Czytaj więcej
              </Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
