import DottedMap from "dotted-map";
import { presence } from "@/data/site";

export const MAP_H = 90;
let cache: ReturnType<typeof build> | null = null;

function build() {
  const map = new DottedMap({ height: MAP_H, grid: "diagonal" });
  const svg = map.getSVG({ radius: 0.24, color: "#07101f", shape: "circle", backgroundColor: "transparent" });
  const width = Number(/viewBox="0 0 ([\d.]+)/.exec(svg)?.[1] ?? 178);
  const pins = presence.map((p) => {
    const pin = map.getPin({ lat: p.lat, lng: p.lng });
    return { ...p, x: pin?.x ?? 0, y: pin?.y ?? 0 };
  });
  return { svg, width, pins };
}

/** Built once per server process: projected pins + the dotted world SVG. */
export function worldDots() {
  return (cache ??= build());
}
