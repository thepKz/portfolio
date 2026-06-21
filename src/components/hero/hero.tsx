import React from "react";
import { useRef } from "react";
import useSplitTextAnimation from "../splittextAnimation/useSplitTextAnimation";
import heroImg from "../../images/hero/image-1.png";
import shapeImg from "../../images/hero/shape.svg";
import line1 from "../../images/line-1.svg";
import line2 from "../../images/line-2.svg";
import line3 from "../../images/line-3.svg";
import line4 from "../../images/line-4.svg";

const HeroStatic: React.FC = () => {

  const ref = useRef<HTMLDivElement | null>(null);

  useSplitTextAnimation(ref);

  return (
    <section className="wpo-hero-static" ref={ref} id="home">
      <div className="container-fluid">

        <div className="wpo-hero-wrap">

          <div className="hero-content">

            <h1 className="poort-text poort-in-up">
              Minthep
            </h1>

            <div className="line-s1">
              <img src={line1} alt="line" />
            </div>

            <div className="line-s2">
              <img src={line2} alt="line" />
            </div>

            <div className="line-s3">
              <img src={line3} alt="line" />
            </div>

            <div className="line-s4">
              <img src={line4} alt="line" />
            </div>

          </div>

          <div className="hero-image">
            <img src={heroImg} alt="hero" />
          </div>

        </div>

      </div>

      <div className="shape">
        <img src={shapeImg} alt="shape" />
      </div>

    </section>
  );
};

export default HeroStatic;