import Logo from "../Logo/Logo";
import Menu from "../Menu/Menu";
import Search from "../Search/Search";
import "./navigation.scss";

export default function Navigation({ onOpenMobileMenu }) {
  const handleClickMenu = () => {
    onOpenMobileMenu(true);
  };

  return (
    <header className="page-header">
      <div className="container">
        <nav className="nav">
          <Logo />
          <Menu />
          <button type="button" className="menu-trigger" onClick={handleClickMenu}>
            <i className="ri-menu-3-line"></i>
            <i className="ri-close-line"></i>
          </button>
          <Search />
        </nav>
      </div>
    </header>
  );
}
