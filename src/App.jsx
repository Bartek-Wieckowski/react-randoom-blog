import "./styles/global.scss";
import { Suspense, lazy } from "react";
import { Link, Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./pages/Home/Home"));
const PageNotFound = lazy(() => import("./pages/PageNotFound/PageNotFound"));

export default function App() {
  return (
    <div id="page" className="page">
      <Suspense>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}
