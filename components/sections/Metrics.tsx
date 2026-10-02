import { metrics } from "@/data/site";
import { MetricCounter } from "@/components/ui/MetricCounter";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";

/** Navy evidence band — every figure is published on novalinkinnovations.com. */
export function Metrics({ heading = "Results, measured in delivery." }: { heading?: string }) {
  return (
    <section aria-labelledby="metrics-h" className="on-navy relative isolate overflow-hidden bg-navy py-24 text-white md:py-32">
      <div aria-hidden className="bg-grid-inverse absolute inset-0 -z-10 opacity-60" />
      <div aria-hidden className="absolute -top-1/2 right-0 -z-10 size-[60vw] rounded-full bg-[radial-gradient(circle,rgb(37_140_255/0.22),transparent_60%)]" />
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <EyebrowLabel tone="dark">By the numbers</EyebrowLabel>
            <h2 id="metrics-h" className="text-headline mt-6 max-w-[16ch] font-medium">
              {heading}
            </h2>
          </div>
          <p className="max-w-xs text-ice/70">Seven years of designing and building for clients in Australia and around the world.</p>
        </div>
        <Stagger as="dl" gap={0.09} className="mt-16 grid grid-cols-2 border-t border-line-inverse md:mt-20 lg:grid-cols-3">
          {metrics.map((m, i) => (
            <StaggerItem
              key={m.label}
              className={`group flex flex-col-reverse justify-end gap-4 border-b border-line-inverse py-8 md:py-12 ${
                i % 2 ? "border-l pl-5 md:pl-8" : "pr-5"
              } ${i % 3 ? "lg:border-l lg:pl-8" : "lg:border-l-0 lg:pl-0"}`}
            >
              <dt>
                <span className="block font-medium">{m.label}</span>
                <span className="text-label mt-1 block text-[0.62rem] text-ice/60">{m.note}</span>
              </dt>
              <dd className="text-metric font-medium">
                <MetricCounter value={m.value} suffix={m.suffix} />
              </dd>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
