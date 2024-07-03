import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LoadingBar from "@/components/ui/LoadingBar";

const Home = lazy(() => import("@/pages/Home/Home"));
const Programming = lazy(() => import("@/pages/Programming/Programming"));
const Music = lazy(() => import("@/pages/Music/Music"));
const About = lazy(() => import("@/pages/About/About"));
const Contact = lazy(() => import("@/pages/Contact/Contact"));
const Login = lazy(() => import("@/pages/Login/Login"));
const Article = lazy(() => import("@/pages/Article/Article"));
const ArticleCreation = lazy(
  () => import("@/pages/ArticleCreation/ArticleCreation"),
);

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<LoadingBar />}>
            <Home />
          </Suspense>
        }
      />
      <Route
        path="/programming"
        element={
          <Suspense fallback={<LoadingBar />}>
            <Programming />
          </Suspense>
        }
      />
      <Route
        path="/music"
        element={
          <Suspense fallback={<LoadingBar />}>
            <Music />
          </Suspense>
        }
      />
      <Route
        path="/about"
        element={
          <Suspense fallback={<LoadingBar />}>
            <About />
          </Suspense>
        }
      />
      <Route
        path="/contact"
        element={
          <Suspense fallback={<LoadingBar />}>
            <Contact />
          </Suspense>
        }
      />
      <Route
        path="/login"
        element={
          <Suspense fallback={<LoadingBar />}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="/article"
        element={
          <Suspense fallback={<LoadingBar />}>
            <Article />
          </Suspense>
        }
      />
      <Route
        path="/article-creation"
        element={
          <Suspense fallback={<LoadingBar />}>
            <ArticleCreation />
          </Suspense>
        }
      />
    </Routes>
  );
}
