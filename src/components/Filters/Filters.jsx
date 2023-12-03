import { useNavigate, useSearchParams } from "react-router-dom";
import { useSearchFilter } from "../../contexts/SearchFilterContext";
import { getUniqueValues } from "../../utils/helpers";
import "./filters.scss";
import { useState } from "react";

export default function Filters() {
  const [activeCategory, setActiveCategory] = useState(null);
  const {
    filters: { author },
    updateFilters,
    posts,
  } = useSearchFilter();
  const [queryParams] = useSearchParams();
  const navigate = useNavigate();

  const categories = getUniqueValues(posts, "category");
  const authors = getUniqueValues(posts, "author");

  const updateFiltersWithUrlUpdate = (e) => {
    const getQParams = queryParams.get("q");
    if (getQParams) {
      queryParams.delete("q");
      navigate("/wyniki-wyszukiwania");
    }
    setActiveCategory(e.target.textContent.toLowerCase());
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
                    className={activeCategory === c.toLowerCase() ? "active" : ""}
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
