import { useParams } from "react-router-dom";
import "./post.scss";

export default function Post() {
  const {slug} = useParams();
  return <div>{slug}</div>;
}
