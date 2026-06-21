import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import blogs from "../../api/blogs";

import img2 from "../../images/blog-details/img-2.jpg";
import img3 from "../../images/blog-details/img-3.jpg";

const BlogSingle: React.FC = () => {


  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const blog = blogs.find((item) => item.slug === slug);

  if (!blog) {
    return (
      <div className="container">
        <h3>Blog not found</h3>
      </div>
    );
  }

  return (
    <div>
      <section className="wpo-page-title">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col col-lg-12">
              <div className="wpo-breadcumb-wrap">
                <h2>{blog.title}</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="wpo-blog-single-section section-padding pt-0 pb-0">

        <div className="container">

          <div className="wpo-blog-wraper">

            <div className="wpo-blog-content">

              {/* TOP IMAGE */}
              <div className="format-standard-image">

                <div className="image-top">

                  <div className="image">
                    <img src={blog.image} alt={blog.title} />

                    {/* SOCIAL */}
                    <div className="social-icon">
                      <ul>
                        <li><Link to="#"><i className="flaticon-facebook-app-symbol"></i></Link></li>
                        <li><Link to="#"><i className="ti-instagram"></i></Link></li>
                        <li><Link to="#"><i className="ti-pinterest"></i></Link></li>
                        <li><Link to="#"><i className="ti-twitter-alt"></i></Link></li>
                      </ul>
                    </div>

                  </div>

                  {/* META */}
                  <div className="blog-tag">
                    <ul>
                      <li>{blog.date} · 4 min read</li>
                    </ul>
                  </div>

                </div>

                <p>{blog.description}</p>

              </div>

              {/* SECTION 1 */}
              <div className="post entry-media">
                <h2>Introduction</h2>
                <p>
                  Great photography doesn’t always require exotic locations.
                  The most meaningful images are found in everyday moments.
                </p>
                <p>
                  As photographers, we must observe deeply and capture emotion.
                </p>
              </div>

              {/* SECTION 2 */}
              <div className="post entry-media">
                <h2>Seeing the Ordinary Differently</h2>
                <p>
                  Everyday life is filled with hidden stories. Light, shadow,
                  and stillness can create powerful visuals.
                </p>
                <p>
                  Train your eye to see emotion in simple scenes.
                </p>
              </div>

              {/* QUOTE CARD */}
              <div className="blog-card">

                <div className="blog-item">

                  <div className="shape">
                    <svg width="48" height="30" viewBox="0 0 48 30">
                      <path
                        d="M5.5 0H24L12.16 30H0L5.5 0Zm24 0H48L36.18 30H24L29.5 0Z"
                        fill="#6D7177"
                      />
                    </svg>
                  </div>

                  <div className="blog-card-text">
                    <h3>
                      “The best photographs are the ones that make you feel something.”
                    </h3>
                    <span>- Lumora</span>
                  </div>

                </div>

              </div>

              {/* SECTION 3 */}
              <div className="post entry-media">
                <h2>The Power of Natural Light</h2>
                <p>
                  Light shapes every photograph. Golden hour creates emotional depth.
                </p>
                <p>
                  Learn how to use natural light to elevate your shots.
                </p>
              </div>

              {/* IMAGE GALLERY */}
              <div className="image-wrap">

                <div className="image-item">

                  <div className="image">
                    <img src={img2} alt="" />
                  </div>

                  <div className="image">
                    <img src={img3} alt="" />
                  </div>

                </div>

                <h3>Moments · Light · Emotion</h3>

              </div>

            </div>

          </div>

        </div>

      </section>
    </div>
  );
};

export default BlogSingle;