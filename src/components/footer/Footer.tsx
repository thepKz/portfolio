import React from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import arrow from "../../images/arrow.svg";

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
                          Giới thiệu
                        </a>
                      </li>

                      <li>
                        <a href="#service" onClick={handleScroll("#service")}>
                          Dịch vụ
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="footer-item">
                    <ul>
                      <li>
                        <a href="https://github.com/thepKz" target="_blank" rel="noopener noreferrer">
                          GitHub
                        </a>
                      </li>

                      <li>
                        <a href="https://www.linkedin.com/in/thepmaitan26/" target="_blank" rel="noopener noreferrer">
                          LinkedIn
                        </a>
                      </li>

                      <li>
                        <a href="#portfolio" onClick={handleScroll("#portfolio")}>
                          Dự án
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="footer-item">
                    <p>
                      © {new Date().getFullYear()}{" "}
                      <a href="/">thepKz,</a> Bảo lưu mọi quyền
                    </p>
                  </div>

                </div>

                {/* MIDDLE BIG TEXT */}
                <div className="footer-middle-text">
                  <h2>Cùng xây</h2>
                  <h2>Sản phẩm</h2>
                </div>

                {/* RIGHT */}
                <div className="footer-right">

                  <div className="footer-item">
                    <h3>Đang nhận</h3>
                    <span>Dự án mới</span>
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
                          Liên hệ
                        </a>
                      </h4>
                      <h4>
                        <a href="#contact" onClick={handleScroll("#contact")} className="menu-link">
                          Ngay
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