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
    title: "Eternal Vows",
    category: "Weddings",
    des1:"Timeless wedding emotions.",
    description: "Eternal Vows captures a wedding day defined by intimacy, emotion, and quiet elegance. From heartfelt exchanges to unscripted moments, this story reflects love in its most",
    image: p1,
    singleimage: psw1,
    singleimage2: psw2,
    singleimage3: psw3,
    singleimage4: psw4,
    slug: "eternal-vows",
    col: "col-lg-4 col-md-6 col-12",
  },
  {
    id: 2,
    title: "Golden Hour",
    category: "Portraits",
    des1:"Warm, natural portrait moments",
    description: "This project relied on natural light, calm pacing, and thoughtful composition. By staying present and unobtrusive, each frame became a reflection of real emotion rather than performance.",
    image: p2,
    singleimage: psg1,
    singleimage2: psg2,
    singleimage3: psg3,
    singleimage4: psg4,
    slug: "golden-hour",
    col: "col-lg-8 col-md-6 col-12",
  },
  {
    id: 3,
    title: "City Life",
    category: "Lifestyle",
    des1:"Candid urban moments.",
    description: "This project relied on natural light, calm pacing, and thoughtful composition. By staying present and unobtrusive, each frame became a reflection of real emotion rather than performance.",
    image: p3,
    singleimage: psc1,
    singleimage2: psg2,
    singleimage3: psg3,
    singleimage4: psg4,
    slug: "city-life",
    col: "col-lg-8 col-md-6 col-12",
  },
  {
    id: 4,
    title: "Morning Mist",
    category: "Travel",
    des1:"Serene travel landscapes",
    description: "This project relied on natural light, calm pacing, and thoughtful composition. By staying present and unobtrusive, each frame became a reflection of real emotion rather than performance.",
    image: p4,
    singleimage: psm1,
    singleimage2: psg2,
    singleimage3: psg3,
    singleimage4: psg4,
    slug: "morning-mist",
    col: "col-lg-4 col-md-6 col-12",
  },
];

export default portfolio;