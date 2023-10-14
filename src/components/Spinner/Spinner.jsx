import "./spinner.scss";

export default function Spinner({ type }) {
  return (
    <div className={`${type}`}>
      <div className="spinner"></div>
    </div>
  );
}
