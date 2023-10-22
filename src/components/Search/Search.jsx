import "./search.scss";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// TODO: do zrobienia autofocus w input search

export default function Search() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const elementSearchRef = useRef(null);

  const handleSearch = () => {
    if (query.trim() === "") {
      return; // TODO: dodac alert o pustym inpucie
    }

    navigate(`/wyniki-wyszukiwania?q=${query}`);
    setQuery("");
    toggleSearchClass();
  };

  const onEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      if (query.trim() !== "") {
        handleSearch();
      } else {
        e.preventDefault();
      }
    }
  };

  const toggleSearchClass = () => {
    if (elementSearchRef.current) {
      elementSearchRef.current.classList.toggle("showsearch");
      document.body.classList.toggle("overflowme");
    }
  };

  return (
    <>
      <button type="button" className="search-trigger" onClick={toggleSearchClass}>
        <i className="ri-search-line"></i>
      </button>
      <div className="search" ref={elementSearchRef}>
        <button type="button" className="search-close" onClick={toggleSearchClass}>
          <i className="ri-close-line"></i>
        </button>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <input
            type="search"
            placeholder="Zacznij pisać i wciśnij enter :)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onEnterKeyPress}
          />
        </form>
      </div>
    </>
  );
}
