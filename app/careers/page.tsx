import { ArrowDownRight } from "lucide-react";
import { pageMeta, breadcrumbJsonLd, JsonLd } from "@/lib/seo";
import { positions } from "@/data/careers";
import { PageHero } from "@/components/sections/PageHero";
import { ApplicationForm } from "@/components/sections/ApplicationForm";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata = pageMeta({
  title: "Careers — Join NovaLink in Melbourne & Sri Lanka",
  description: "Open roles at NovaLink Innovations: design, development, marketing and project management in Melbourne, Sri Lanka and remote.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Careers", path: "/careers" }])} />
      <PageHero
        crumb="Careers"
        label="Careers"
        lines={["Make an impact through", { text: "design & development.", className: "text-blue" }]}
        intro="Join a team helping businesses innovate and grow, working across Melbourne and Sri Lanka."
      />

      <section aria-labelledby="roles-h" className="section-y">
        <div className="container-x">
          <SectionHeader
            id="roles-h"
            index="01"
            label="Open positions"
            size="headline"
            lines={[`${positions.length} roles open now.`]}
          />
          <ul className="mt-14 border-t border-line">
            {positions.map((p) => (
              <li key={p.role} className="border-b border-line">
                <a href="#apply" className="group grid gap-3 py-8 md:grid-cols-12 md:items-center md:py-10">
                  <span className="md:col-span-6">
                    <span className="text-title block font-medium transition-colors group-hover:text-blue">{p.role}</span>
                    <span className="mt-2 block max-w-xl text-grey-2">{p.summary}</span>
                  </span>
                  <span className="text-sm md:col-span-2">
                    <span className="text-label block text-grey-2">Location</span>
                    {p.location}
                  </span>
                  <span className="text-sm md:col-span-2">
                    <span className="text-label block text-grey-2">Type</span>
                    {p.type}
                  </span>
                  <span className="inline-flex min-h-11 items-center gap-2 font-medium text-blue-ink md:col-span-2 md:justify-end">
                    <span className="link-u">Apply</span>
                    <ArrowDownRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="apply" aria-labelledby="apply-h" className="section-y scroll-mt-20 border-t border-line bg-white">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader id="apply-h" index="02" label="Apply" size="headline" lines={["Join our team."]} />
            <p className="text-lede mt-6 text-grey-2">Send your details and CV. Applying for a role that isn’t listed? Tell us in your cover letter.</p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <ApplicationForm />
          </div>
        </div>
      </section>
    </>
  );
}
