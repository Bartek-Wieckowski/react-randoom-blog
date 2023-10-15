import "./styles/global.scss";
import { Suspense, lazy, useState } from "react";
import { Route, Routes } from "react-router-dom";

// pages
const Home = lazy(() => import("./pages/Home/Home"));
const Popular = lazy(() => import("./pages/Popular/Popular"));
const Post = lazy(() => import("./pages/Post/Post"));
const Category = lazy(() => import("./pages/Category/Category"));
const PageNotFound = lazy(() => import("./pages/PageNotFound/PageNotFound"));

// components
const Navigation = lazy(() => import("./components/Navigation/Navigation"));
const Footer = lazy(() => import("./components/Footer/Footer"));

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
            <Route path="/post/:slug" element={<Post />} />
            <Route path="/kategoria/:name" element={<Category />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
        <Footer />
      </PostsProvider>
    </div>
  );
}
