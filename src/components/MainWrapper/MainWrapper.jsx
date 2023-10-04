import "./main-wrapper.scss";

export default function MainWrapper({ children }) {
  return (
    <section className="section">
      <div className="container">
        <main className="main">{children}</main>
      </div>
    </section>
  );
}
