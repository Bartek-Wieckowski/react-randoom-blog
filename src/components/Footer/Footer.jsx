import { Link } from "react-router-dom";
import "./footer.scss";

export default function Footer() {
  return (
    <footer>
      <section className="content">
        <div className="container">
          <div className="logo">
            <Link to="/">
              Sarah <span>.blog</span>
            </Link>
          </div>
          <p className="copyright">Created by theBart</p>
        </div>
      </section>
    </footer>
  );
}
