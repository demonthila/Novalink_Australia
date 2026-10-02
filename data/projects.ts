/**
 * NovaLink projects.
 *
 * Titles/services for the original six come from novalinkinnovations.com; the
 * others (DelaXchange, Active Care, Money Transfer App, Bravio, Active) were
 * identified from NovaLink's supplied project imagery. Problem/solution lines
 * describe what the screens show — confirm with each client and add specifics.
 * Years, results and stacks were not supplied, so they stay empty and hidden.
 *
 * Images live in /public/work/<slug>/ (2000×1500 device mockups, JPEG q82;
 * next/image serves AVIF/WebP at the right size). Personal details visible in
 * two source screenshots were pixelated before publishing.
 */

type Img = { src: string; alt: string; width: number; height: number };

export type Project = {
  slug: string;
  title: string;
  client: string | null;
  location: string | null;
  services: string[];
  problem: string;
  solution: string;
  tech: string[];
  year: string | null;
  image?: Img;
  gallery?: Img[];
  /** Shown as a large feature on the homepage; the rest appear in “More projects”. */
  featured?: boolean;
};

const shot = (slug: string, name: string, alt: string): Img => ({
  src: `/work/${slug}/${slug}-${name}.jpg`,
  alt,
  width: 2000,
  height: 1500,
});

