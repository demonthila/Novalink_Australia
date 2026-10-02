import { MAP_H, worldDots } from "@/lib/world-map";
import { WorldMapInteractive } from "./WorldMapInteractive";

export function WorldMap() {
  const { width, pins } = worldDots();
  return <WorldMapInteractive dots="/world-dots.svg" width={width} height={MAP_H} pins={pins} />;
}
