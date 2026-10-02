import { site } from "@/data/site";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { RotatingWord } from "@/components/ui/RotatingWord";
import { Button } from "@/components/ui/Button";
import { HeroSystem } from "@/components/visuals/HeroSystem";
import { HeroBackdrop } from "./HeroBackdrop";

const fade = (d: number) => ({ style: { animationDelay: `${d}s` } });
const ticker = [
  "Custom Software",
  "Web Applications",
  "UI/UX Design",
  "SaaS Platforms",
  "Mobile Apps",
  "Branding",
  "SEO",
  "Digital Marketing",
];

export function Hero() {
  return (
    <section aria-labelledby="hero-h" className="relative isolate overflow-hidden pt-28 md:pt-36">
      <HeroBackdrop />

      <div className="container-x grid items-center gap-10 pb-12 lg:grid-cols-12 lg:gap-6 lg:pb-16">
        <div className="lg:col-span-7">
          <p {...fade(0.05)} className="css-fade inline-flex items-center gap-3 rounded-sm border border-line bg-white/70 py-1.5 pr-3 pl-1.5 backdrop-blur">
            <span aria-hidden className="relative flex size-5 items-center justify-center rounded-[3px] bg-blue">
              <span className="absolute size-2 animate-ping rounded-full bg-white/70" />
              <span className="relative size-1.5 rounded-full bg-white" />
            </span>
            <span className="text-label text-grey-2">
              Software <span className="text-blue-ink">•</span> Design <span className="text-blue-ink">•</span> Digital innovation
            </span>
          </p>

          <h1 id="hero-h" aria-label="We build digital products that move businesses forward." className="mt-7 text-[clamp(2.75rem,6.3vw,6.25rem)] leading-[0.98] font-medium tracking-[-0.045em] md:mt-9">
            <AnimatedHeading as="span" immediate delay={0.05} lines={["We build digital"]} />
            <span aria-hidden className="css-fade block" style={{ animationDelay: "0.2s" }}>
              <RotatingWord
                words={["products", "platforms", "experiences", "systems"]}
                className="bg-gradient-to-r from-blue to-blue-light bg-clip-text text-transparent"
              />
            </span>
            <AnimatedHeading as="span" immediate delay={0.25} lines={["that move businesses", { text: "forward.", className: "text-blue" }]} />
          </h1>

          <p {...fade(0.45)} className="css-fade text-lede mt-8 max-w-xl text-grey-2 md:mt-10">
            NovaLink Innovations partners with ambitious businesses to design and build scalable software, digital
            products and experiences that create measurable impact.
          </p>
          <div {...fade(0.55)} className="css-fade mt-9 flex flex-wrap gap-3">
            <Button href="/contact" size="lg">
              Start a Project
            </Button>
            <Button href="/#work" size="lg" variant="secondary" arrow="down-right">
              Explore Our Work
            </Button>
          </div>
        </div>
        <div {...fade(0.3)} className="css-fade mx-auto w-full max-w-[560px] lg:col-span-5 lg:max-w-none">
          <HeroSystem />
        </div>
      </div>

      {/* Capability ticker */}
      <div {...fade(0.65)} className="css-fade marquee relative overflow-hidden border-t border-line py-5" aria-hidden>
        <div className="marquee-track flex w-max items-center gap-10 [animation-duration:40s]">
          {[...ticker, ...ticker].map((t, i) => (
            <span key={i} className="flex items-center gap-10 text-[clamp(1.75rem,3.4vw,3rem)] leading-none font-medium tracking-[-0.04em]">
              <span className={i % 2 ? "text-ink" : "text-transparent [-webkit-text-stroke:1px_rgb(7_16_31/0.35)]"}>{t}</span>
              <span className="size-2.5 rotate-45 bg-blue" />
            </span>
          ))}
        </div>
      </div>

      <div {...fade(0.75)} className="css-fade border-y border-line bg-white/50 backdrop-blur">
        <dl className="container-x grid grid-cols-1 divide-y divide-line text-sm sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <div className="flex items-center gap-3 py-4 sm:pr-6">
            <dt className="text-label text-grey-2">Main hub</dt>
            <dd>Melbourne, Australia</dd>
          </div>
          <div className="flex items-center gap-3 py-4 sm:px-6">
            <dt className="text-label text-grey-2">Rated</dt>
            <dd>
              {site.clutch.rating}/5 on Clutch · {site.clutch.reviews} reviews
            </dd>
          </div>
          <div className="flex items-center gap-3 py-4 sm:pl-6">
            <dt className="sr-only">Reach</dt>
            <dd className="text-grey-2">Building digital solutions for businesses across Australia and beyond.</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
