import { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LoadingBar from "@/components/ui/LoadingBar";
import ProtectedRoute from "./ProtectedRoute";

const NotFound = lazy(() => import("@/pages/NotFound/NotFound"));
const Home = lazy(() => import("@/pages/Home/Home"));
const About = lazy(() => import("@/pages/About/About"));
const Login = lazy(() => import("@/pages/Login/Login"));
const Article = lazy(() => import("@/pages/Article/Article"));
const ArticleCreation = lazy(
  () => import("@/pages/ArticleCreation/ArticleCreation"),
);
const ArticleGallery = lazy(
  () => import("@/pages/ArticleGallery/ArticleGallery"),
);
const ImageGallery = lazy(() => import("@/pages/ImageGallery/ImageGallery"));

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
      <Route element={<ProtectedRoute />}>
        <Route
          path="/article-creation"
          element={
            <Suspense fallback={<LoadingBar />}>
              <ArticleCreation />
            </Suspense>
          }
        />
        <Route
          path="/image-gallery"
          element={
            <Suspense fallback={<LoadingBar />}>
              <ImageGallery />
            </Suspense>
          }
        />
      </Route>

      <Route
        path="/about"
        element={
          <Suspense fallback={<LoadingBar />}>
            <About />
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
        path="/article/:articleId"
        element={
          <Suspense fallback={<LoadingBar />}>
            <Article />
          </Suspense>
        }
      />

      <Route
        path="/article-gallery"
        element={
          <Suspense fallback={<LoadingBar />}>
            <ArticleGallery />
          </Suspense>
        }
      />
      <Route
        path="/article-gallery"
        element={<Navigate to="/article-gallery/" />}
      />
      <Route
        path="/article-gallery"
        element={<Navigate to="/article-gallery/" />}
      />
      <Route
        path="*"
        element={
          <Suspense fallback={<LoadingBar />}>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  );
}
