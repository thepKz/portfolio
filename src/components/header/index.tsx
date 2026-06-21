import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import logo from "../../images/logo.png";
import arrow from "../../images/arrow-2.svg";
import MobileMenu from "../MobileMenu/MobileMenu";

gsap.registerPlugin(ScrollToPlugin);

interface MenuItem {
  id: number;
  title: string;
  link: string;
}

const menus: MenuItem[] = [
  { id: 1, title: "About", link: "#about" },
  { id: 2, title: "Service", link: "#service" },
  { id: 3, title: "Work", link: "#portfolio" },
  { id: 4, title: "Hire Me", link: "#contact" },
];

const Header: React.FC = () => {

  const headerRef = useRef<HTMLDivElement | null>(null);
  const placeholderRef = useRef<HTMLDivElement | null>(null);
  const isSticky = useRef(false);
  const currentTween = useRef<gsap.core.Tween | null>(null);

  const stickyThreshold = 600;

  /* =========================
     STICKY HEADER LOGIC
  ========================== */
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;

      if (scrollTop > stickyThreshold && !isSticky.current) {
        isSticky.current = true;

        // create placeholder
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
     SMOOTH SCROLL
  ========================== */
  const handleScroll = (target: string) => (e: React.MouseEvent) => {
    e.preventDefault();

    const element = document.querySelector(target);
    if (!element) return;

    gsap.to(window, {
      duration: 1,
      scrollTo: {
        y: element,
        offsetY: 80,
      },
      ease: "power2.out",
    });
  };

  return (
    <header id="header">
      <div className="wpo-site-header" ref={headerRef}>

        <nav className="navigation navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">

            <div className="row align-items-center">

              {/* Mobile */}
              <div className="col-lg-3 col-md-2 col-3 d-lg-none dl-block">
                <div className="mobail-menu">
                  <MobileMenu />
                </div>
              </div>

              {/* Logo */}
              <div className="col-lg-3 col-md-6 col-5">
                <div className="navbar-header">
                  <Link to="#home" className="navbar-brand">
                    <img src={logo} alt="logo" />
                  </Link>
                </div>
              </div>

              {/* Info */}
              <div className="col-lg-6 col-md-3 col-3">
                <div className="header-right">
                  <div className="close-form">
                    <p>Designer & Photographer</p>
                    <p>Based in San Francisco</p>
                    <Link to={'/#contact'} className="icon">
                      <img src={arrow} alt="arrow" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Nav */}
              {/* Navigation */}
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

                        {/* If it's section link → use GSAP */}
                        {item.link.startsWith("#") ? (

                          <a
                            href={item.link}
                            onClick={handleScroll(item.link)}
                            className={`menu-link ${item.title === "Hire Me" ? "hire-me" : ""
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

export default Header;