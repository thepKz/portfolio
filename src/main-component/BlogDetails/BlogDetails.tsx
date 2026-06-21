import React, { Fragment } from 'react';
import Header2 from '../../components/header2';
import Scrollbar from '../../components/scrollbar/scrollbar'
import BlogSingle from '../../components/BlogDetails/BlogDetails';
import Footer2 from '../../components/footer2/Footer2';
import CTASection from '../../components/CTASection/CTASection';

const BlogDetails: React.FC = () => {

    return (
        <Fragment>
            <Header2 />
            <BlogSingle />
            <CTASection />
            <Footer2 />
            <Scrollbar />
        </Fragment>
    )
};
export default BlogDetails;
