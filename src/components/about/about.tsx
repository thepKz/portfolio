import React, { useRef } from "react";
import useSplitTextAnimation from "../splittextAnimation/useSplitTextAnimation";

const AboutSection: React.FC = () => {

  const sectionRef = useRef<HTMLDivElement>(null);

  useSplitTextAnimation(sectionRef);

  return (
    <section className="wpo-about-section" id="about" ref={sectionRef}>
      <div className="container">

        <div className="about-wrap">

          <div className="about-text-animation">

            <div className="about-text-color">
              <h2>
                I help clients preserve moments
                <br />
                that matter, crafting photography
                <br />
                that connects, inspires, and tells
                <br />
                authentic, timeless stories.
              </h2>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;