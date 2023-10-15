import "./menu.scss";
import { useRef } from "react";
import { NavLink } from "react-router-dom";
import Showcase from "../Showcase/Showcase";

export default function Menu({ onOpenMobileMenu }) {
  const elementCategory = useRef(null);

  const toggleExpandClass = () => {
    if (elementCategory.current) {
      elementCategory.current.classList.toggle("expand");
    }
  };

  const handleCloseMenu = () => {
    onOpenMobileMenu(false);
    document.body.classList.remove("overflowme");
  };

  return (
    <div className="menu">
      <Showcase />
      <ul className="menu__list">
        <li className="menu__item">
          <NavLink to="/" className="menu__link" onClick={() => handleCloseMenu()}>
            Home
          </NavLink>
        </li>
        <li className="menu__item">
          <NavLink to="/popularne" className="menu__link" onClick={() => handleCloseMenu()}>
            Popularne
          </NavLink>
        </li>
        <li className="menu__item menu__item--has-child" ref={elementCategory}>
          <p className="menu__link menu__link--category" onClick={() => toggleExpandClass()}>
            Kategorie
          </p>
          <ul className="menu__sub-list">
            <li className="menu__sub-item">
              <NavLink to="/" className="menu__sub-link" onClick={() => handleCloseMenu()}>
                Technologia i Gadżety
              </NavLink>
            </li>
            <li className="menu__sub-item">
              <NavLink to="/" className="menu__sub-link" onClick={() => handleCloseMenu()}>
                Kuchnia i Przepisy Kulinarne
              </NavLink>
            </li>
            <li className="menu__sub-item">
              <NavLink to="/" className="menu__sub-link" onClick={() => handleCloseMenu()}>
                Zdrowie i Fitness
              </NavLink>
            </li>
            <li className="menu__sub-item">
              <NavLink to="/" className="menu__sub-link" onClick={() => handleCloseMenu()}>
                Moda i Styl
              </NavLink>
            </li>
            <li className="menu__sub-item">
              <NavLink to="/" className="menu__sub-link" onClick={() => handleCloseMenu()}>
                Humor i Rozrywka
              </NavLink>
            </li>
          </ul>
        </li>
        <li className="menu__item">
          <NavLink to="/logowanie" className="menu__link" onClick={() => handleCloseMenu()}>
            Logowanie
          </NavLink>
        </li>
        <li className="menu__item">
          <NavLink to="/rejestracja" className="menu__link" onClick={() => handleCloseMenu()}>
            Rejestracja
          </NavLink>
        </li>
        <li className="menu__item">
          <NavLink to="/kontakt" className="menu__link" onClick={() => handleCloseMenu()}>
            Kontakt
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
