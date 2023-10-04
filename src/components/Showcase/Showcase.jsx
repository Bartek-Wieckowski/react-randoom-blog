import { Link } from "react-router-dom";
import "./showcase.scss";
import noSetImg from "../../assets/noSetImg.png";

export default function Showcase() {
  return (
    <div className="profile">
      <img src={noSetImg} alt="" />
      <div className="name">
          <span>Witaj</span>
        <h3>
          <Link to="">Username</Link>
        </h3>
      </div>
    </div>
  );
}
