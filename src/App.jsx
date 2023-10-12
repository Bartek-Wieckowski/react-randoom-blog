import "./styles/global.scss";
import { Suspense, lazy, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";

// pages
const Home = lazy(() => import("./pages/Home/Home"));
const Popular = lazy(() => import("./pages/Popular/Popular"));
const PageNotFound = lazy(() => import("./pages/PageNotFound/PageNotFound"));

// components
const Navigation = lazy(() => import("./components/Navigation/Navigation"));

// contexts
import { PostsProvider } from "./contexts/PostsContext";

export default function App() {
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
  const onOpenMobileMenu = () => {
    setIsOpenMobileMenu((prev) => !prev);
  };

  return (
    <div id="page" className={`page ${isOpenMobileMenu ? "showmenu" : ""}`}>
      <PostsProvider>
        <Navigation onOpenMobileMenu={onOpenMobileMenu} />
        <Suspense>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/popularne" element={<Popular />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
        <Footer />
      </PostsProvider>
    </div>
  );
}
