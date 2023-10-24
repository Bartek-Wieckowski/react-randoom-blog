import { useNavigate } from "react-router-dom";
import { useSearchFilter } from "../../contexts/SearchFilterContext";
import { getUniqueValues } from "../../utils/helpers";
import "./filters.scss";

export default function Filters() {
  const navigate = useNavigate();
  const {
    filters: { author, category },
    updateFilters,
    posts,
  } = useSearchFilter();

  const categories = getUniqueValues(posts, "category");
  const authors = getUniqueValues(posts, "author");

  const updateFiltersWithUrlUpdate = (e) => {
    const urlWithoutQParam = new URLSearchParams(window.location.search);
    urlWithoutQParam.delete("q");
    navigate({ search: urlWithoutQParam.toString() });

    updateFilters(e);
  };

  return (
    <aside className="filters-wrapper">
      <div className="content">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-control">
            <h5>Kategorie</h5>
            <div>
              {categories.map((c, index) => {
                return (
                  <button
                    type="button"
                    name="category"
                    key={index}
                    onClick={updateFiltersWithUrlUpdate}
                    className={`${category === c.toLowerCase() ? "active" : null}`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="form-control">
            <h5>Autor</h5>
            <select name="author" value={author} onChange={updateFiltersWithUrlUpdate} className="author">
              {authors.map((c, index) => {
                return (
                  <option key={index} value={c}>
                    {c}
                  </option>
                );
              })}
            </select>
          </div>
        </form>
      </div>
    </aside>
  );
}
