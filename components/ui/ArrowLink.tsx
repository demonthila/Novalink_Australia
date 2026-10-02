import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ArrowLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={cn("group inline-flex min-h-11 items-center gap-2 font-medium", className)}>
      <span className="link-u pb-0.5">{children}</span>
      <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}
