import p1 from "../images/portfolio/image-1.png";
import p2 from "../images/portfolio/image-2.png";
import p3 from "../images/portfolio/image-3.png";
import p4 from "../images/portfolio/image-4.png";

import psw1 from "../images/portfolio-single/portfolio-sw1-img-1.jpg";
import psw2 from "../images/portfolio-single/portfolio-sw1-img-2.jpg";
import psw3 from "../images/portfolio-single/portfolio-sw1-img-3.jpg";
import psw4 from "../images/portfolio-single/portfolio-sw1-img-4.jpg";

import psg1 from "../images/portfolio-single/portfolio-sg-img-1.jpg";
import psg2 from "../images/portfolio-single/portfolio-sg-img-2.jpg";
import psg3 from "../images/portfolio-single/portfolio-sg-img-3.jpg";
import psg4 from "../images/portfolio-single/portfolio-sg-img-4.jpg";

import psc1 from "../images/portfolio-single/portfolio-sc-img-1.jpg";
import psm1 from "../images/portfolio-single/portfolio-sm-img-1.jpg";




export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  description: string;
  des1: string;
  image: string;
  singleimage: string;
  singleimage2: string;
  singleimage3: string;
  singleimage4: string;
  slug: string;
  col: string;
}

const portfolio: PortfolioItem[] = [
  {
    id: 1,
    title: "Genkikoi",
    category: "Full-Stack",
    des1: "Nền tảng thú y full-stack.",
    description: "Dẫn dắt nhóm 4 người hoàn thành nền tảng thú y full-stack trong 3 tháng. Thiết kế RESTful API (Express + MongoDB) với hơn 5 module: tư vấn, kiểm tra bể cá, điều trị và quản lý bệnh. Xây frontend React/TypeScript kèm pipeline CI/CD qua GitHub Actions.",
    image: p1,
    singleimage: psw1,
    singleimage2: psw2,
    singleimage3: psw3,
    singleimage4: psw4,
    slug: "genkikoi",
    col: "col-lg-4 col-md-6 col-12",
  },
  {
    id: 2,
    title: "TrustFundMe",
    category: "Microservices",
    des1: "Hệ thống thiện nguyện minh bạch.",
    description: "Thiết kế hệ thống Microservices đầy đủ (8+ service: API Gateway, Identity...) dùng Spring Boot + Spring Cloud Eureka. Frontend Next.js (TypeScript) kèm CI/CD qua GitHub Actions. Tích hợp cổng thanh toán VietQR + Casso cho giao dịch quyên góp real-time với webhook, kèm app Flutter (iOS/Android) có chat thời gian thực.",
    image: p2,
    singleimage: psg1,
    singleimage2: psg2,
    singleimage3: psg3,
    singleimage4: psg4,
    slug: "trustfundme",
    col: "col-lg-8 col-md-6 col-12",
  },
  {
    id: 3,
    title: "Black Hole Magic",
    category: "GSAP",
    des1: "Đây là một website cho công ty game với giao diện mượt mà và nghệ thuật đặt lên hàng đầu.",
    description: "Đây là một website cho công ty game, với quy mô lớn áp dụng các kĩ thuật khó như GSAP, THREE.JS và nhiều thứ khác...",
    image: p3,
    singleimage: psc1,
    singleimage2: psg2,
    singleimage3: psg3,
    singleimage4: psg4,
    slug: "black-hole-magic",
    col: "col-lg-8 col-md-6 col-12",
  },
  {
    id: 4,
    title: "Jang Wonyoung Gallery",
    category: "Solo · Content",
    des1: "Trang danh sách ảnh về Jang Wonyoung.",
    description: "Với niềm đam mê thần tượng Hàn Quốc, tôi đã lập nên website với các hiệu ứng xịn xò cùng với những bức ảnh tuyệt đẹp của idol Hàn Quốc.",
    image: p4,
    singleimage: psm1,
    singleimage2: psg2,
    singleimage3: psg3,
    singleimage4: psg4,
    slug: "studyblog",
    col: "col-lg-4 col-md-6 col-12",
  },
];

export default portfolio;