export const projects: Project[] = [
  {
    slug: "iom-hr-system",
    title: "HRPro AI — IOM HR System",
    client: "IOM World",
    location: null,
    services: ["Custom Software Development", "Branding", "UX & Business Analysis"],
    problem: "Give IOM World’s team one dependable system for people, payroll, leave and performance.",
    solution:
      "HRPro AI: a web platform with a real-time workforce overview — head count, tenure, branch-wise employee counts and diversity — plus access, appraisal, claims, leave, payroll, recruitment and e-training modules, and a companion mobile app.",
    tech: [],
    year: null,
    featured: true,
    image: shot("iom-hr-system", "dashboard", "HRPro AI workforce overview dashboard on a laptop, showing head count, employee count by branch and gender diversity"),
    gallery: [
      shot("iom-hr-system", "mobile-login", "HRPro AI mobile app sign-in and welcome screens on two phones"),
      shot("iom-hr-system", "mobile-home", "HRPro AI mobile home screen with leave and request summaries"),
    ],
  },
  {
    slug: "delaxchange",
    title: "DelaXchange",
    client: "Dela",
    location: "Australia",
    services: ["Product Design", "UI/UX Design", "Web Application"],
    problem: "Make buying and selling online safer by holding payments and goods until both sides are satisfied.",
    solution:
      "A secure-transaction marketplace with buyer and seller dashboards, order tracking, delivery performance metrics and a trusted sign-in flow — designed around peace of mind for both parties.",
    tech: [],
    year: null,
    featured: true,
    image: shot("delaxchange", "landing", "DelaXchange landing page on a laptop: “Ditch the stress. Buy smarter. Sell safer.”"),
    gallery: [
      shot("delaxchange", "seller-dashboard", "DelaXchange seller dashboard with on-time delivery, late shipment and revenue metrics"),
      shot("delaxchange", "order-tracking", "DelaXchange order tracking and return flow"),
      shot("delaxchange", "login", "DelaXchange sign-in screen: “Secure & trusted transactions”"),
      shot("delaxchange", "mobile", "DelaXchange mobile screens"),
    ],
  },
  {
    slug: "money-transfer-app",
    title: "Money Transfer App",
    client: null,
    location: "Australia → Sri Lanka",
    services: ["Mobile App Design", "UI/UX Design", "Product Design"],
    problem: "Let customers send and receive money internationally with clear rates and no surprises.",
    solution:
      "A mobile remittance flow: choose to send or receive, pick a service speed, then review sender, receiver, exchange rate, fees and total before paying.",
    tech: [],
    year: null,
    featured: true,
    image: shot("money-transfer-app", "transfer-details", "Money transfer app showing a transaction summary from Melbourne to Sri Lanka with exchange rate and fees"),
    gallery: [
      shot("money-transfer-app", "select-action", "Money transfer app: choose send money or receive money"),
      shot("money-transfer-app", "summary", "Money transfer app payment summary screen"),
      shot("money-transfer-app", "service-options", "Money transfer app service options"),
      shot("money-transfer-app", "mobile", "Money transfer app service selection on a phone"),
    ],
  },
  {
    slug: "learn-website-uk",
    title: "Learn Website",
    client: null,
    location: "United Kingdom",
    services: ["Product Design", "Branding", "Creative"],
    problem: "Give a UK learning provider a clear, credible home for its courses.",
    solution:
      "A warm, conversion-focused learning website — “Unlock your potential with new skills” — with featured courses, learner stories and a responsive mobile experience.",
    tech: [],
    year: null,
    featured: true,
    image: shot("learn-website-uk", "homepage", "Learn website on a laptop: learner testimonials and course highlights"),
    gallery: [
      shot("learn-website-uk", "hero", "Learn website hero: “Unlock your potential with new skills”"),
      shot("learn-website-uk", "mobile", "Learn website on a phone"),
      shot("learn-website-uk", "courses", "Learn website courses section on a laptop"),
    ],
  },
  {
    slug: "hr-management-system",
    title: "HR Management System",
    client: null,
    location: null,
    services: ["Custom Software Development", "Product Design", "Branding", "UX & Business Analysis"],
    problem: "Bring HR scheduling, sessions and workflows into a single system.",
    solution:
      "A custom HR platform with a day, week, month and quarter calendar for lectures, workshops and panel sessions, alongside HR records and approvals.",
    tech: [],
    year: null,
    featured: true,
    image: shot("hr-management-system", "calendar", "HR management system weekly calendar with lectures, workshops and panel discussions"),
    gallery: [
      shot("hr-management-system", "schedule", "HR management system schedule view on a laptop"),
      shot("hr-management-system", "sessions", "HR management system sessions view on a laptop"),
    ],
  },
  {
    slug: "news-marketing-agency",
    title: "News Marketing Agency Website",
    client: null,
    location: "Australia",
    services: ["Product Design", "Branding", "Creative"],
    problem: "Present an Australian marketing agency with a website as sharp as its work.",
    solution:
      "A dark, editorial agency site built to convert: “Ready to scale your brand with paid ads?”, team and client-result sections, and a personal-brand offer for founders.",
    tech: [],
    year: null,
    featured: true,
    image: shot("news-marketing-agency", "paid-ads-hero", "Marketing agency website on a laptop: “Ready to scale your brand with paid ads?”"),
    gallery: [
      shot("news-marketing-agency", "team", "Marketing agency website team section"),
      shot("news-marketing-agency", "testimonials", "Marketing agency website client stories section"),
      shot("news-marketing-agency", "personal-brand", "Personal-brand landing page on a laptop"),
      shot("news-marketing-agency", "mobile", "Personal-brand landing page on a phone"),
      shot("news-marketing-agency", "results", "Marketing agency website results section"),
    ],
  },
  {
    slug: "zendirib-inventory",
    title: "Inventory System",
    client: "Zendirib",
    location: null,
    services: ["Project Management", "Branding", "UX & Business Analysis"],
    problem: "Keep stock levels accurate and visible across day-to-day operations.",
    solution: "An inventory platform with structured data entry for local purchases and stock movements, designed around how the team works.",
    tech: [],
    year: null,
    image: shot("zendirib-inventory", "data-entry", "Zendirib inventory system data-entry screen for local purchases on a laptop"),
  },
  {
    slug: "iom-leave-app",
    title: "IOM Leave Mobile Application",
    client: "IOM World",
    location: null,
    services: ["Product Ownership", "Project Management", "UX & Business Analysis"],
    problem: "Let staff request leave and time corrections from their phone instead of paperwork.",
    solution: "A focused mobile app for leave and time-correction requests, with manager review, comments and one-tap accept or reject.",
    tech: [],
    year: null,
    image: shot("iom-leave-app", "time-correction", "IOM leave app time-correction request screen on a phone"),
    gallery: [shot("iom-leave-app", "approvals", "IOM leave app manager approvals with accept and reject actions")],
  },
  {
    slug: "active-care",
    title: "Active Care",
    client: null,
    location: null,
    services: ["Custom Software Development", "UI/UX Design"],
    problem: "Give care teams one place for admissions, safeguarding and compliance records.",
    solution:
      "Healthcare software for residential care: pre-admission and admission workflows, safeguarding, health & safety, incident management, medication records and document review with full history.",
    tech: [],
    year: null,
    image: shot("active-care", "dashboard", "Active Care dashboard with admission, safeguarding, incident and medication modules"),
  },
  {
    slug: "bravio-agency",
    title: "Bravio — Digital Agency Website",
    client: "Bravio",
    location: null,
    services: ["Web Design", "UI/UX Design", "Creative"],
    problem: "Show a digital agency’s work, services and pricing in a way that wins calls.",
    solution: "A light, editorial agency website with case-study grid, transparent pricing, feature highlights and a clear “Book a call” path.",
    tech: [],
    year: null,
    image: shot("bravio-agency", "about", "Bravio agency website about page: “We take pride in delivering exceptional results”"),
    gallery: [
      shot("bravio-agency", "work", "Bravio website case-study grid: “How we’ve helped other businesses”"),
      shot("bravio-agency", "pricing", "Bravio website pricing plans"),
      shot("bravio-agency", "features", "Bravio website features section"),
      shot("bravio-agency", "services", "Bravio website services list"),
      shot("bravio-agency", "home", "Bravio website homepage"),
    ],
  },
  {
    slug: "active-saas",
    title: "Active — SaaS Website",
    client: "Active",
    location: null,
    services: ["Web Design", "UI/UX Design", "Product Design"],
    problem: "Explain a lead-management SaaS product quickly and turn visitors into sign-ups.",
    solution: "A bright product website — “Perfect every step for extraordinary growth” — with feature blocks, social proof and an email sign-up call to action.",
    tech: [],
    year: null,
    image: shot("active-saas", "hero", "Active SaaS website hero on a laptop: “Perfect every step for extraordinary growth”"),
    gallery: [shot("active-saas", "cta", "Active SaaS website sign-up section and footer")],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const moreProjects = projects.filter((p) => !p.featured);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const projectNumber = (slug: string) => String(projects.findIndex((p) => p.slug === slug) + 1).padStart(2, "0");
