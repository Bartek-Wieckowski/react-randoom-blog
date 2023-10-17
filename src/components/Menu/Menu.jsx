import "./menu.scss";
import { useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { usePosts } from "../../contexts/PostsContext";
import Showcase from "../Showcase/Showcase";
import menuItems from "../../utils/navigationMenu";

export default function Menu({ onOpenMobileMenu }) {
  const categoryElementRef = useRef(null);
  const { fetchCategoryPost } = usePosts();
  const { pathname: currentPathname } = useLocation();

  const toggleExpandClass = () => {
    if (categoryElementRef.current) {
      categoryElementRef.current.classList.toggle("expand");
    }
  };

  const handleCloseMenu = () => {
    onOpenMobileMenu(false);
    document.body.classList.remove("overflowme");
  };

  const selectedCategory = (category) => {
    fetchCategoryPost(category);
    handleCloseMenu();
  };

  return (
    <div className="menu">
      <Showcase />
      <ul className="menu__list">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`menu__item ${item.hasChild ? "menu__item--has-child" : ""}`}
            ref={item.hasChild ? categoryElementRef : null}
          >
            {item.hasChild ? (
              <p className="menu__link menu__link--category" onClick={toggleExpandClass}>
                {item.label}
              </p>
            ) : (
              <NavLink to={item.to} className={"menu__link"} onClick={handleCloseMenu}>
                {item.label}
              </NavLink>
            )}
            {item.hasChild && (
              <ul className="menu__sub-list">
                {item.subItems.map((subItem, subIndex) => (
                  <li key={subIndex} className="menu__sub-item">
                    <NavLink
                      to={subItem.to}
                      className={`menu__sub-link ${currentPathname === item.to ? "active" : ""}`}
                      onClick={() => selectedCategory(subItem.slug)}
                    >
                      {subItem.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
