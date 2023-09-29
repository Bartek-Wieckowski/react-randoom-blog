import { Link } from "react-router-dom";
import Showcase from "../Showcase/Showcase";
import "./menu.scss";

export default function Menu() {
  return (
    <div className="menu">
      <Showcase />
      <ul className="main-menu-list">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/popular">Popularne</Link>
        </li>
        <li className="has-child">
          <Link to="/category">Kategorie</Link>
          <ul className="sub-menu-list">
            <li>
              <Link to="/">Technologia i Gadżety</Link>
            </li>
            <li>
              <Link to="/">Kuchnia i Przepisy Kulinarne</Link>
            </li>
            <li>
              <Link to="/">Zdrowie i Fitness</Link>
            </li>
            <li>
              <Link to="/">Moda i Styl</Link>
            </li>
            <li>
              <Link to="/">Humor i Rozrywka</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/login">Logowanie</Link>
        </li>
        <li>
          <Link to="/register">Rejestracja</Link>
        </li>
        <li>
          <Link to="/contact">Kontakt</Link>
        </li>
      </ul>
    </div>
  );
}
