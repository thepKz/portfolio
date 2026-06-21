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
    title: "Event Photography",
    slug: "event-photography",
    description: "Professional coverage for any event.",
    image: s1,
    singleimage: ss1,
  },
  {
    id: 2,
    title: "Portrait Photography",
    slug: "portrait-photography",
    description: "Natural portraits with authentic expression.",
    image: s2,
    singleimage: ss2,
  },
  {
    id: 3,
    title: "Brand & Commercial",
    slug: "brand-photography",
    description: "Clean visuals for modern brands.",
    image: s3,
    singleimage: ss3,
  },
  {
    id: 4,
    title: "Wedding Photography",
    slug: "wedding-photography",
    description: "Timeless coverage of real emotions.",
    image: s4,
    singleimage: ss4,
  },
];

export default services;