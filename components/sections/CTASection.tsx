import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Button } from "@/components/ui/Button";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";

/** Dark navy closing CTA over a drifting data grid. */
export function CTASection({
  eyebrow = "Have a project in mind?",
  lines = ["Let’s build something", { text: "that matters.", className: "text-blue-light" }],
  body = "Tell us what you’re working on and let’s explore how NovaLink can bring it to life.",
  cta = "Start a Conversation",
}: {
  eyebrow?: string;
  lines?: Parameters<typeof AnimatedHeading>[0]["lines"];
  body?: string;
  cta?: string;
}) {
  return (
    <section aria-labelledby="cta-h" className="on-navy relative isolate overflow-hidden bg-navy py-28 text-white md:py-44">
      <div aria-hidden className="bg-grid-inverse grid-drift absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" />
      <div aria-hidden className="absolute top-1/2 left-1/2 -z-10 h-[70%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgb(23_107_255/0.35),transparent_65%)]" />
      <div aria-hidden className="absolute inset-0 -z-10">
        {[18, 38, 62, 82].map((top, i) => (
          <span
            key={top}
            className="data-run absolute left-0 h-px w-24 bg-gradient-to-r from-transparent via-blue-light to-transparent"
            style={{ top: `${top}%`, animationDelay: `${i * 1.7}s`, animationDuration: `${6 + i}s` }}
          />
        ))}
      </div>
      <div className="container-x flex flex-col items-start md:items-center md:text-center">
        <EyebrowLabel tone="dark">{eyebrow}</EyebrowLabel>
        <AnimatedHeading id="cta-h" className="text-hero mt-8 max-w-[14ch] font-medium" lines={lines} />
        <p className="text-lede mt-8 max-w-xl text-ice/75">{body}</p>
        <div className="mt-12">
          <Button href="/contact" size="xl" variant="inverse" magnetic={0.35}>
            {cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
