import { Link, NavLink } from "react-router-dom";
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
          <NavLink to="/" className="menu__link">
            Home
          </NavLink>
        </li>
        <li className="menu__item">
          <NavLink to="/popularne" className="menu__link">
            Popularne
          </NavLink>
        </li>
        <li className="menu__item menu__item--has-child" ref={elementCategory}>
          <p className="menu__link menu__link--category" onClick={() => toggleExpandClass()}>
            Kategorie
          </p>
          <ul className="menu__sub-list">
            <li className="menu__sub-item">
              <NavLink to="/" className="menu__sub-link">
                Technologia i Gadżety
              </NavLink>
            </li>
            <li className="menu__sub-item">
              <NavLink to="/" className="menu__sub-link">
                Kuchnia i Przepisy Kulinarne
              </NavLink>
            </li>
            <li className="menu__sub-item">
              <NavLink to="/" className="menu__sub-link">
                Zdrowie i Fitness
              </NavLink>
            </li>
            <li className="menu__sub-item">
              <NavLink to="/" className="menu__sub-link">
                Moda i Styl
              </NavLink>
            </li>
            <li className="menu__sub-item">
              <NavLink to="/" className="menu__sub-link">
                Humor i Rozrywka
              </NavLink>
            </li>
          </ul>
        </li>
        <li className="menu__item">
          <NavLink to="/logowanie" className="menu__link">
            Logowanie
          </NavLink>
        </li>
        <li className="menu__item">
          <NavLink to="/rejestracja" className="menu__link">
            Rejestracja
          </NavLink>
        </li>
        <li className="menu__item">
          <NavLink to="/kontakt" className="menu__link">
            Kontakt
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
