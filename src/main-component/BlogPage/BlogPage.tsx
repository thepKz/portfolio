import React, { Fragment } from 'react';
import { useRef } from "react";
import useSplitTextAnimation from "../../components/splittextAnimation/useSplitTextAnimation";
import Header2 from '../../components/header2';
import Footer2 from '../../components/footer2/Footer2';
import Scrollbar from '../../components/scrollbar/scrollbar'
import BlogList from '../../components/BlogList/BlogList';
import CTASection from '../../components/CTASection/CTASection';

const BlogPage: React.FC = () => {

    const ref = useRef<HTMLDivElement | null>(null);

    useSplitTextAnimation(ref);


    return (
        <Fragment>
            <Header2 />
            <section className="wpo-blog-pg-section" ref={ref}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="blog-title-text">
                                <h1 className="poort-text poort-in-up">Blog</h1>
                            </div>
                        </div>
                    </div>
                    <BlogList />

                </div>
            </section>
            <CTASection />
            <Footer2 />
            <Scrollbar />
        </Fragment>
    )
};
export default BlogPage;

