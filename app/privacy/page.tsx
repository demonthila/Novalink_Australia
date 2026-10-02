import { pageMeta } from "@/lib/seo";
import { site } from "@/data/site";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";

export const metadata = pageMeta({ title: "Privacy Policy", description: "Privacy Policy for NovaLink Innovations.", path: "/privacy" });

export default function Page() {
  return (
    <section className="container-x max-w-3xl pt-36 pb-32 md:pt-44">
      <EyebrowLabel>Legal</EyebrowLabel>
      <h1 className="text-display mt-6 font-medium">Privacy Policy</h1>
      <p className="mt-10 rounded-md border border-dashed border-line-strong bg-white p-5 text-grey-2">
        Placeholder: publish NovaLink’s approved Privacy Policy here. For questions in the meantime, email{" "}
        <a className="link-u text-blue-ink" href={`mailto:${site.email}`}>
          {site.email}
        </a>
        .
      </p>
    </section>
  );
}
