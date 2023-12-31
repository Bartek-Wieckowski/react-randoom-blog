import { useEffect, useState } from 'react';
import Logo from '../Logo/Logo';
import Menu from '../Menu/Menu';
import Search from '../Search/Search';
import './navigation.scss';
import { useLocation } from 'react-router-dom';

export default function Navigation({ onOpenMobileMenu }) {
  const [isFixed, setIsFixed] = useState(false);
  let location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (
        location.pathname === '/rejestracja' ||
        location.pathname === '/logowanie' ||
        location.pathname === '/kontakt' ||
        location.pathname === '/profil/ustawienia' ||
        location.pathname === '/profil/historia'
      ) {
        setIsFixed(true);
      } else {
        if (window.scrollY > 600) {
          setIsFixed(true);
        } else {
          setIsFixed(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  const handleToggleMenu = () => {
    onOpenMobileMenu(true);
    document.body.classList.toggle('overflowme');
  };

  const navFixedClass = isFixed ? 'fixed' : '';

  return (
    <header className={`page-header ${navFixedClass}`}>
      <div className="container">
        <nav className="nav">
          <Logo />
          <Menu onOpenMobileMenu={onOpenMobileMenu} />
          <button
            type="button"
            className="menu-trigger"
            onClick={() => handleToggleMenu()}
          >
            <i className="ri-menu-3-line"></i>
            <i className="ri-close-line"></i>
          </button>
          <Search />
        </nav>
      </div>
    </header>
  );
}
