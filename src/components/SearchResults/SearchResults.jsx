import { Link } from "react-router-dom";
import { useSearchFilter } from "../../contexts/SearchFilterContext";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { HiAdjustmentsHorizontal, HiBars3, HiMiniSquares2X2 } from "react-icons/hi2";
import "./search-results.scss";

export default function SearchResults({ results, onShowMobileFilters }) {
  const { gridView, setListView, setGridView } = useSearchFilter();

  if (results.length < 1)
    return (
      <>
        <button onClick={onShowMobileFilters} className="show-filters-in-mobile">
          <HiAdjustmentsHorizontal />
        </button>
        <h5 style={{ textTransform: "none", flex: 1 }}>Nie znaleziono</h5>
      </>
    );

  return (
    <div className="search-result-wrapper">
      <div className="search-result-options-view">
        <button onClick={setGridView} className={`${gridView ? "active" : ""}`}>
          <HiMiniSquares2X2 />
        </button>
        <button onClick={setListView} className={`${!gridView ? "active" : ""}`}>
          <HiBars3 />
        </button>
        <button onClick={onShowMobileFilters} className="show-filters-in-mobile">
          <HiAdjustmentsHorizontal />
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
