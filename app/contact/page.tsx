import { pageMeta, breadcrumbJsonLd, JsonLd } from "@/lib/seo";
import { site } from "@/data/site";
import { projectTypes } from "@/lib/contact";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata = pageMeta({
  title: "Contact — Start a Software or Design Project",
  description: "Start a project with NovaLink Innovations. Email info@novalinkinnovations.com or call +61 450 679 814 (Melbourne).",
  path: "/contact",
});

const fromSlug: Record<string, (typeof projectTypes)[number]> = {
  "custom-software": "Custom Software",
  "web-development": "Website",
  "digital-marketing": "Digital Marketing",
  "branding-seo": "Branding / SEO",
};

export default async function ContactPage(props: PageProps<"/contact">) {
  const sp = await props.searchParams;
  const type = typeof sp.type === "string" ? fromSlug[sp.type] : undefined;

  const details = [
    { k: "Email", v: site.email, href: `mailto:${site.email}` },
    { k: "Australia", v: site.phone, href: site.phoneHref },
    { k: "Sri Lanka", v: site.phoneLk, href: site.phoneLkHref },
    { k: "WhatsApp", v: "Message us", href: site.socials.find((s) => s.label === "WhatsApp")!.href },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Contact", path: "/contact" }])} />
      <section className="relative isolate overflow-hidden pt-32 pb-24 md:pt-44 md:pb-32">
        <div aria-hidden className="bg-grid absolute inset-0 -z-10 opacity-60 [mask-image:linear-gradient(to_bottom,#000,transparent_60%)]" />
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <EyebrowLabel>Contact</EyebrowLabel>
            <AnimatedHeading
              as="h1"
              immediate
              className="text-hero mt-6 font-medium"
              lines={["Let’s create", { text: "what’s next.", className: "text-blue" }]}
            />
            <p className="text-lede mt-8 max-w-md text-grey-2">
              Tell us about your project. We’ll come back with questions, ideas and a clear next step.
            </p>
            <dl className="mt-14 border-t border-line">
              {details.map((d) => (
                <div key={d.k} className="grid grid-cols-[7.5rem_1fr] items-center border-b border-line py-4">
                  <dt className="text-label text-grey-2">{d.k}</dt>
                  <dd>
                    <a
                      href={d.href}
                      {...(d.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                      className="link-u inline-flex min-h-11 items-center break-all"
                    >
                      {d.v}
                    </a>
                  </dd>
                </div>
              ))}
              <div className="grid grid-cols-[7.5rem_1fr] items-center border-b border-line py-4">
                <dt className="text-label text-grey-2">Locations</dt>
                <dd className="py-2.5">Melbourne, Australia · Sri Lanka</dd>
              </div>
            </dl>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <ContactForm initialType={type} />
          </div>
        </div>
      </section>
    </>
  );
}
