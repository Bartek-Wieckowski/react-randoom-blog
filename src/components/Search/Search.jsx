import { useRef } from "react";
import "./search.scss";

export default function Search() {
  const elementSearch = useRef(null);
  const toggleSearchClass = () => {
    if (elementSearch.current) {
      elementSearch.current.classList.toggle("showsearch");
      document.body.classList.toggle('overflowme');
    }
  };

  return (
    <>
      <button type="button" className="search-trigger" onClick={() => toggleSearchClass()}>
        <i className="ri-search-line"></i>
      </button>
      <div className="search" ref={elementSearch}>
        <button type="button" className="search-close" onClick={() => toggleSearchClass()}>
          <i className="ri-close-line"></i>
        </button>
        <form>
          <input type="search" placeholder="Zacznij pisać i wciśnij enter :)" />
        </form>
      </div>
    </>
  );
}
