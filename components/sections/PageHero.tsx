import Link from "next/link";
import { AnimatedHeading, type HeadingLine } from "@/components/ui/AnimatedHeading";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";

/** Shared inner-page hero with a visible breadcrumb. */
export function PageHero({
  label,
  lines,
  intro,
  crumb,
  children,
}: {
  label: string;
  lines: HeadingLine[];
  intro?: string;
  crumb: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line pt-32 pb-16 md:pt-44 md:pb-24">
      <div aria-hidden className="bg-grid absolute inset-0 -z-10 opacity-60 [mask-image:linear-gradient(to_bottom,#000,transparent)]" />
      <div aria-hidden className="halftone absolute top-0 right-0 -z-10 h-full w-1/2 opacity-30 [mask-image:radial-gradient(circle_at_80%_20%,#000,transparent_60%)]" />
      <div className="container-x">
        <nav aria-label="Breadcrumb" className="text-label text-grey-2">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="link-u hover:text-ink">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-ink">
              {crumb}
            </li>
          </ol>
        </nav>
        <EyebrowLabel className="mt-10">{label}</EyebrowLabel>
        <AnimatedHeading as="h1" immediate className="text-hero mt-6 max-w-[15ch] font-medium" lines={lines} />
        {intro && (
          <p className="css-fade text-lede mt-8 max-w-xl text-grey-2" style={{ animationDelay: "0.3s" }}>
            {intro}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
