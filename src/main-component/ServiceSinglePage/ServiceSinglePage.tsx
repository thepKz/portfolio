import React, { Fragment, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header2 from "../../components/header2";
import Footer2 from "../../components/footer2/Footer2";
import Scrollbar from "../../components/scrollbar/scrollbar";

import services from "../../api/services";
import arrow from "../../images/arrow-2.svg";
import CTASection from "../../components/CTASection/CTASection";

const ServiceSinglePage: React.FC = () => {

  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const service = services.find((item) => item.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return <div className="text-center section-padding">Không tìm thấy dịch vụ</div>;
  }

  return (
    <Fragment>

      <Header2 />

      <section className="wpo-service-single-section section-padding">

        <div className="container">

          <button className="service-back-btn" onClick={() => navigate(-1)}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M15 8H1M6 3L1 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Quay lại
          </button>

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
                              <span>Lĩnh vực</span>
                              <h3>Phát triển phần mềm</h3>
                            </li>
                            <li>
                              <span>Phong cách</span>
                              <h3>Sạch · Mở rộng · Đáng tin cậy</h3>
                            </li>
                          </ul>

                          <ul>
                            <li>
                              <span>Hình thức</span>
                              <h3>Full-time / Theo dự án</h3>
                            </li>
                            <li>
                              <span>Hợp tác</span>
                              <h3>Remote / Onsite</h3>
                            </li>
                          </ul>

                        </div>

                      </div>

                      <p>
                        Biến yêu cầu nghiệp vụ thành sản phẩm phần mềm thật, chú trọng
                        kiến trúc rõ ràng, hiệu năng và khả năng bảo trì lâu dài.
                      </p>

                    </div>

                    {/* DETAILS */}
                    <div className="service-item">

                      <div className="service-content">
                        <h3>Dịch vụ này là gì</h3>
                        <p>
                          Tôi xây dựng sản phẩm end-to-end: phân tích yêu cầu, thiết kế
                          kiến trúc, phát triển và triển khai lên production.
                        </p>
                        <p>
                          Mỗi dòng code hướng tới sự rõ ràng, dễ kiểm thử và bền vững.
                        </p>
                      </div>

                      <div className="service-content">
                        <h3>Bao gồm những gì</h3>
                        <ul>
                          <li>Phân tích & thiết kế giải pháp</li>
                          <li>Phát triển frontend + backend</li>
                          <li>Pipeline CI/CD & triển khai</li>
                          <li>Tài liệu & bàn giao mã nguồn</li>
                        </ul>
                      </div>

                      <div className="service-content">
                        <h3>Cách tôi làm việc</h3>
                        <p>
                          Làm việc theo Agile/Scrum, trao đổi minh bạch và bàn giao
                          theo từng mốc rõ ràng để bạn luôn nắm được tiến độ.
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
                              “Từ đầu đến cuối, quá trình hợp tác đều minh bạch,
                              rõ ràng và đúng cam kết.”
                            </h3>
                            <span>- thepKz</span>
                          </div>

                        </div>

                      </div>

                      {/* CTA */}
                      <div className="service-buttom">

                        <div className="service-buttom-text">
                          <h4>Cùng xây dựng sản phẩm của bạn</h4>
                          <h4>Hãy biến ý tưởng thành sản phẩm thật.</h4>
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
                                <Link to="/#contact">Liên hệ</Link>
                              </span>
                              <span>
                                <Link to="/#contact">Ngay</Link>
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