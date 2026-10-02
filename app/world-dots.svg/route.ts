import { worldDots } from "@/lib/world-map";

export const dynamic = "force-static";

/** The dotted world map as a static, long-cached SVG (keeps it out of the HTML payload). */
export function GET() {
  return new Response(worldDots().svg, {
    headers: { "Content-Type": "image/svg+xml", "Cache-Control": "public, max-age=31536000, immutable" },
  });
}
