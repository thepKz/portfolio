import React from "react";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";

import services from "../../api/services";

const ServiceSectionS2: React.FC = () => {

  const ClickHandler = () => {
    window.scrollTo(0, 0);
  };


  return (
    <section className="wpo-service-section style-2" id="service">

      {/* SLIDER */}
      <div className="service-all-item">

        <div className="container">
          <div className="row">
            {services.map((service, index) => (

              <div className="col-lg-6 col-md-6 col-12" key={service.id}>

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
          </div>
        </div>

      </div>

    </section>
  );
};

export default ServiceSectionS2;