import Logo from "../Logo/Logo";
import Menu from "../Menu/Menu";
import "./navigation.scss";

export default function Navigation() {
  return (
    <header className="page-header">
      <div className="container">
        <nav className="nav">
          <Logo />
          <Menu />
        </nav>
      </div>
    </header>
  );
}
