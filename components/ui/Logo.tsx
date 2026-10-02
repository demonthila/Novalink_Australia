import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The official NovaLink logo (supplied PNG, 221×48).
 * `tone="light"` uses the same artwork with the wordmark recoloured for navy backgrounds.
 */
export function Logo({ tone = "dark", className, priority }: { tone?: "dark" | "light"; className?: string; priority?: boolean }) {
  return (
    <Image
      src={tone === "light" ? "/brand/novalink-logo-light.png" : "/brand/novalink-logo.png"}
      alt="NovaLink Innovations"
      width={221}
      height={48}
      priority={priority}
      unoptimized
      className={cn("h-8 w-auto md:h-9", className)}
    />
  );
}
