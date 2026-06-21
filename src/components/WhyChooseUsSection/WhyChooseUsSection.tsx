import React from "react";
import { Fade } from "react-awesome-reveal";
import { useRef } from "react";
import useSplitTextAnimation from "../splittextAnimation/useSplitTextAnimation";

// images
import icon1 from "../../images/why-choose/icon-1.svg";
import icon2 from "../../images/why-choose/icon-2.svg";
import icon3 from "../../images/why-choose/icon-3.svg";
import icon4 from "../../images/why-choose/icon-4.svg";
import mainImage from "../../images/why-choose/image-1.jpg";

interface WhyItem {
  id: number;
  icon: string;
  title: string;
  highlight: string;
  reverse?: boolean;
}

const WhyChooseUsSection: React.FC = () => {

  const ref = useRef<HTMLDivElement | null>(null);

  useSplitTextAnimation(ref);

  const items: WhyItem[] = [
    {
      id: 1,
      icon: icon1,
      title: "Sản phẩm thật",
      highlight: "Ship",
    },
    {
      id: 2,
      icon: icon2,
      title: "Microservices",
      highlight: "Kiến trúc",
      reverse: true,
    },
    {
      id: 3,
      icon: icon3,
      title: "Dự án thực chiến",
      highlight: "30+",
    },
    {
      id: 4,
      icon: icon4,
      title: "Giao dự án",
      highlight: "Đúng hạn",
    },
  ];

  return (
    <section className="wpo-why-choose-section" ref={ref}>

      <div className="container">

        <div className="wpo-why-choose-wrap">

          {/* TITLE */}
          <div className="why-choose-top">
            <div className="wpo-section-title">
              <h3 className="poort-text poort-in-right">
                Vì sao chọn tôi cho dự án của bạn
              </h3>
            </div>
          </div>

          {/* ITEMS */}
          <div className="why-choose-item">

            {/* LEFT */}
            <div className="why-choose-comtent">
              {items.filter((_, i) => i % 2 === 0).map((item, index) => (
                <Fade key={item.id} direction="up" delay={index * 150} triggerOnce>

                  <div className="why-choose-card">

                    <div className="icon">
                      <img src={item.icon} alt="" />
                    </div>

                    <div className="text">
                      <p>
                        <span>{item.highlight}</span> {item.title}
                      </p>
                    </div>

                  </div>

                </Fade>
              ))}
            </div>

            {/* RIGHT */}
            <div className="why-choose-comtent">
              {items.filter((_, i) => i % 2 !== 0).map((item, index) => (
                <Fade key={item.id} direction="up" delay={index * 200} triggerOnce>

                  <div className="why-choose-card">

                    <div className="icon">
                      <img src={item.icon} alt="" />
                    </div>

                    <div className="text">
                      <p>
                        {item.reverse ? (
                          <>
                            {item.title} <span>{item.highlight}</span>
                          </>
                        ) : (
                          <>
                            <span>{item.highlight}</span> {item.title}
                          </>
                        )}
                      </p>
                    </div>

                  </div>

                </Fade>
              ))}
            </div>

          </div>

          {/* IMAGE */}
          <div className="why-choose-image">
            <img src={mainImage} alt="why choose" />
          </div>

        </div>

      </div>

      {/* MARQUEE 1 */}
      <div className="marquee-text">
        <div className="marquee_container s2">
          {[...Array(2)].map((_, i) => (
            <div className="marquee" key={i}>
              <h2>Nhận việc remote toàn cầu</h2>
              <h2>Nhận việc remote toàn cầu</h2>
              <h2>Nhận việc remote toàn cầu</h2>
              <h2>Nhận việc remote toàn cầu</h2>
              <h2>Nhận việc remote toàn cầu</h2>
              <h2>Nhận việc remote toàn cầu</h2>
              <h2>Nhận việc remote toàn cầu</h2>
            </div>
          ))}
        </div>
      </div>

      {/* MARQUEE 2 */}
      <div className="marquee-text-s2">
        <div className="marquee_container s3">
          {[...Array(2)].map((_, i) => (
            <div className="marquee" key={i}>
              <h2>Nhận việc remote toàn cầu</h2>
              <h2>Nhận việc remote toàn cầu</h2>
              <h2>Nhận việc remote toàn cầu</h2>
              <h2>Nhận việc remote toàn cầu</h2>
              <h2>Nhận việc remote toàn cầu</h2>
              <h2>Nhận việc remote toàn cầu</h2>
              <h2>Nhận việc remote toàn cầu</h2>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default WhyChooseUsSection;