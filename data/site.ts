export const site = {
  name: "NovaLink Innovations",
  legalName: "Novalink Innovations Pvt Ltd",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://novalinkinnovations.com",
  title: "NovaLink Innovations | Software Development & UI/UX Design, Melbourne",
  description:
    "NovaLink Innovations designs and builds custom software, web applications and digital products for businesses in Australia and around the world.",
  tagline: "Helping businesses innovate & grow.",
  email: "info@novalinkinnovations.com",
  phone: "+61 450 679 814",
  phoneHref: "tel:+61450679814",
  phoneLk: "+94 76 006 8914",
  phoneLkHref: "tel:+94760068914",
  locations: ["Melbourne, Australia", "Sri Lanka"],
  /** Profiles linked from the current novalinkinnovations.com. */
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/novalink-innovations" },
    { label: "Facebook", href: "https://web.facebook.com/people/Novalink-innovations" },
    { label: "WhatsApp", href: "https://wa.me/94760068914" },
  ],
  clutch: { rating: "4.9", reviews: 24 },
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Process", href: "/#process" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
] as const;

/** Figures published on novalinkinnovations.com (“achievements”). */
export const metrics = [
  { value: 50, suffix: "+", label: "Clients served", note: "Global and local" },
  { value: 75, suffix: "+", label: "Projects delivered", note: "Software, web and brand" },
  { value: 5, suffix: "", label: "Countries", note: "AU · LK · IN · DK · UK" },
  { value: 7, suffix: "+", label: "Years experience", note: "In IT and UX design" },
  { value: 3, suffix: "×", label: "Industry nominations", note: "Recognition" },
  { value: 5, suffix: "×", label: "Tech partnerships", note: "Strategic collaborations" },
] as const;

/** Client logos supplied by NovaLink (trimmed; Dela's wordmark recoloured for light backgrounds). */
export const clients: { name: string; logo: string; width: number; height: number; scale?: number }[] = [
  { name: "IOM World", logo: "/clients/iom-world.png", width: 504, height: 288, scale: 1.35 },
  { name: "Dela", logo: "/clients/dela.png", width: 640, height: 257 },
  { name: "LK Domain Registry", logo: "/clients/lk-domain-registry.png", width: 646, height: 117 },
  { name: "Foxmindz", logo: "/clients/foxmindz.png", width: 800, height: 175 },
  { name: "Drogo Creative", logo: "/clients/drogo-creative.png", width: 369, height: 63 },
];

/** Client logo by company name (used to badge testimonials). */
export const clientLogo = (company: string) => clients.find((c) => company.startsWith(c.name));

/** Stack supplied by NovaLink (project brief). Only list what the team actually ships with. */
export const technologies = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript"] },
  { group: "Mobile", items: ["Flutter"] },
  { group: "Backend", items: ["Node.js", "PHP", "Python"] },
  { group: "Cloud", items: ["AWS", "Azure"] },
  { group: "Database", items: ["PostgreSQL", "MySQL"] },
  { group: "Design", items: ["Figma"] },
] as const;

/**
 * Where NovaLink works (confirmed by NovaLink). Melbourne is the main hub.
 * `label` positions the map label relative to its pin to avoid overlaps.
 */
export const presence = [
  { country: "Australia", city: "Melbourne", code: "AU", lat: -37.81, lng: 144.96, role: "Main hub", hub: true, label: "left" },
  { country: "Sri Lanka", city: "Colombo", code: "LK", lat: 6.93, lng: 79.86, role: "Team hub", hub: true, label: "right" },
  { country: "India", city: "Bengaluru", code: "IN", lat: 12.97, lng: 77.59, role: "Client work", hub: false, label: "left" },
  { country: "Denmark", city: "Copenhagen", code: "DK", lat: 55.68, lng: 12.57, role: "Client work", hub: false, label: "right" },
  { country: "United Kingdom", city: "London", code: "UK", lat: 51.5, lng: -0.12, role: "Client work", hub: false, label: "below" },
  { country: "Scotland", city: "Edinburgh", code: "SCO", lat: 55.95, lng: -3.19, role: "Client work", hub: false, label: "above" },
] as const satisfies readonly {
  country: string;
  city: string;
  code: string;
  lat: number;
  lng: number;
  role: string;
  hub: boolean;
  label: "left" | "right" | "above" | "below";
}[];

export type Place = (typeof presence)[number];
