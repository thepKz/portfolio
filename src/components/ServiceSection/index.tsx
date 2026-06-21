import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { Fade } from "react-awesome-reveal";

import services from "../../api/services";

import arrow from "../../images/arrow.svg";
import shape from "../../images/service/shape.png";

const ServiceSection: React.FC = () => {

  const ClickHandler = () => {
    window.scrollTo(0, 0);
  };

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
              <span>Capture</span>
            </h3>

            <h2 className="poort-text poort-in-right">
              Storytelling
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
                      <Link to="/service">Let’s</Link>
                    </span>
                    <span>
                      <Link to="/service">Work Together</Link>
                    </span>
                  </i>

                </div>

              </div>

              <div className="service-item-right">
                <h3><span className="text-item">With</span></h3>
                <h3>Clients</h3>
              </div>

            </div>

          </div>

        </div>

        {/* SHAPE */}
        <div className="service-shape">
          <div className="service-shape-image">
            <Fade direction="down" triggerOnce>
              <img src={shape} alt="shape" />
            </Fade>
          </div>
        </div>

      </div>

      {/* SLIDER */}
      <div className="service-all-item">

        <Slider {...settings} className="service-slider">

          {services.map((service, index) => (

            <div key={service.id}>

              <Fade direction="up" delay={index * 100} triggerOnce>

                <div className="service-card">

                  <div className="service-image">
                    <img src={service.image} alt={service.title} />
                  </div>

                  <div className="service-content">

                    <div className="service-text">

                      <h3>
                        <Link
                          onClick={ClickHandler}
                          to={`/service-single/${service.slug}`}
                        >
                          {service.title}
                        </Link>
                      </h3>

                      <p>{service.description}</p>

                    </div>

                  </div>

                </div>

              </Fade>

            </div>

          ))}

        </Slider>

      </div>

    </section>
  );
};

export default ServiceSection;