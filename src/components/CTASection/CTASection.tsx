import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";

import useSplitTextAnimation from "../splittextAnimation/useSplitTextAnimation";

// images
import line1 from "../../images/line-1.svg";
import line2 from "../../images/line-2.svg";
import line3 from "../../images/line-3.svg";
import line4 from "../../images/line-4.svg";
import arrow from "../../images/arrow-2.svg";
import ctaImg from "../../images/cta.png";

const CTASection: React.FC = () => {

  const ref = useRef<HTMLDivElement | null>(null);
  useSplitTextAnimation(ref);

  return (
    <section className="wpo-cta-section" ref={ref}>

      <div className="container">

        <div className="wpo-cta-wrap">

          {/* LEFT BIG TEXT */}
          <div className="cta-content">

            <h1 className="poort-text poort-in-up">Start</h1>

            <div className="line-s1">
              <img src={line1} alt="" />
            </div>

            <div className="line-s2">
              <img src={line2} alt="" />
            </div>

            <div className="line-s3">
              <img src={line3} alt="" />
            </div>

            <div className="line-s4">
              <img src={line4} alt="" />
            </div>

          </div>

          {/* TEXT + BUTTON */}
          <div className="cta-text">

            <div className="cta-item">

              <Fade direction="up" delay={200} triggerOnce>
                <h2>
                  Bring your ideas to life with professional photography.
                </h2>
              </Fade>

              <Fade direction="up" delay={300} triggerOnce>
                <h2>
                  Whether it’s portraits, events, or brand work, I’ll help capture it perfectly.
                </h2>
              </Fade>

            </div>

            <Fade direction="up" delay={400} triggerOnce>

              <div className="theme-btn">

                <i className="icon">
                  <Link to="/service">
                    <img src={arrow} alt="" />
                  </Link>
                </i>

                <i className="link-text">
                  <span>
                    <Link to="/service">Start</Link>
                  </span>
                  <span>
                    <Link to="/service">Your Project</Link>
                  </span>
                </i>

              </div>

            </Fade>

          </div>

          {/* IMAGE */}
          <Fade direction="up" delay={500} triggerOnce>

            <div className="cta-image">
              <img src={ctaImg} alt="cta" />
            </div>

          </Fade>

        </div>

      </div>

    </section>
  );
};

export default CTASection;