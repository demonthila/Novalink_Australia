import type { NextConfig } from "next";

/** Legacy static-site URLs → new routes (permanent, to preserve rankings). */
const legacy: [string, string][] = [
  ["/index.html", "/"],
  ["/index-light.html", "/"],
  ["/about-us-light.html", "/about"],
  ["/about-us.html", "/about"],
  ["/service-details-light.html", "/services"],
  ["/portfolio-col-3-light.html", "/#work"],
  ["/portfolio-masonry-light.html", "/#work"],
  ["/portfolio-details-gallery-light.html", "/#work"],
  ["/career.html", "/careers"],
  ["/job-application-form.html", "/careers#apply"],
  ["/contact-us-light.html", "/contact"],
  ["/faq-light.html", "/contact"],
];

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return [
      ...legacy.map(([source, destination]) => ({ source, destination, permanent: true })),
      { source: "/work", destination: "/#work", permanent: true },
      { source: "/projects", destination: "/#work", permanent: true },
    ];
  },
};

export default nextConfig;
