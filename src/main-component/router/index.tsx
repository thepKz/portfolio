import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const HomePage = lazy(() => import("../HomePage/HomePage"));
const ServicePage = lazy(() => import("../ServicePage/ServicePage"));
const ServiceSinglePage = lazy(() => import("../ServiceSinglePage/ServiceSinglePage"));
const BlogPage = lazy(() => import("../BlogPage/BlogPage"));
const BlogDetails = lazy(() => import("../BlogDetails/BlogDetails"));
const PortfolioSinglePage = lazy(() => import("../PortfolioSinglePage/PortfolioSinglePage"));
const NotFound = lazy(() => import("../../NotFound"));

const AllRoute: React.FC = () => {
  return (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="portfolio-single/:slug" element={<PortfolioSinglePage />} />
        <Route path="service-single/:slug" element={<ServiceSinglePage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog-single/:slug" element={<BlogDetails />} />
        <Route path="service" element={<ServicePage />} />
        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AllRoute;