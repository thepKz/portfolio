import React, { Fragment, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Header from '../../components/header';
import HeroStatic from '../../components/hero/hero';
import AboutSection from '../../components/about/about';
import SkillsSection from '../../components/SkillsSection/SkillsSection';
import ExperienceSection from '../../components/ExperienceSection/ExperienceSection';
import EducationSection from '../../components/EducationSection/EducationSection';
import CertificationsSection from '../../components/CertificationsSection/CertificationsSection';
import PortfolioSection from '../../components/PortfolioSection/PortfolioSection';
import ServiceSection from '../../components/ServiceSection';
import WhyChooseUsSection from '../../components/WhyChooseUsSection/WhyChooseUsSection';
import TestimonialSection from '../../components/Testimonial/TestimonialSection';
import CTASection from '../../components/CTASection/CTASection';
import FaqSection from '../../components/FaqSection/FaqSection';
import ContactSection from '../../components/ContactSection/ContactSection';
import Footer from '../../components/footer/Footer';
import Scrollbar from '../../components/scrollbar/scrollbar';

gsap.registerPlugin(ScrollToPlugin);

const HomePage: React.FC = () => {

    const location = useLocation();

    /* =========================
       HASH SCROLL
    ========================== */
    useEffect(() => {
        if (!location.hash) return;

        const element = document.querySelector(location.hash);

        if (element) {
            const timer = setTimeout(() => {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: element,
                        offsetY: 80,
                    },
                    ease: "power2.out",
                });
            }, 200);

            return () => clearTimeout(timer);
        }
    }, [location]);

    return (
        <Fragment>
            <Header />
            <HeroStatic />
            <AboutSection />
            <SkillsSection />
            <PortfolioSection />
            <ExperienceSection />
            <EducationSection />
            <ServiceSection />
            <WhyChooseUsSection />
            <CertificationsSection />
            <TestimonialSection />
            <FaqSection />
            <ContactSection />
            <CTASection />
            <Footer />
            <Scrollbar />
        </Fragment>
    );
};

export default HomePage;