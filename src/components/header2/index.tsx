import React, { useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import logo from "../../images/logo.png";
import arrow from "../../images/arrow-2.svg";
import MobileMenu2 from "../MobileMenu2/MobileMenu2";

gsap.registerPlugin(ScrollToPlugin);

/* =========================
   MENU
========================= */
interface MenuItem {
  id: number;
  title: string;
  link: string;
}

const menus: MenuItem[] = [
  { id: 1, title: "Giới thiệu", link: "#about" },
  { id: 2, title: "Kỹ năng", link: "#skills" },
  { id: 3, title: "Dự án", link: "#portfolio" },
  { id: 4, title: "Dịch vụ", link: "/service" },
  { id: 5, title: "Liên hệ", link: "#contact" },
];

const Header2: React.FC = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const headerRef = useRef<HTMLDivElement | null>(null);
  const placeholderRef = useRef<HTMLDivElement | null>(null);
  const isSticky = useRef(false);
  const currentTween = useRef<gsap.core.Tween | null>(null);

  const stickyThreshold = 600;

  /* =========================
     STICKY HEADER
  ========================== */
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;

      if (scrollTop > stickyThreshold && !isSticky.current) {
        isSticky.current = true;

        // placeholder
        if (!placeholderRef.current) {
          const placeholder = document.createElement("div");
          placeholder.style.height = header.offsetHeight + "px";
          header.parentNode?.insertBefore(placeholder, header.nextSibling);
          placeholderRef.current = placeholder;
        }

        header.classList.add("sticky");

        currentTween.current?.kill();

        currentTween.current = gsap.fromTo(
          header,
          { y: -header.offsetHeight },
          { y: 0, duration: 0.4, ease: "power2.out" }
        );

      } else if (scrollTop <= stickyThreshold && isSticky.current) {
        isSticky.current = false;

        currentTween.current?.kill();

        currentTween.current = gsap.to(header, {
          y: -header.offsetHeight,
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => {
            header.classList.remove("sticky");
            placeholderRef.current?.remove();
            placeholderRef.current = null;
            gsap.set(header, { y: 0 });
          },
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      currentTween.current?.kill();
    };
  }, []);

  /* =========================
     MENU CLICK HANDLER
  ========================== */
  const handleNavClick = (hash: string) => (e: React.MouseEvent) => {
    if (!hash.startsWith("#")) return;

    e.preventDefault();

    // If already on home → scroll instantly
    if (location.pathname === "/") {
      const el = document.querySelector(hash);

      if (el) {
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: el,
            offsetY: 110,
          },
          ease: "power2.out",
        });
      }

    } else {
      // Go to home with hash
      navigate(`/${hash}`);
    }
  };

  /* =========================
     HANDLE HASH SCROLL AFTER NAVIGATION
  ========================== */
  useEffect(() => {
    if (!location.hash) return;

    const el = document.querySelector(location.hash);

    if (el) {
      const timer = setTimeout(() => {
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: el,
            offsetY: 110,
          },
          ease: "power2.out",
        });
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <header id="header">
      <div className="wpo-site-header" ref={headerRef}>

        <nav className="navigation navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">

            <div className="row align-items-center">

              {/* MOBILE */}
              <div className="col-lg-3 col-md-2 col-3 d-lg-none dl-block">
                <div className="mobail-menu">
                  <MobileMenu2 />
                </div>
              </div>

              {/* LOGO */}
              <div className="col-lg-3 col-md-6 col-5">
                <div className="navbar-header">
                  <Link to="/" className="navbar-brand">
                    <img src={logo} alt="logo" />
                  </Link>
                </div>
              </div>

              {/* INFO */}
              <div className="col-lg-6 col-md-3 col-3">
                <div className="header-right">
                  <div className="close-form">
                    <p>Kỹ sư phần mềm Full-Stack</p>
                    <p>Ha Noi, Viet Nam</p>
                    <Link to={'/#contact'} className="icon">
                      <img src={arrow} alt="arrow" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* NAVIGATION */}
              <div className="col-lg-3 col-md-1 col-1">

                <div
                  id="navbar"
                  className="collapse navbar-collapse navigation-holder"
                >

                  <button className="menu-close">
                    <i className="ti-close"></i>
                  </button>

                  <ul className="nav navbar-nav mb-2 mb-lg-0">

                    {menus.map((item) => (
                      <li key={item.id}>

                        {item.link.startsWith("#") ? (

                          <a
                            href={item.link}
                            onClick={handleNavClick(item.link)}
                            className={`menu-link ${
                              item.link === "#contact" ? "hire-me" : ""
                            }`}
                          >
                            {item.title}
                          </a>

                        ) : (

                          <Link to={item.link} className="menu-link">
                            {item.title}
                          </Link>

                        )}

                      </li>
                    ))}

                  </ul>

                </div>

              </div>

            </div>

          </div>
        </nav>

      </div>
    </header>
  );
};

export default Header2;