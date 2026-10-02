import { pageMeta, breadcrumbJsonLd, JsonLd } from "@/lib/seo";
import { services } from "@/data/services";
import { PageHero } from "@/components/sections/PageHero";
import { Metrics } from "@/components/sections/Metrics";
import { CTASection } from "@/components/sections/CTASection";
import { GlobalPresence } from "@/components/sections/GlobalPresence";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/ui/Reveal";
import { InfrastructureArt } from "@/components/visuals/InfrastructureArt";
import { pad } from "@/lib/utils";

export const metadata = pageMeta({
  title: "About NovaLink — Software & Design Team in Melbourne and Sri Lanka",
  description:
    "NovaLink Innovations is a software development and UX design company working from Melbourne and Sri Lanka, with 75+ projects for 50+ clients in 5 countries.",
  path: "/about",
});

const thinking = [
  { title: "Forward-thinking", body: "We look for solutions that open new possibilities, not just the obvious fix." },
  { title: "Thoughtful execution", body: "Clear strategy and efficient delivery at every step drive long-term success." },
  { title: "Close partnership", body: "We work alongside clients to build lasting relationships and shared goals." },
  { title: "Users at the centre", body: "Every product decision is tested against the people who will use it." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "About", path: "/about" }])} />
      <PageHero
        crumb="About"
        label="About NovaLink"
        lines={["Small enough to move fast.", { text: "Experienced enough to think big.", className: "text-blue" }]}
      />

      <section aria-labelledby="who-h" className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeader id="who-h" index="01" label="Who we are" size="headline" lines={["Creativity, dedication", "and results."]} />
            <Reveal className="mt-10 space-y-6">
              <p className="text-lede text-grey-2">
                NovaLink Innovations is a software development and digital solutions company. We design and build custom
                software, websites and digital products for businesses that want to grow.
              </p>
              <p className="text-lede text-grey-2">
                Our team works from Melbourne and Sri Lanka, combining user-centred design with engineering, branding and
                digital marketing — so clients get one partner from strategy to launch.
              </p>
            </Reveal>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg lg:col-span-5 lg:col-start-8 lg:aspect-auto">
            <InfrastructureArt className="absolute inset-0" />
          </div>
        </div>
      </section>

      <section aria-labelledby="story-h" className="section-y border-t border-line bg-white">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader id="story-h" index="02" label="Our story" size="headline" lines={["Built on trust."]} />
          </div>
          <div className="space-y-8 lg:col-span-7 lg:col-start-6">
            <Reveal>
              <p className="text-title font-medium">
                Our journey is driven by creativity, dedication and results. The trust we’ve earned and the milestones
                we’ve reached reflect the value we deliver to clients.
              </p>
            </Reveal>
            <p className="text-lede text-grey-2">
              Over seven years in IT and UX design, that work has grown to 75+ projects for 50+ clients across five
              countries — from HR platforms and inventory systems to mobile apps and brand-led websites.
            </p>
          </div>
        </div>
      </section>

      <section aria-label="Mission" className="on-navy bg-navy text-white">
        <div className="container-x grid gap-10 py-24 md:grid-cols-12 md:py-32">
          <p className="text-label text-blue-light md:col-span-3">03 / Mission</p>
          <p className="text-display font-medium md:col-span-9">
            Helping businesses <span className="text-blue-light">innovate & grow</span> through design and development.
          </p>
        </div>
      </section>

      <section aria-labelledby="think-h" className="section-y">
        <div className="container-x">
          <SectionHeader id="think-h" index="04" label="How we think" lines={["Principles we", { text: "work by.", className: "text-blue" }]} />
          <ol className="mt-14 grid border-t border-line md:grid-cols-2 lg:grid-cols-4">
            {thinking.map((t, i) => (
              <li key={t.title} className="border-b border-line py-8 md:pr-8 lg:border-b-0 lg:border-l lg:px-6 lg:first:border-l-0 lg:first:pl-0">
                <p className="text-label text-blue-ink">{pad(i + 1)}</p>
                <h3 className="text-title mt-8 font-medium">{t.title}</h3>
                <p className="mt-3 text-grey-2">{t.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Metrics heading="What seven years looks like." />
      <GlobalPresence />

      <section aria-labelledby="cap-h" className="section-y">
        <div className="container-x">
          <SectionHeader id="cap-h" index="05" label="Capabilities" size="headline" lines={["One team, four disciplines."]} />
          <ul className="mt-14 border-t border-line">
            {services.map((s) => (
              <li key={s.slug} className="grid gap-4 border-b border-line py-7 md:grid-cols-12 md:items-center">
                <span className="text-label text-blue-ink md:col-span-1">{s.number}</span>
                <h3 className="text-title font-medium md:col-span-5">{s.title}</h3>
                <p className="text-grey-2 md:col-span-4">{s.capabilities.join(" · ")}</p>
                <div className="md:col-span-2 md:text-right">
                  <ArrowLink href={`/services#${s.slug}`} className="text-sm text-blue-ink">
                    Details
                  </ArrowLink>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection />
    </>
  );
}
