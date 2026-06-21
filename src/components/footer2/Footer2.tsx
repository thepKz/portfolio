import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import arrow from "../../images/arrow.svg";

gsap.registerPlugin(ScrollToPlugin);

const Footer2: React.FC = () => {

  const navigate = useNavigate();
  const location = useLocation();

  /* =========================
     SMART SCROLL HANDLER
  ========================== */
  const handleNavClick = (hash: string) => (e: React.MouseEvent) => {

    if (!hash.startsWith("#")) return;

    e.preventDefault();

    if (location.pathname === "/") {
      const el = document.querySelector(hash);

      if (el) {
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: el,
            offsetY: 80,
          },
          ease: "power2.out",
        });
      }

    } else {
      navigate(`/${hash}`);
    }
  };

  return (
    <footer className="wpo-site-footer">

      <div className="container">
        <div className="wpo-footer-wrapper">
          <div className="row">
            <div className="col-lg-12">

              <div className="wpo-footer-wrap">

                {/* LEFT */}
                <div className="footer-left">

                  <div className="footer-item">
                    <ul>

                      <li>
                        <a
                          href="#about"
                          onClick={handleNavClick("#about")}
                          className="menu-link"
                        >
                          About
                        </a>
                      </li>

                      <li>
                        <a
                          href="#service"
                          onClick={handleNavClick("#service")}
                        >
                          Service
                        </a>
                      </li>

                    </ul>
                  </div>

                  <div className="footer-item">
                    <ul>

                      <li>
                        <Link to="/blog">
                          Blog
                        </Link>
                      </li>

                      <li>
                        <a
                          href="#portfolio"
                          onClick={handleNavClick("#portfolio")}
                        >
                          Portfolio
                        </a>
                      </li>

                      <li>
                        <Link to="/404">
                          Error 404
                        </Link>
                      </li>

                    </ul>
                  </div>

                  <div className="footer-item">
                    <p>
                      © (2017 - {new Date().getFullYear()}){" "}
                      <Link to="/">Shooote,</Link> All rights reserved
                    </p>
                  </div>

                </div>

                {/* MIDDLE */}
                <div className="footer-middle-text">
                  <h2>Let’s Make</h2>
                  <h2>Moments</h2>
                </div>

                {/* RIGHT */}
                <div className="footer-right">

                  <div className="footer-item">
                    <h3>Currently Available</h3>
                    <span>For Work</span>
                  </div>

                  <div className="link-widget">

                    <div className="icon">
                      <a
                        href="#contact"
                        onClick={handleNavClick("#contact")}
                        className="menu-link"
                      >
                        <img src={arrow} alt="arrow" />
                      </a>
                    </div>

                    <div className="text">

                      <h4>
                        <a
                          href="#contact"
                          onClick={handleNavClick("#contact")}
                          className="menu-link"
                        >
                          Hire
                        </a>
                      </h4>

                      <h4>
                        <a
                          href="#contact"
                          onClick={handleNavClick("#contact")}
                          className="menu-link"
                        >
                          Me Now
                        </a>
                      </h4>

                    </div>

                  </div>

                </div>

              </div>

            </div>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer2;