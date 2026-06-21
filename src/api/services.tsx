import s1 from "../images/service/img-1.jpg";
import s2 from "../images/service/img-2.jpg";
import s3 from "../images/service/img-3.jpg";
import s4 from "../images/service/img-4.jpg";

import ss1 from "../images/service-single/service-single-img-1.jpg";
import ss2 from "../images/service-single/service-single-img-2.jpg";
import ss3 from "../images/service-single/service-single-img-3.jpg";
import ss4 from "../images/service-single/service-single-img-4.jpg";

export interface Service {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string;
  singleimage: string;
}

const services: Service[] = [
  {
    id: 1,
    title: "Phát triển Web Full-Stack",
    slug: "fullstack-web",
    description: "React/Next.js kết hợp Node.js/Spring Boot, xây sản phẩm hoàn chỉnh từ đầu đến cuối.",
    image: s1,
    singleimage: ss1,
  },
  {
    id: 2,
    title: "Backend & Microservices",
    slug: "backend-microservices",
    description: "API Gateway, Spring Cloud, kiến trúc dịch vụ mở rộng và đáng tin cậy.",
    image: s2,
    singleimage: ss2,
  },
  {
    id: 3,
    title: "Phát triển Mobile (Flutter)",
    slug: "mobile-flutter",
    description: "Ứng dụng iOS/Android với chat thời gian thực và quản lý nghiệp vụ.",
    image: s3,
    singleimage: ss3,
  },
  {
    id: 4,
    title: "Phân tích & Tư vấn giải pháp",
    slug: "business-analysis",
    description: "Phân tích yêu cầu, tư vấn giải pháp và đồng hành cùng khách hàng từ ý tưởng tới sản phẩm.",
    image: s4,
    singleimage: ss4,
  },
];

export default services;