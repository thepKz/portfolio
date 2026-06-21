import React from "react";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import blogs from "../../api/blogs";

const BlogList: React.FC = () => {

  return (

    <div className="wpo-blog-wrap">

      <div className="row">

        {blogs.map((blog, index) => (

          <div key={blog.id} className={blog.col}>

            <Fade direction="up" delay={index * 100} triggerOnce>

              <div className="blog-card">

                <div className="blog-item">

                  {/* IMAGE */}
                  <div className="image left-to-right-light">

                    <img src={blog.image} alt={blog.title} />

                    <div className="blog-tag">
                      <span className="tag">{blog.category}</span>
                    </div>

                  </div>

                  {/* TEXT */}
                  <div className="blog-text">

                    <ul>
                      <li>
                        <Link to={`/blog-single/${blog.slug}`}>
                          {blog.date} · {blog.readTime}
                        </Link>
                      </li>
                    </ul>

                    <h2>
                      <Link to={`/blog-single/${blog.slug}`}>
                        {blog.title}
                      </Link>
                    </h2>

                    <p>{blog.description}</p>

                  </div>

                </div>

              </div>

            </Fade>

          </div>

        ))}

      </div>

    </div>
  );
};

export default BlogList;