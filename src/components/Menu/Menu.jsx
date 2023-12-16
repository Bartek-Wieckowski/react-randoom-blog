import './menu.scss';
import { useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { usePosts } from '../../contexts/PostsContext';
import Showcase from '../Showcase/Showcase';
import { menuItems, menuUserItems } from '../../utils/navigationMenu';
import { useLogout } from '../../auth/useLogoutHook';
import { useUser } from '../../auth/useUserHook';

export default function Menu({ onOpenMobileMenu }) {
  const categoryElementRef = useRef(null);
  const { fetchCategoryPost } = usePosts();
  const { pathname: currentPathname } = useLocation();
  const { logout } = useLogout();
  const { user } = useUser();

  const toggleExpandClass = () => {
    if (categoryElementRef.current) {
      categoryElementRef.current.classList.toggle('expand');
    }
  };

  const handleCloseMenu = () => {
    onOpenMobileMenu(false);
    document.body.classList.remove('overflowme');
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
            className={`menu__item ${
              item.hasChild ? 'menu__item--has-child' : ''
            }`}
            ref={item.hasChild ? categoryElementRef : null}
          >
            {item.hasChild ? (
              <p
                className="menu__link menu__link--category"
                onClick={toggleExpandClass}
              >
                {item.label}
              </p>
            ) : (
              <NavLink
                to={item.to}
                className={'menu__link'}
                onClick={handleCloseMenu}
              >
                {item.label}
              </NavLink>
            )}
            {item.hasChild && (
              <ul className="menu__sub-list">
                {item.subItems.map((subItem, subIndex) => (
                  <li key={subIndex} className="menu__sub-item">
                    <NavLink
                      to={subItem.to}
                      className={`menu__sub-link ${
                        currentPathname === item.to ? 'active' : ''
                      }`}
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
        {user &&
          menuUserItems.map(
            (item, index) =>
              item.hasUserLoggin && (
                <li
                  key={index}
                  className={`menu__item ${
                    item.hasChild ? 'menu__item--has-child' : ''
                  }`}
                  ref={item.hasChild ? categoryElementRef : null}
                >
                  {item.hasChild ? (
                    <p
                      className="menu__link menu__link--category"
                      onClick={toggleExpandClass}
                    >
                      {item.label}
                    </p>
                  ) : (
                    <NavLink
                      to={item.to}
                      className={'menu__link'}
                      onClick={handleCloseMenu}
                    >
                      {item.label}
                    </NavLink>
                  )}
                  {item.hasChild && (
                    <ul className="menu__sub-list">
                      {item.subItems.map((subItem, subIndex) => (
                        <li key={subIndex} className="menu__sub-item">
                          <NavLink
                            to={subItem.to}
                            className={`menu__sub-link ${
                              currentPathname === item.to ? 'active' : ''
                            }`}
                            onClick={() => selectedCategory(subItem.slug)}
                          >
                            {subItem.label}
                          </NavLink>
                        </li>
                      ))}
                      <li className="menu__sub-item">
                        <a
                          className="menu__sub-link logout"
                          onClick={() => logout()}
                        >
                          Wyloguj
                        </a>
                      </li>
                    </ul>
                  )}
                </li>
              )
          )}
        {!user &&
          menuUserItems.map(
            (item, index) =>
              !item.hasUserLoggin &&
              !item.hasChild && (
                <li key={index} className="menu__item">
                  <NavLink
                    to={item.to}
                    className="menu__link"
                    onClick={handleCloseMenu}
                  >
                    {item.label}
                  </NavLink>
                </li>
              )
          )}
      </ul>
    </div>
  );
}
