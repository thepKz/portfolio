import blog1 from "../images/blog/img-1.jpg";
import blog2 from "../images/blog/img-2.jpg";
import blog3 from "../images/blog/img-3.jpg";
import blog4 from "../images/blog/img-4.jpg";
import blog5 from "../images/blog/img-5.jpg";

export interface BlogItem {
  id: number;
  title: string;
  slug: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  description: string;
  col?: string;
}

const blogs: BlogItem[] = [
  {
    id: 1,
    title: "Finding Beauty in Everyday Moments",
    slug: "finding-beauty-everyday-moments",
    image: blog1,
    category: "Travel",
    date: "Mar 12, 2026",
    readTime: "3 min read",
    description: "How simple scenes can turn into powerful visual stories.",
    col: "col col-lg-12 col-md-6 col-12",
  },
  {
    id: 2,
    title: "The Art of Natural Light Photography",
    slug: "natural-light-photography",
    image: blog2,
    category: "Technique",
    date: "Mar 15, 2026",
    readTime: "7 min read",
    description: "Using light to create depth, mood, and emotion.",
    col: "col col-lg-6 col-md-6 col-12",
  },
  {
    id: 3,
    title: "Behind the Lens: My Creative Process",
    slug: "creative-process",
    image: blog3,
    category: "Process",
    date: "Mar 10, 2026",
    readTime: "6 min read",
    description: "From concept to final shot—how each story is crafted.",
    col: "col col-lg-6 col-md-6 col-12",
  },
  {
    id: 4,
    title: "Choosing the Right Location for Your Shoot",
    slug: "right-location-shoot",
    image: blog4,
    category: "Tips",
    date: "Mar 18, 2026",
    readTime: "5 min read",
    description: "Why location matters more than expensive gear.",
    col: "col col-lg-6 col-md-6 col-12",
  },
  {
    id: 5,
    title: "Crafting Stories from Brand Experiences",
    slug: "brand-storytelling",
    image: blog5,
    category: "Branding",
    date: "Mar 22, 2026",
    readTime: "4 min read",
    description: "Why strong visuals build trust and emotional connection.",
    col: "col col-lg-6 col-md-6 col-12",
  },
];

export default blogs;