/* =========================================================
   Dữ liệu hồ sơ — Mai Tan Thep (thepKz)
   Dùng chung cho các section: Skills, Experience, Education, Certifications
========================================================= */

export interface SkillGroup {
  id: number;
  label: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: 1,
    label: "Ngôn ngữ",
    items: ["TypeScript", "JavaScript", "Java", "Python", "Golang", "HTML/CSS"],
  },
  {
    id: 2,
    label: "Framework & Thư viện",
    items: [
      "React.js",
      "Next.js",
      "Node.js",
      "Express.js",
      "Spring Boot",
      "ASP.NET",
      "Flutter",
      "Redux",
      "TailwindCSS",
    ],
  },
  {
    id: 3,
    label: "Database & Cloud",
    items: ["MongoDB", "MySQL", "SQL Server", "Firebase", "Redis", "Cloudinary CDN"],
  },
  {
    id: 4,
    label: "DevOps & Công cụ",
    items: [
      "Docker",
      "GitHub Actions",
      "Vercel",
      "Netlify",
      "Render",
      "Postman",
      "Swagger/OpenAPI",
    ],
  },
  {
    id: 5,
    label: "Quản lý dự án",
    items: ["Jira", "Confluence", "Lark", "Slack"],
  },
  {
    id: 6,
    label: "Ngoại ngữ",
    items: ["Tiếng Anh (B2)", "Tiếng Hàn (TOPIK II)"],
  },
];

export interface ExperienceItem {
  id: number;
  company: string;
  position: string;
  duration: string;
  points: string[];
}

export const experiences: ExperienceItem[] = [
  {
    id: 1,
    company: "FPT Software",
    position: "Fresher · Korean Bridge Engineer · Full-time",
    duration: "01/2026 – 03/2026",
    points: [
      "Tự phân tích và lập tài liệu yêu cầu nghiệp vụ, chuyển phản hồi của khách hàng thành task phát triển cụ thể.",
      "Điều phối họp Scrum hằng ngày và lập kế hoạch sprint, đảm bảo đồng bộ giữa hai phía.",
      "Quản lý theo dõi task và báo cáo tiến độ qua Jira và Confluence.",
    ],
  },
  {
    id: 2,
    company: "FPT Software",
    position: "Intern · Korean Bridge Engineer · Full-time",
    duration: "12/2024 – 07/2025",
    points: [
      "Hỗ trợ các Bridge Engineer senior dịch tài liệu kỹ thuật và đặc tả yêu cầu.",
      "Tham gia quy trình Agile/Scrum, theo dõi task qua Jira và báo cáo cho quản lý dự án.",
      "Tích lũy kinh nghiệm làm việc trong văn hóa doanh nghiệp Hàn Quốc và môi trường phần mềm enterprise.",
    ],
  },
];

export interface EducationItem {
  id: number;
  school: string;
  program: string;
  duration: string;
  detail: string;
}

export const education: EducationItem[] = [
  {
    id: 1,
    school: "Đại học FPT",
    program: "Kỹ thuật phần mềm (SE)",
    duration: "09/2022 – 05/2026",
    detail: "GPA 8.1/10 · Xếp loại Giỏi",
  },
];

export interface CertificationItem {
  id: number;
  title: string;
  issuer: string;
  date: string;
  skills?: string;
}

export const certifications: CertificationItem[] = [
  {
    id: 1,
    title: "Career Essentials in Generative AI",
    issuer: "Microsoft & LinkedIn",
    date: "01/2026",
  },
  {
    id: 2,
    title: "Agile Software Development: Scrum for Developers",
    issuer: "LinkedIn",
    date: "01/2026",
  },
  {
    id: 3,
    title: "Java Database Connectivity Specialization",
    issuer: "LearnQuest / Coursera",
    date: "05/2024",
  },
  {
    id: 4,
    title: "Career Essentials in Generative AI by Microsoft and LinkedIn",
    issuer: "Microsoft",
    date: "01/2026",
    skills: "Prompt Engineering, Responsible AI",
  },
  {
    id: 5,
    title: "What Is Generative AI?",
    issuer: "LinkedIn",
    date: "01/2026",
    skills: "Generative AI, Generative AI Tools",
  },
  {
    id: 6,
    title: "Web Design for Everybody Specialization",
    issuer: "University of Michigan / Coursera",
    date: "03/2024",
  },
];
