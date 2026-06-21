import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header2 from "../../components/header2";
import Footer2 from "../../components/footer2/Footer2";
import Scrollbar from "../../components/scrollbar/scrollbar";

import portfolio from "../../api/portfolio";
import CTASection from "../../components/CTASection/CTASection";

const PortfolioSinglePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const project = portfolio.find((item) => item.slug === slug);

  if (!project) {
    return <h2 style={{ textAlign: "center", padding: "120px" }}>Not Found</h2>;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header2 />

      <section className="wpo-portfolio-single-section">
        <div className="container">
          <div className="portfolio-single-wrap">

            <div className="portfolio-single-content">

              {/* TOP IMAGE */}
              <div className="portfolio-image-top">
                <div className="portfolio-image">
                  <img src={project.singleimage} alt={project.title} />
                </div>
              </div>

              {/* TITLE + INFO */}
              <div className="post portfolio-content">

                <div className="portfolio-top">

                  <div className="portfolio-title">
                    <h2>{project.title}</h2>
                  </div>

                  <div className="portfolio-info">
                    <div className="Portfolio-info-item">

                      <ul>
                        <li>
                          <span>Client</span>
                          <h3>Private Client</h3>
                        </li>
                        <li>
                          <span>Year</span>
                          <h3>2026</h3>
                        </li>
                      </ul>

                      <ul>
                        <li>
                          <span>Category</span>
                          <h3>{project.category}</h3>
                        </li>
                        <li>
                          <span>Timeline</span>
                          <h3>4 weeks</h3>
                        </li>
                      </ul>

                    </div>
                  </div>

                </div>

                {/* PROJECT INFO */}
                <div className="portfolio-item">

                  <div className="portfolio-left">
                    <span>01  //  Project Info</span>
                  </div>

                  <div className="portfolio-right">
                    <p>{project.description}</p>
                    <p>
                      Every image was created to preserve not just how the day looked but how it felt.
                    </p>
                  </div>

                </div>

              </div>

              {/* GALLERY */}
              <div className="portfolio-image">
                <div className="image-item">

                  <div className="image">
                    <img src={project.singleimage2} alt="" />
                  </div>

                  <div className="image">
                    <img src={project.singleimage3} alt="" />
                  </div>

                </div>
              </div>

              {/* VISION */}
              <div className="post portfolio-content">

                <div className="portfolio-item">

                  <div className="portfolio-left">
                    <span>02  //  The Vision</span>
                  </div>

                  <div className="portfolio-right">
                    <p>
                      The goal was to document the ceremony in a natural, unobtrusive way—allowing genuine moments to unfold without interruption.
                    </p>
                    <p>
                      Every image was created to preserve not just how the day looked but how it felt.
                    </p>
                  </div>

                </div>

              </div>

              {/* IMAGE */}
              <div className="portfolio-image">
                <div className="image">
                  <img src={project.singleimage4} alt="" />
                </div>
              </div>

              {/* CLIENT REVIEW */}
              <div className="post portfolio-content">

                <div className="portfolio-item">

                  <div className="portfolio-left">
                    <span>03  //  Client Words</span>
                  </div>

                  <div className="portfolio-right">
                    <div className="shape">
                      <svg width="48" height="30" viewBox="0 0 48 30"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.5 0H24L12.16 30H0L5.5 0Zm24 0H48L36.18 30H24L29.5 0Z"
                          fill="#6D7177" />
                      </svg>
                    </div>
                    <div className="text">
                      <p>
                        “Every photo feels like reliving the moment. Nothing felt staged,
                        just real and beautiful.”
                      </p>
                      <span>- Mickel jone</span>
                    </div>

                  </div>

                </div>

              </div>

              {/* APPROACH */}
              <div className="post portfolio-content approach">

                <div className="portfolio-item">

                  <div className="portfolio-left">
                    <span>04  //  Creative Approach</span>
                  </div>

                  <div className="portfolio-right">
                    <p>
                      This project relied on natural light, calm pacing, and thoughtful composition. By staying present and unobtrusive, each frame became a reflection of real emotion rather than performance.
                    </p>
                    <p>
                      Each frame reflects real emotion rather than performance.
                    </p>
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
    </>
  );
};

export default PortfolioSinglePage;