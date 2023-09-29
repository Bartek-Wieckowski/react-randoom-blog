import "./styles/global.scss";
import { Suspense, lazy } from "react";
import { Link, Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./pages/Home/Home"));

export default function App() {
  return (
    <div id="page" className="page">
      <Suspense>
        <Routes>
          <Route path="/" exact element={<Home />} />
        </Routes>
      </Suspense>
    </div>
  );
}
