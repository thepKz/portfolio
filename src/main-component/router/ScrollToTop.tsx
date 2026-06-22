import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls to top on every route (pathname) change.
 *
 * Routes to a hash (e.g. "/#contact") are skipped so the header's
 * own hash-scroll logic can handle them. Uses the global Lenis
 * instance when present so the reset goes through the smooth-scroll
 * engine instead of fighting it (which caused the visible jank).
 */
const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;

    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
