import type { Metadata } from "next";
import { site } from "@/data/site";

export function pageMeta({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | NovaLink Innovations`, description, url: path },
    twitter: { title: `${title} | NovaLink Innovations`, description },
  };
}

export const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  email: site.email,
  telephone: site.phone,
  logo: `${site.url}/brand/novalink-logo.png`,
  slogan: site.tagline,
  address: [
    { "@type": "PostalAddress", addressLocality: "Melbourne", addressRegion: "VIC", addressCountry: "AU" },
    { "@type": "PostalAddress", addressCountry: "LK" },
  ],
  sameAs: site.socials.filter((s) => s.label !== "WhatsApp").map((s) => s.href),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: site.clutch.rating,
    reviewCount: site.clutch.reviews,
    bestRating: "5",
  },
};

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path}`,
    })),
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
