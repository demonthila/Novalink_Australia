import { cn } from "@/lib/utils";
import { AnimatedHeading, type HeadingLine } from "./AnimatedHeading";
import { EyebrowLabel } from "./EyebrowLabel";
import { DrawLine } from "./DrawLine";

/** Label + editorial heading + optional intro, laid out on the 12-col grid. */
export function SectionHeader({
  id,
  index,
  label,
  lines,
  intro,
  tone = "light",
  size = "display",
  aside,
  className,
}: {
  id: string;
  index?: string;
  label: string;
  lines: HeadingLine[];
  intro?: React.ReactNode;
  tone?: "light" | "dark";
  size?: "display" | "headline";
  aside?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("grid gap-8 lg:grid-cols-12 lg:items-end", className)}>
      <div className="lg:col-span-8">
        <DrawLine tone={tone} className="mb-6 w-16 bg-blue" />
        <EyebrowLabel index={index} tone={tone}>
          {label}
        </EyebrowLabel>
        <AnimatedHeading
          id={id}
          lines={lines}
          className={cn("mt-6 font-medium md:mt-8", size === "display" ? "text-display" : "text-headline")}
        />
      </div>
      {(intro || aside) && (
        <div className="lg:col-span-4 lg:pb-2">
          {intro && <p className={cn("text-lede max-w-md", tone === "light" ? "text-grey-2" : "text-ice/70")}>{intro}</p>}
          {aside}
        </div>
      )}
    </header>
  );
}
