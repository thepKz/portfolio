import p1 from "../images/portfolio/image-1.jpg";
import p2 from "../images/portfolio/image-2.jpg";
import p3 from "../images/portfolio/image-3.jpg";
import p4 from "../images/portfolio/image-4.jpg";

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
    category: "Full-Stack · Team Lead",
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
    category: "Microservices · Team Lead",
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
    category: "Next.js 15 · GSAP",
    des1: "Migrate nền tảng eSports sang Next.js 15.",
    description: "Migrate một website eSports & Gaming quy mô lớn từ template HTML legacy sang kiến trúc Next.js 15 App Router. Refactor 50+ module UI thành component React/TypeScript tái sử dụng, dựng 13 route production, tích hợp GSAP ScrollTrigger/SplitText, Swiper.js trong môi trường React và xử lý các thách thức SSR/hydration.",
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
    title: "StudyBlog",
    category: "Solo · Content",
    des1: "Blog chia sẻ kiến thức 85k+ lượt xem.",
    description: "Xây dựng và duy trì nền tảng chia sẻ kiến thức cá nhân đạt hơn 85.000 lượt xem từ 2023. Xuất bản các bài viết về môn học Kỹ thuật phần mềm và học tiếng Nhật (gồm cả luyện nói) nhằm hỗ trợ cộng đồng tiếp cận công nghệ phần mềm tốt hơn.",
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