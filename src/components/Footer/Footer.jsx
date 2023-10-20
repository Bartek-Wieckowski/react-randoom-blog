import { Link } from "react-router-dom";
import "./footer.scss";

export default function Footer() {
  return (
    <footer className="page-footer">
      <div className="container">
        <div className="logo">
          <Link to="/">
            rand00m <span>.blog</span>
          </Link>
        </div>
        <p className="copyright">© {new Date().getFullYear()} Created by theBart</p>
      </div>
    </footer>
  );
}
