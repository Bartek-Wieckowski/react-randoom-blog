import "./styles/global.scss";
import { Suspense, lazy, useState } from "react";
import { Route, Routes } from "react-router-dom";

// pages
const Home = lazy(() => import("./pages/Home/Home"));
const Popular = lazy(() => import("./pages/Popular/Popular"));
const Post = lazy(() => import("./pages/Post/Post"));
const Category = lazy(() => import("./pages/Category/Category"));
const Author = lazy(() => import("./pages/Author/Author"));
const ReadTime = lazy(() => import("./pages/ReadTime/ReadTime"));
const PageNotFound = lazy(() => import("./pages/PageNotFound/PageNotFound"));

// components
const Navigation = lazy(() => import("./components/Navigation/Navigation"));
const Footer = lazy(() => import("./components/Footer/Footer"));
import Spinner from "./components/Spinner/Spinner";

// contexts
import { PostsProvider } from "./contexts/PostsContext";

export default function App() {
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);

  const isMobileDevice = () => {
    return window.matchMedia("(max-width: 992px)").matches;
  };
  const onOpenMobileMenu = () => {
    if (isMobileDevice()) {
      setIsOpenMobileMenu((prev) => !prev);
    }
  };

  return (
    <div id="page" className={`page ${isOpenMobileMenu ? "showmenu" : ""}`}>
      <PostsProvider>
        <Navigation onOpenMobileMenu={onOpenMobileMenu} />
        <Suspense fallback={<Spinner type="full-page-spinner" />}>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/popularne" element={<Popular />} />
            <Route path="/post/:slug" element={<Post />} />
            <Route path="/kategoria/:slug" element={<Category />} />
            <Route path="/autor/:slug" element={<Author />} />
            <Route path="/czas-czytania/:value" element={<ReadTime />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
        <Footer />
      </PostsProvider>
    </div>
  );
}
