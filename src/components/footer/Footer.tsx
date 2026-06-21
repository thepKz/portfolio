import React from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import arrow from "../../images/arrow.svg";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollToPlugin);

const Footer: React.FC = () => {

  /* Smooth scroll */
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
                        <a href="#about" onClick={handleScroll("#about")} className="menu-link">
                          About
                        </a>
                      </li>

                      <li>
                        <a href="#service" onClick={handleScroll("#service")}>
                          Service
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="footer-item">
                    <ul>
                      <li>
                        <a href="/blog">
                          Blog
                        </a>
                      </li>

                      <li>
                        <a href="#portfolio" onClick={handleScroll("#portfolio")}>
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
                      <a href="/">Shooote,</a> All rights reserved
                    </p>
                  </div>

                </div>

                {/* MIDDLE BIG TEXT */}
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
                      <a href="#contact" onClick={handleScroll("#contact")} className="menu-link">
                        <img src={arrow} alt="arrow" />
                      </a>
                    </div>

                    <div className="text">
                      <h4>
                        <a href="#contact" onClick={handleScroll("#contact")} className="menu-link">
                          Hire
                        </a>
                      </h4>
                      <h4>
                        <a href="#contact" onClick={handleScroll("#contact")} className="menu-link">
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

export default Footer;