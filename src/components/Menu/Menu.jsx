import { Link } from "react-router-dom";
import Showcase from "../Showcase/Showcase";
import "./menu.scss";
import { useRef } from "react";

export default function Menu() {
  const elementCategory = useRef(null);
  const toggleExpandClass = () => {
    if (elementCategory.current) {
      elementCategory.current.classList.toggle("expand");
    }
  };

  return (
    <div className="menu">
      <Showcase />
      <ul className="menu__list">
        <li className="menu__item">
          <Link to="/" className="menu__link">
            Home
          </Link>
        </li>
        <li className="menu__item">
          <Link to="/popularne" className="menu__link">
            Popularne
          </Link>
        </li>
        <li className="menu__item menu__item--has-child" ref={elementCategory}>
          <p className="menu__link menu__link--category" onClick={() => toggleExpandClass()}>
            Kategorie
          </p>
          <ul className="menu__sub-list">
            <li className="menu__sub-item">
              <Link to="/" className="menu__sub-link">
                Technologia i Gadżety
              </Link>
            </li>
            <li className="menu__sub-item">
              <Link to="/" className="menu__sub-link">
                Kuchnia i Przepisy Kulinarne
              </Link>
            </li>
            <li className="menu__sub-item">
              <Link to="/" className="menu__sub-link">
                Zdrowie i Fitness
              </Link>
            </li>
            <li className="menu__sub-item">
              <Link to="/" className="menu__sub-link">
                Moda i Styl
              </Link>
            </li>
            <li className="menu__sub-item">
              <Link to="/" className="menu__sub-link">
                Humor i Rozrywka
              </Link>
            </li>
          </ul>
        </li>
        <li className="menu__item">
          <Link to="/logowanie" className="menu__link">
            Logowanie
          </Link>
        </li>
        <li className="menu__item">
          <Link to="/rejestracja" className="menu__link">
            Rejestracja
          </Link>
        </li>
        <li className="menu__item">
          <Link to="/kontakt" className="menu__link">
            Kontakt
          </Link>
        </li>
      </ul>
    </div>
  );
}
