import React from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header2 from "../../components/header2";
import Footer2 from "../../components/footer2/Footer2";
import Scrollbar from "../../components/scrollbar/scrollbar";

import portfolio from "../../api/portfolio";
import CTASection from "../../components/CTASection/CTASection";

const PortfolioSinglePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const project = portfolio.find((item) => item.slug === slug);

  if (!project) {
    return <h2 style={{ textAlign: "center", padding: "120px" }}>Không tìm thấy dự án</h2>;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header2 />

      <section className="wpo-portfolio-single-section">
        <div className="container">

          <button className="service-back-btn" onClick={() => navigate(-1)}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M15 8H1M6 3L1 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Quay lại
          </button>

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
                          <span>Vai trò</span>
                          <h3>Full-Stack Developer</h3>
                        </li>
                        <li>
                          <span>Năm</span>
                          <h3>2024 – 2026</h3>
                        </li>
                      </ul>

                      <ul>
                        <li>
                          <span>Lĩnh vực</span>
                          <h3>{project.category}</h3>
                        </li>
                        <li>
                          <span>Nguồn</span>
                          <h3><a href="https://github.com/thepKz" target="_blank" rel="noopener noreferrer">GitHub</a></h3>
                        </li>
                      </ul>

                    </div>
                  </div>

                </div>

                {/* PROJECT INFO */}
                <div className="portfolio-item">

                  <div className="portfolio-left">
                    <span>01  //  Tổng quan dự án</span>
                  </div>

                  <div className="portfolio-right">
                    <p>{project.description}</p>
                    <p>
                      Dự án được xây dựng theo hướng sản phẩm thật, chú trọng kiến trúc rõ ràng và khả năng mở rộng.
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
                    <span>02  //  Mục tiêu</span>
                  </div>

                  <div className="portfolio-right">
                    <p>
                      Mục tiêu là giải quyết bài toán nghiệp vụ thực tế bằng giải pháp kỹ thuật gọn gàng, dễ bảo trì và sẵn sàng cho production.
                    </p>
                    <p>
                      Mỗi quyết định kỹ thuật đều hướng tới trải nghiệm người dùng và hiệu năng hệ thống.
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
                    <span>03  //  Nhận xét</span>
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
                        “Sản phẩm được bàn giao đúng hạn, vận hành ổn định và đúng yêu cầu nghiệp vụ. Rất đáng tin cậy.”
                      </p>
                      <span>- Quản lý dự án</span>
                    </div>

                  </div>

                </div>

              </div>

              {/* APPROACH */}
              <div className="post portfolio-content approach">

                <div className="portfolio-item">

                  <div className="portfolio-left">
                    <span>04  //  Cách tiếp cận</span>
                  </div>

                  <div className="portfolio-right">
                    <p>
                      Dự án áp dụng kiến trúc rõ ràng, component tái sử dụng và pipeline CI/CD tự động. Ưu tiên code sạch, dễ kiểm thử và khả năng mở rộng lâu dài.
                    </p>
                    <p>
                      Mỗi tính năng đều được xây dựng hướng tới giá trị thật cho người dùng cuối.
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