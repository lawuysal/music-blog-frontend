import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import { Bars } from "react-loader-spinner";

import { ThemeProvider } from "@/components/theme-provider";

const Home = lazy(() => import("@/components/pages/Home/Home"));
const Programming = lazy(
  () => import("@/components/pages/Programming/Programming"),
);
const Music = lazy(() => import("@/components/pages/Music/Music"));
const About = lazy(() => import("@/components/pages/About/About"));
const Contact = lazy(() => import("@/components/pages/Contact/Contact"));
const Login = lazy(() => import("@/components/pages/Login/Login"));
const Article = lazy(() => import("@/components/pages/Article/Article"));

import NavBar from "@/components/ui/NavBar/NavBar";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* <ModeToggle /> */}
      <NavBar />
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
      </Routes>
    </ThemeProvider>
  );
}

function LoadingBar() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Bars
        height="80"
        width="80"
        color="#3B82F6"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}
