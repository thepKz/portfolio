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
                Tôi là kỹ sư phần mềm full-stack, tự thiết kế, xây dựng và ship
                sản phẩm thật — từ web, microservices tới mobile — với hơn 30+
                dự án đã làm cùng khách hàng.
              </h2>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;