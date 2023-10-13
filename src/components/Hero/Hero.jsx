import "./hero.scss";

export default function Hero({ children, type }) {
  const heroType = `${type}`;
  return (
    <section className="hero">
      <div className={heroType}>{children}</div>
    </section>
  );
}
