import React, { Fragment } from "react";
import Header2 from "../../components/header2";
import Footer2 from "../../components/footer2/Footer2";
import Scrollbar from "../../components/scrollbar/scrollbar";
import ServiceSectionS2 from "../../components/ServiceSectionS2/ServiceSectionS2";
import CTASection from "../../components/CTASection/CTASection";

const ServicePage: React.FC = () => {

  return (
    <Fragment>
      <Header2 />
      <ServiceSectionS2/>
      <CTASection />
      <Footer2 />
      <Scrollbar />
    </Fragment>
  );
};

export default ServicePage;