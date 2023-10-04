import { Link } from "react-router-dom";
import "./logo.scss";
Link;

export default function Logo() {
  return (
    <div className="logo">
      <Link to="/">
        rand00m<span>.blog</span>
      </Link>
    </div>
  );
}
