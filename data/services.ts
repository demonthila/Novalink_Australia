export type Service = {
  slug: string;
  number: string;
  title: string;
  summary: string;
  capabilities: string[];
  what: string;
  problems: string[];
  process: string[];
  /** Project slugs from data/projects.ts */
  related: string[];
};

/** NovaLink's four service lines, as offered on novalinkinnovations.com. */
export const services: Service[] = [
  {
    slug: "custom-software",
    number: "01",
    title: "Custom Software Development",
    summary: "Scalable, secure, high-performance software built around how your business actually works.",
    capabilities: ["Web Applications", "Enterprise Systems", "SaaS Platforms", "System Integration"],
    what: "Bespoke web applications and business systems — designed with your team, engineered to grow with you.",
    problems: [
      "Off-the-shelf tools that force workarounds",
      "Processes running on spreadsheets and email",
      "Systems that don’t talk to each other",
    ],
    process: ["Business analysis", "Architecture & UX", "Iterative development", "Launch & support"],
    related: ["hr-management-system", "iom-hr-system", "zendirib-inventory"],
  },
  {
    slug: "web-development",
    number: "02",
    title: "Web Development & UX Design",
    summary: "Modern, responsive websites and web apps with interfaces people understand on first use.",
    capabilities: ["UI/UX Design", "Responsive Websites", "Web Applications", "Prototyping"],
    what: "Research-led interface design and front-end engineering, delivered by one team so what’s designed is what ships.",
    problems: [
      "Websites that are slow, dated or hard to update",
      "Products people struggle to use",
      "Ideas that need validating before a full build",
    ],
    process: ["User research", "Wireframes & prototypes", "Visual design", "Build & test"],
    related: ["news-marketing-agency", "learn-website-uk", "iom-leave-app"],
  },
  {
    slug: "digital-marketing",
    number: "03",
    title: "Digital Marketing",
    summary: "Data-driven campaigns that increase visibility, engagement and conversion.",
    capabilities: ["Social Media Marketing", "Paid Advertising", "Content Marketing", "Email Campaigns"],
    what: "Channel strategy, content and campaigns tied to goals you can measure.",
    problems: [
      "Marketing spend that’s hard to attribute",
      "Inconsistent social presence",
      "Traffic that doesn’t convert",
    ],
    process: ["Goals & audience", "Channel plan", "Content & campaigns", "Measure & optimise"],
    related: ["news-marketing-agency"],
  },
  {
    slug: "branding-seo",
    number: "04",
    title: "Branding & SEO",
    summary: "Memorable brand identities and the search visibility to match.",
    capabilities: ["Brand Identity", "SEO", "Logo Design", "Content Strategy"],
    what: "Identity systems and search optimisation that help a business look as capable as it is — and get found.",
    problems: [
      "A brand that looks smaller than the business",
      "Inconsistent visuals across touchpoints",
      "A website nobody finds in search",
    ],
    process: ["Brand strategy", "Identity design", "Technical SEO", "Content strategy"],
    related: ["iom-hr-system", "learn-website-uk", "news-marketing-agency"],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
