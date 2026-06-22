import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { Fade } from "react-awesome-reveal";

import services from "../../api/services";

import arrow from "../../images/arrow.svg";
import shape from "../../images/service/shape.png";

const ServiceSection: React.FC = () => {

  const settings = {
    infinite: true,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 3000,
    arrows: false,
    dots: true,
    loop: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <section className="wpo-service-section" id="service">

      <div className="container">

        <div className="wpo-service-wrap">

          {/* TITLE */}
          <div className="wpo-section-title">

            <h3>
              <span>Kiến tạo</span>
            </h3>

            <h2 className="poort-text poort-in-right">
              Sản phẩm
            </h2>

            <div className="service-top">

              <div className="service-item-left">

                <div className="theme-btn">

                  <i className="icon">
                    <Link to="/service">
                      <img src={arrow} alt="arrow" />
                    </Link>
                  </i>

                  <i className="link-text">
                    <span>
                      <Link to="/service">Cùng</Link>
                    </span>
                    <span>
                      <Link to="/service">Hợp tác</Link>
                    </span>
                  </i>

                </div>

              </div>

              <div className="service-item-right">
                <h3><span className="text-item">Với</span></h3>
                <h3>Đối tác</h3>
              </div>

            </div>

          </div>

        </div>

        {/* SHAPE */}
        <div className="service-shape">
          <div className="service-shape-image pendulum">
            <img src={shape} alt="shape" />
          </div>
        </div>

      </div>

      {/* SLIDER */}
      <div className="service-all-item">

        <Slider {...settings} className="service-slider">

          {services.map((service, index) => (

            <div key={service.id}>

              <Fade direction="up" delay={index * 100} triggerOnce>

                <Link
                  className="service-card"
                  to={`/service-single/${service.slug}`}
                >

                  <div className="service-image">
                    <img src={service.image} alt={service.title} />
                  </div>

                  <div className="service-content">

                    <div className="service-text">

                      <h3>{service.title}</h3>

                      <p>{service.description}</p>

                      <span className="service-detail-btn">
                        Xem chi tiết <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>

                    </div>

                  </div>

                </Link>

              </Fade>

            </div>

          ))}

        </Slider>

      </div>

    </section>
  );
};

export default ServiceSection;