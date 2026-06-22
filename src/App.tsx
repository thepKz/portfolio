import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/font-awesome.min.css";
import "./css/themify-icons.css";
import "./css/flaticon.css";
import "./css/animate.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./sass/style.scss";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import AllRoute from "./main-component/router";
import Lenis from "lenis";
import ErrorBoundary from "./ErrorBoundary";

declare global {
  interface Window {
    lenis?: Lenis;
  }
}

const App: React.FC = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });

    // Expose globally so route changes can scroll-to-top through Lenis
    // (a raw window.scrollTo fights Lenis and causes the visible jank).
    window.lenis = lenis;

    let rafId: number;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  return (
    <div className="App lenis" id="scroll">
      <ErrorBoundary>
        <>
          <AllRoute />
          <ToastContainer position="top-right" autoClose={3000} />
        </>
      </ErrorBoundary>
    </div>
  );
};

export default App;