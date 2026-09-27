type Project = {
  name: string;
  tag: string;
  live: string;
  description: string;
  highlights: string[];
  tech: string[];
  image: string;
};

const projects: Project[] = [
  {
    name: "MERN Multi-Vendor E-commerce Platform",
    tag: "E-commerce",
    live: "https://e-commerce-shop-232n.vercel.app/",
    description:
      "A full-stack marketplace with separate customer and shop-side experiences — product search, categories, cart, wishlist, checkout, orders, reviews, refunds, and address management.",
    highlights: [
      "Shop-side product, inventory, order, refund, and event management",
      "Real-time customer messaging with Socket.IO",
      "JWT and role-based authorization across customer and shop roles",
      "PayPal payments and Cloudinary image storage",
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "Redux Toolkit", "Socket.IO", "PayPal"],
    image: "/projects/ecommerce.png",
  },
  {
    name: "Lahori Lason — Restaurant POS System",
    tag: "In production use",
    live: "https://lahori-lason-fast-food-397m.vercel.app/",
    description:
      "A restaurant point-of-sale system built and deployed for real daily order and sales operations — not a demo. Staff use it to take orders and track earnings.",
    highlights: [
      "Staff authentication and menu/category/deal management",
      "Cart and order processing with printable receipts",
      "Invoice tracking, search, and an earnings dashboard",
      "REST APIs with Node.js, Express, and MongoDB",
    ],
    tech: ["React", "Node.js", "Express", "MongoDB"],
    image: "/projects/lahori-lason.png",
  },
  {
    name: "FizaEstate — Real Estate Platform",
    tag: "Real estate",
    live: "https://mern-estate-theta-woad.vercel.app/",
    description:
      "A property marketplace with listing management, search and filtering, favorites, and direct messaging between users, backed by Google OAuth and Supabase storage.",
    highlights: [
      "Google OAuth alongside standard JWT-protected auth",
      "Full CRUD for property listings with Redux Toolkit state",
      "Search, filtering, favorites, and user profiles",
      "Image storage on Supabase",
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Supabase"],
    image: "/projects/fizaestate.png",
  },
  {
    name: "BizBoard — Business Dashboard",
    tag: "Next.js · Learning project",
    live: "https://bizboard-gilt.vercel.app/",
    description:
      "A Next.js + TypeScript business dashboard covering metrics, products, orders, customers, and analytics — built to go deep on the App Router.",
    highlights: [
      "Next.js App Router with file-based routing",
      "Server and Client Components with loading and error states",
      "Dynamic product pages and a mock API Route Handler",
      "Search and filtering across dashboard views",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    image: "/projects/bizboard.png",
  },
  {
    name: "Trippy — Tour & Travel Website",
    tag: "First project · Frontend",
    live: "https://frabjous-lamington-59bff7.netlify.app/",
    description:
      "My very first project and the starting point of this whole journey — a travel booking site for browsing destinations across different countries, with a dedicated section for recent tours.",
    highlights: [
      "Browsable tours across multiple countries and destinations",
      "A recent tours section highlighting the latest packages",
      "Built with core HTML, CSS, and JavaScript, then extended with React",
      "Deployed on Netlify",
    ],
    tech: ["HTML", "CSS", "JavaScript", "React"],
    image: "/projects/tour-travel.png",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="border-t border-ink-border py-24">
      <div className="section-shell">
        <h2 className="font-display text-3xl font-semibold text-paper">Featured projects</h2>

        <div className="mt-14 flex flex-col gap-20">
          {projects.map((project, i) => (
            <article
              key={project.name}
              className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2"
            >
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <span className="font-mono text-xs text-teal">{project.tag}</span>
                <h3 className="mt-2 font-display text-2xl font-semibold text-paper">
                  {project.name}
                </h3>
                <p className="mt-3 max-w-md font-body text-sm leading-relaxed text-paper-muted">
                  {project.description}
                </p>

                <ul className="mt-5 space-y-2">
                  {project.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex gap-3 font-body text-sm leading-relaxed text-paper-muted"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-paper-faint" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded border border-ink-border px-2.5 py-1 font-mono text-xs text-paper-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 font-body text-sm font-medium text-indigo hover:text-paper"
                >
                  View live demo
                </a>
              </div>

              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <div className="overflow-hidden rounded-lg border border-ink-border bg-ink-surface">
                  <div className="flex items-center gap-2 border-b border-ink-border px-4 py-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#5B6178]/60" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#5B6178]/60" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#5B6178]/60" />
                    <span className="ml-2 truncate font-mono text-xs text-paper-faint">
                      {project.live.replace("https://", "")}
                    </span>
                  </div>
                  <div className="aspect-[16/10] w-full overflow-hidden bg-ink-raised">
                    <img
                      src={project.image}
                      alt={`${project.name} screenshot`}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}