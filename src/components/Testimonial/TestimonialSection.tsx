import React from "react";
import { Fade } from "react-awesome-reveal";
import { useRef } from "react";
import useSplitTextAnimation from "../splittextAnimation/useSplitTextAnimation";

// images
import shape from "../../images/testimonial/shape.svg";
import quoteIcon from "../../images/testimonial/shape-2.svg";

import t1 from "../../images/testimonial/image-1.jpg";
import t2 from "../../images/testimonial/image-2.jpg";
import t3 from "../../images/testimonial/image-3.jpg";

interface Testimonial {
  id: number;
  image: string;
  text?: string;
  highlight?: string;
  name: string;
  role: string;
  large?: boolean;
}

const TestimonialSection: React.FC = () => {

  const ref = useRef<HTMLDivElement | null>(null);

  useSplitTextAnimation(ref);


  const testimonials: Testimonial[] = [
    {
      id: 1,
      image: t1,
      text: "Thép chủ động, code sạch và bàn giao đúng hạn, làm việc cùng rất nhẹ đầu.",
      name: "Minh Anh",
      role: "Đồng đội dự án",
    },
    {
      id: 2,
      image: t2,
      highlight:
        "Tư duy hệ thống tốt, dựng microservices và tích hợp thanh toán chỉ trong vài sprint, vượt mong đợi.",
      name: "Quốc Bảo",
      role: "Quản lý dự án",
      large: true,
    },
    {
      id: 3,
      image: t3,
      text: "Nắm yêu cầu nhanh, làm đúng và giao đúng. Hợp tác qua nhiều dự án đều rất yên tâm!",
      name: "Hoàng N.",
      role: "Khách hàng",
    },
  ];

  return (
    <section className="wpo-testimonial-section" ref={ref}>

      <div className="container">

        <div className="testimonial-wrap">

          {/* TITLE */}
          <div className="wpo-section-title">
            <img src={shape} alt="shape" />
            <h2 className="poort-text poort-in-right">Nhận xét</h2>
          </div>

          {/* GRID */}
          <div className="row">

            {testimonials.map((item, index) => (

              <div
                key={item.id}
                className={`col col-lg-${item.large ? "6" : "3"} col-md-6 col-12`}
              >

                <Fade direction="up" delay={index * 150} triggerOnce>

                  <div className="testimonial-card">

                    {/* IMAGE */}
                    <div className="testimonial-image left-to-right-light">
                      <img src={item.image} alt={item.name} />
                    </div>

                    {/* CONTENT */}
                    <div className="testimonial-content">

                      {/* CENTER CARD ICON */}
                      {item.large && (
                        <div className="icon">
                          <img src={quoteIcon} alt="quote" />
                        </div>
                      )}

                      <div className="testimonial-text">

                        {/* TEXT / HIGHLIGHT */}
                        {item.large ? (
                          <h3>{item.highlight}</h3>
                        ) : (
                          <p>{item.text}</p>
                        )}

                        <small>{item.name}</small>
                        <span>{item.role}</span>

                      </div>

                    </div>

                  </div>

                </Fade>

              </div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
};

export default TestimonialSection;