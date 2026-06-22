import React from "react";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import portfolio from "../../api/portfolio";


const PortfolioSection: React.FC = () => {

  return (
    <section className="wpo-portfolio-section" id="portfolio">
      <div className="container">

        <div className="portfolio-wrap">

          {/* TITLE */}
          <div className="wpo-section-title">
            <h2 className="poort-text poort-in-right">
              Works <span>({portfolio.length})</span>
            </h2>
          </div>

          {/* GRID */}
          <div className="row">

            {portfolio.map((item, index) => (

              <div key={item.id} className={item.col}>

                <Fade direction="up" delay={index * 100} triggerOnce>

                  <div className="portfolio-card">

                    {/* IMAGE */}
                    <div className="portfolio-image left-to-right-light">
                      <img src={item.image} alt={item.title} />
                    </div>

                    {/* CATEGORY */}
                    <div className="portfolio-tag">
                      <span>{item.category}</span>
                    </div>

                    {/* CONTENT */}
                    <div
                      className={
                        item.col.includes("col-lg-4")
                          ? "portfolio-text"
                          : "portfolio-content"
                      }
                    >

                      <h3>
                        <Link to={`/portfolio-single/${item.slug}`}>
                          {item.title}
                        </Link>
                      </h3>

                      <p>{item.des1}</p>

                      <Link
                        className="portfolio-detail-btn"
                        to={`/portfolio-single/${item.slug}`}
                      >
                        Xem dự án
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>

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

export default PortfolioSection;