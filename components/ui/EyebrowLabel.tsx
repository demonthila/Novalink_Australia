import { cn } from "@/lib/utils";

/** Small uppercase technical label, e.g. "02 / CAPABILITIES". */
export function EyebrowLabel({
  index,
  children,
  tone = "light",
  as: Tag = "p",
  className,
}: {
  as?: "p" | "h2";
  index?: string;
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <Tag className={cn("text-label flex items-center gap-2.5", tone === "light" ? "text-grey-2" : "text-blue-light/90", className)}>
      {index && (
        <>
          <span className={tone === "light" ? "text-blue-ink" : "text-white"}>{index}</span>
          <span aria-hidden>/</span>
        </>
      )}
      <span>{children}</span>
    </Tag>
  );
}
