import React, { Fragment, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header2 from "../../components/header2";
import Footer2 from "../../components/footer2/Footer2";
import Scrollbar from "../../components/scrollbar/scrollbar";

import services from "../../api/services";
import arrow from "../../images/arrow-2.svg";
import CTASection from "../../components/CTASection/CTASection";

const ServiceSinglePage: React.FC = () => {

  const { slug } = useParams<{ slug: string }>();

  const service = services.find((item) => item.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return <div className="text-center section-padding">Service not found</div>;
  }

  return (
    <Fragment>

      <Header2 />

      <section className="wpo-service-single-section section-padding">

        <div className="container">

          <div className="service-single-wrap">

            <div className="row">

              {/* LEFT IMAGE */}
              <div className="col-lg-6">

                <div className="service-image">
                  <div className="image">
                    <img src={service.singleimage} alt={service.title} />
                  </div>
                </div>

              </div>

              {/* RIGHT CONTENT */}
              <div className="col-lg-6 col-md-12 col-12">

                <div className="service-single-content">

                  <div className="post service-content">

                    {/* TOP */}
                    <div className="service-top">

                      <div className="service-title">
                        <h2>{service.title}</h2>
                      </div>

                      <div className="service-info">

                        <div className="service-info-item">

                          <ul>
                            <li>
                              <span>Category</span>
                              <h3>Photography Service</h3>
                            </li>
                            <li>
                              <span>Style</span>
                              <h3>Natural · Emotional · Timeless</h3>
                            </li>
                          </ul>

                          <ul>
                            <li>
                              <span>Coverage</span>
                              <h3>Full Day / Half Day</h3>
                            </li>
                            <li>
                              <span>Price</span>
                              <h3>$500 - $100</h3>
                            </li>
                          </ul>

                        </div>

                      </div>

                      <p>
                        Capturing real moments, genuine emotions, and timeless stories—
                        so you can relive your special day for a lifetime.
                      </p>

                    </div>

                    {/* DETAILS */}
                    <div className="service-item">

                      <div className="service-content">
                        <h3>What This Service Is About</h3>
                        <p>
                          This service focuses on storytelling through natural light,
                          candid expressions, and thoughtful composition.
                        </p>
                        <p>
                          Every frame is designed to feel authentic, emotional, and timeless.
                        </p>
                      </div>

                      <div className="service-content">
                        <h3>What’s Included</h3>
                        <ul>
                          <li>Full event coverage</li>
                          <li>Professionally edited images</li>
                          <li>Online gallery</li>
                          <li>Print-ready photos</li>
                        </ul>
                      </div>

                      <div className="service-content">
                        <h3>My Creative Approach</h3>
                        <p>
                          I capture moments naturally without forcing poses,
                          allowing real emotions to shine through.
                        </p>
                      </div>

                      {/* QUOTE */}
                      <div className="service-card">

                        <div className="service-list">

                          <div className="shape">
                            <svg width="48" height="30" viewBox="0 0 48 30">
                              <path
                                d="M5.5 0H24L12.16 30H0L5.5 0Zm24 0H48L36.18 30H24L29.5 0Z"
                                fill="#6D7177"
                              />
                            </svg>
                          </div>

                          <div className="service-card-text">
                            <h3>
                              “From start to finish, the experience is simple,
                              transparent, and stress-free.”
                            </h3>
                            <span>- Shooote Studio</span>
                          </div>

                        </div>

                      </div>

                      {/* CTA */}
                      <div className="service-buttom">

                        <div className="service-buttom-text">
                          <h4>Let’s Capture Your Story</h4>
                          <h4>Your moments deserve to be remembered.</h4>
                        </div>

                        <div className="service-btn">

                          <div className="theme-btn">

                            <i className="icon">
                              <Link to="/#contact">
                                <img src={arrow} alt="" />
                              </Link>
                            </i>

                            <i className="link-text">
                              <span>
                                <Link to="/#contact">Contact</Link>
                              </span>
                              <span>
                                <Link to="/#contact">Me</Link>
                              </span>
                            </i>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>
      <CTASection />
      <Footer2 />
      <Scrollbar />

    </Fragment>
  );
};

export default ServiceSinglePage;