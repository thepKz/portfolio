import React from "react";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";

import services from "../../api/services";

const ServiceSectionS2: React.FC = () => {

  return (
    <section className="wpo-service-section style-2" id="service">

      {/* SLIDER */}
      <div className="service-all-item">

        <div className="container">
          <div className="row">
            {services.map((service, index) => (

              <div className="col-lg-6 col-md-6 col-12" key={service.id}>

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
          </div>
        </div>

      </div>

    </section>
  );
};

export default ServiceSectionS2;