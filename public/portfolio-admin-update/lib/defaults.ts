import type { EduItem, Project, SkillGroup } from "./types";

// Used only if Supabase is not configured yet (or temporarily unreachable),
// so the site never shows an empty page.

export const defaultSettings: Record<string, string> = {
  location: "Hafizabad, Punjab, Pakistan",
  about: `I'm a BS Information Technology student at Government College University Faisalabad and a full-stack developer who prefers finishing things over talking about them. Most of what I know comes from building complete applications rather than isolated exercises.

My strongest foundation is the MERN stack — React, Node.js, Express, and MongoDB — with authentication, REST APIs, and real-time features built in from the start. I've since added Next.js and TypeScript to that, and use them for anything that needs to scale cleanly or ship fast.

One of my projects, a restaurant POS system, is currently used for real daily order and sales operations — not a demo, an actual tool someone relies on. That's the standard I hold the rest of my work to.`,
};

export const defaultSkills: SkillGroup[] = [
  { id: "s1", category: "Frontend", sort_order: 1, items: ["React.js", "Next.js", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "Tailwind CSS", "Redux Toolkit"] },
  { id: "s2", category: "Backend", sort_order: 2, items: ["Node.js", "Express.js", "REST APIs", "JWT Authentication", "Middleware"] },
  { id: "s3", category: "Database & storage", sort_order: 3, items: ["MongoDB", "Mongoose", "Supabase"] },
  { id: "s4", category: "Auth & services", sort_order: 4, items: ["Firebase Google OAuth", "Socket.IO", "PayPal", "Cloudinary"] },
  { id: "s5", category: "Tools & deployment", sort_order: 5, items: ["Git", "GitHub", "Vercel", "Netlify", "Railway", "Vite", "VS Code"] },
];

export const defaultEducation: EduItem[] = [
  { id: "e1", kind: "education", sort_order: 1, title: "Bachelor of Science in Information Technology (BS IT)", subtitle: "Government College University Faisalabad (GCUF) · 3rd year" },
  { id: "e2", kind: "education", sort_order: 2, title: "Intermediate", subtitle: "Punjab College, Gujranwala Campus" },
  { id: "c1", kind: "certification", sort_order: 1, title: "Dev Weekends Fellowship Certificate — July 2026", subtitle: null },
  { id: "c2", kind: "certification", sort_order: 2, title: "MS Office Certificate — Sunshine School, Gujranwala", subtitle: null },
];

export const defaultProjects: Project[] = [
  {
    id: "p1", sort_order: 1, name: "MERN Multi-Vendor E-commerce Platform", tag: "E-commerce",
    live: "https://e-commerce-shop-232n.vercel.app/", github: "https://github.com/fizae47-arch/e-commerce-shop",
    description: "A full-stack marketplace with separate customer and shop-side experiences — product search, categories, cart, wishlist, checkout, orders, reviews, refunds, and address management.",
    highlights: ["Shop-side product, inventory, order, refund, and event management", "Real-time customer messaging with Socket.IO", "JWT and role-based authorization across customer and shop roles", "PayPal payments and Cloudinary image storage"],
    tech: ["React", "Node.js", "Express", "MongoDB", "Redux Toolkit", "Socket.IO", "PayPal"], image_url: "/projects/ecommerce.png",
  },
  {
    id: "p2", sort_order: 2, name: "Lahori Lason — Restaurant POS System", tag: "In production use",
    live: "https://lahori-lason-fast-food-397m.vercel.app/", github: "https://github.com/fizae47-arch/lahori-lason-fast-food",
    description: "A restaurant point-of-sale system built and deployed for real daily order and sales operations — not a demo. Staff use it to take orders and track earnings.",
    highlights: ["Staff authentication and menu/category/deal management", "Cart and order processing with printable receipts", "Invoice tracking, search, and an earnings dashboard", "REST APIs with Node.js, Express, and MongoDB"],
    tech: ["React", "Node.js", "Express", "MongoDB"], image_url: "/projects/lahori-lason.png",
  },
  {
    id: "p3", sort_order: 3, name: "FizaEstate — Real Estate Platform", tag: "Real estate",
    live: "https://mern-estate-theta-woad.vercel.app/", github: "https://github.com/fizae47-arch/mern-estate",
    description: "A property marketplace with listing management, search and filtering, favorites, and direct messaging between users, backed by Google OAuth and Supabase storage.",
    highlights: ["Google OAuth alongside standard JWT-protected auth", "Full CRUD for property listings with Redux Toolkit state", "Search, filtering, favorites, and user profiles", "Image storage on Supabase"],
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Supabase"], image_url: "/projects/fizaestate.png",
  },
  {
    id: "p4", sort_order: 4, name: "BizBoard — Business Dashboard", tag: "Next.js · Learning project",
    live: "https://bizboard-gilt.vercel.app/", github: "https://github.com/fizae47-arch/bizboard",
    description: "A Next.js + TypeScript business dashboard covering metrics, products, orders, customers, and analytics — built to go deep on the App Router.",
    highlights: ["Next.js App Router with file-based routing", "Server and Client Components with loading and error states", "Dynamic product pages and a mock API Route Handler", "Search and filtering across dashboard views"],
    tech: ["Next.js", "TypeScript", "Tailwind CSS"], image_url: "/projects/bizboard.png",
  },
  {
    id: "p5", sort_order: 5, name: "Trippy — Tour & Travel Website", tag: "First project · Frontend",
    live: "https://frabjous-lamington-59bff7.netlify.app/", github: null,
    description: "My very first project and the starting point of this whole journey — a travel booking site for browsing destinations across different countries, with a dedicated section for recent tours.",
    highlights: ["Browsable tours across multiple countries and destinations", "A recent tours section highlighting the latest packages", "Built with core HTML, CSS, and JavaScript, then extended with React", "Deployed on Netlify"],
    tech: ["HTML", "CSS", "JavaScript", "React"], image_url: "/projects/tour-travel.png",
  },
];
