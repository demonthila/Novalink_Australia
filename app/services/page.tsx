import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { pageMeta, breadcrumbJsonLd, JsonLd } from "@/lib/seo";
import { services } from "@/data/services";
import { getProject } from "@/data/projects";
import { site } from "@/data/site";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { pad } from "@/lib/utils";

export const metadata = pageMeta({
  title: "Services — Custom Software, Web & UX Design, Marketing, Branding & SEO",
  description:
    "Custom software development, web development and UX design, digital marketing, branding and SEO from NovaLink Innovations in Melbourne.",
  path: "/services",
});

const serviceLd = services.map((s) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: s.title,
  description: s.summary,
  serviceType: s.title,
  provider: { "@id": `${site.url}/#organization` },
  areaServed: ["AU", "Worldwide"],
  url: `${site.url}/services#${s.slug}`,
}));

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd([{ name: "Services", path: "/services" }]), ...serviceLd]} />
      <PageHero
        crumb="Services"
        label="Services"
        lines={["Technology expertise from", { text: "strategy to launch.", className: "text-blue" }]}
        intro="Four connected disciplines, delivered by one team so nothing gets lost between strategy, design and engineering."
      >
        <nav aria-label="Jump to service" className="mt-12 flex flex-wrap gap-2">
          {services.map((s) => (
            <a key={s.slug} href={`#${s.slug}`} className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-line-strong bg-white px-4 text-sm transition-colors hover:border-blue hover:text-blue">
              <span className="text-label text-blue-ink">{s.number}</span>
              {s.title}
            </a>
          ))}
        </nav>
      </PageHero>

      {services.map((s, idx) => (
        <section
          key={s.slug}
          id={s.slug}
          aria-labelledby={`${s.slug}-h`}
          className={`scroll-mt-20 border-b border-line py-24 md:py-32 ${idx % 2 ? "bg-white" : ""}`}
        >
          <div className="container-x grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <p className="text-label text-blue-ink">
                  {s.number} / {pad(services.length)}
                </p>
                <h2 id={`${s.slug}-h`} className="text-headline mt-6 font-medium">
                  {s.title}
                </h2>
                <p className="text-lede mt-6 max-w-md text-grey-2">{s.what}</p>
                <div className="mt-10">
                  <Button href={`/contact?type=${encodeURIComponent(s.slug)}`}>Discuss your project</Button>
                </div>
              </div>
            </div>

            <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line lg:col-span-7">
              <Reveal className="bg-paper p-7 md:p-10">
                <h3 className="text-label text-grey-2">Problems it solves</h3>
                <ul className="mt-5 space-y-3">
                  {s.problems.map((p) => (
                    <li key={p} className="flex gap-3 text-lg">
                      <span aria-hidden className="mt-3 size-1.5 shrink-0 bg-blue" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <div className="bg-paper p-7 md:p-10">
                <h3 className="text-label text-grey-2">Capabilities</h3>
                <ul className="mt-5 grid gap-x-6 sm:grid-cols-2">
                  {s.capabilities.map((c) => (
                    <li key={c} className="border-t border-line py-3 font-medium">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-paper p-7 md:p-10">
                <h3 className="text-label text-grey-2">Process</h3>
                <ol className="mt-5 grid gap-4 sm:grid-cols-4">
                  {s.process.map((p, i) => (
                    <li key={p}>
                      <span className="text-label text-blue-ink">{pad(i + 1)}</span>
                      <p className="mt-2 font-medium">{p}</p>
                    </li>
                  ))}
                </ol>
              </div>
              {s.related.length > 0 && (
                <div className="bg-paper p-7 md:p-10">
                  <h3 className="text-label text-grey-2">Related projects</h3>
                  <ul className="mt-3 divide-y divide-line">
                    {s.related.map((slug) => {
                      const p = getProject(slug);
                      if (!p) return null;
                      return (
                        <li key={slug}>
                          <Link href={`/projects/${slug}`} className="group flex min-h-12 items-center justify-between py-3">
                            <span className="link-u">{p.title}</span>
                            <ArrowUpRight aria-hidden className="size-4 text-grey-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      ))}

      <CTASection />
    </>
  );
}
