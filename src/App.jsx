import "./styles/global.scss";
import { Suspense, lazy } from "react";
import { Link, Route, Routes } from "react-router-dom";

// pages
const Home = lazy(() => import("./pages/Home/Home"));
const PageNotFound = lazy(() => import("./pages/PageNotFound/PageNotFound"));

// components
const Navigation = lazy(() => import("./components/Navigation/Navigation"));

export default function App() {
  return (
    <div id="page" className="page">
      <Navigation />
      <Suspense>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}
