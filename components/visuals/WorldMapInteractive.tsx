"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Place } from "@/data/site";
import { cn, EASE } from "@/lib/utils";

export type MapPin = Place & { x: number; y: number };

/** Dotted map with arcs drawn out from the Melbourne hub, plus a hover-synced location list. */
export function WorldMapInteractive({ dots, width, height, pins }: { dots: string; width: number; height: number; pins: MapPin[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  const hub = pins.find((p) => p.code === "AU")!;

  // Small screens: crop to the region that holds every pin (UK → Australia).
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const on = () => setCompact(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  const xs = pins.map((p) => p.x);
  const ys = pins.map((p) => p.y);
  const view = compact
    ? (() => {
        const x0 = Math.max(0, Math.min(...xs) - 26);
        const x1 = Math.min(width, Math.max(...xs) + 10);
        const y0 = Math.max(0, Math.min(...ys) - 12);
        const y1 = Math.min(height, Math.max(...ys) + 10);
        return `${x0} ${y0} ${x1 - x0} ${y1 - y0}`;
      })()
    : `0 0 ${width} ${height}`;
  const show = inView || reduce;

  const arc = (b: MapPin) => {
    const mx = (hub.x + b.x) / 2;
    const my = Math.min(hub.y, b.y) - Math.abs(hub.x - b.x) * 0.35 - 4;
    return `M${hub.x} ${hub.y} Q${mx} ${my} ${b.x} ${b.y}`;
  };
  const labelPos = (p: MapPin) =>
    p.label === "left"
      ? { x: p.x - 2, y: p.y + 0.7, anchor: "end" as const }
      : p.label === "right"
        ? { x: p.x + 2, y: p.y + 0.7, anchor: "start" as const }
        : p.label === "above"
          ? { x: p.x - 1.5, y: p.y - 2.4, anchor: "end" as const }
          : { x: p.x - 1.5, y: p.y + 3.4, anchor: "end" as const };

  return (
    <div ref={ref} className="grid gap-10 lg:grid-cols-12 lg:items-center">
      <div className="relative lg:col-span-9">
        <svg
          viewBox={view}
          className="h-auto w-full"
          role="img"
          aria-label={`World map: NovaLink's main hub in Melbourne, Australia, with work in ${pins
            .filter((p) => p.code !== "AU")
            .map((p) => p.country)
            .join(", ")}.`}
        >
          <defs>
            <linearGradient id="wm-route" x1="0" x2="1">
              <stop offset="0" stopColor="#65b8ff" />
              <stop offset="1" stopColor="#176bff" />
            </linearGradient>
            <radialGradient id="wm-glow">
              <stop offset="0" stopColor="#258cff" stopOpacity=".45" />
              <stop offset="1" stopColor="#258cff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <image href={dots} width={width} height={height} opacity="0.2" />

          {pins
            .filter((p) => p.code !== "AU")
            .map((p, i) => {
              const d = arc(p);
              const on = active === null || active === p.code || active === "AU";
              return (
                <g key={p.code} style={{ opacity: on ? 1 : 0.2, transition: "opacity .3s" }}>
                  <motion.path
                    d={d}
                    fill="none"
                    stroke="url(#wm-route)"
                    strokeWidth={active === p.code ? 0.45 : 0.28}
                    strokeLinecap="round"
                    initial={{ pathLength: reduce ? 1 : 0 }}
                    animate={{ pathLength: show ? 1 : 0 }}
                    transition={{ duration: 1.2, ease: EASE, delay: 0.3 + i * 0.18 }}
                  />
                  {!reduce && (
                    <path
                      d={d}
                      pathLength={100}
                      fill="none"
                      stroke="#258cff"
                      strokeWidth="0.7"
                      strokeLinecap="round"
                      className="route-packet"
                      style={{ animationDelay: `${1.6 + i * 0.7}s`, animationDuration: "4.5s", opacity: show ? 1 : 0 }}
                    />
                  )}
                </g>
              );
            })}

          {pins.map((p, i) => {
            const l = labelPos(p);
            const on = active === p.code;
            return (
              <motion.g
                key={p.code}
                initial={reduce ? false : { opacity: 0, scale: 0.4 }}
                animate={show ? { opacity: 1, scale: 1 } : undefined}
                transition={{ duration: 0.5, ease: EASE, delay: p.hub ? 0.1 : 1 + i * 0.15 }}
                style={{ transformOrigin: `${p.x}px ${p.y}px`, transformBox: "view-box" }}
                onPointerEnter={() => setActive(p.code)}
                onPointerLeave={() => setActive(null)}
                className="cursor-default"
              >
                <circle cx={p.x} cy={p.y} r={p.hub ? 6 : 4} fill="url(#wm-glow)" />
                {(p.hub || on) && <circle cx={p.x} cy={p.y} r="1.6" fill="#258cff" className="node-pulse" />}
                <circle cx={p.x} cy={p.y} r={p.hub ? 1.25 : 0.85} fill={p.hub ? "#176bff" : "#fff"} stroke="#176bff" strokeWidth={p.hub ? 0 : 0.45} />
                <text
                  x={l.x}
                  y={l.y}
                  textAnchor={l.anchor}
                  fontSize={p.code === "AU" ? 2.4 : 2}
                  fontWeight={p.hub || on ? 600 : 500}
                  fill={on || p.code === "AU" ? "#0f5be6" : "#07101f"}
                  fontFamily="var(--font-geist-sans)"
                  style={{ transition: "fill .3s" }}
                >
                  {p.country}
                </text>
              </motion.g>
            );
          })}
        </svg>
      </div>

      <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-3 lg:col-span-3 lg:grid-cols-1">
        {pins.map((p, i) => (
          <motion.li
            key={p.code}
            initial={reduce ? false : { opacity: 0, x: 16 }}
            animate={show ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.45, ease: EASE, delay: 0.4 + i * 0.08 }}
          >
            <button
              type="button"
              onPointerEnter={() => setActive(p.code)}
              onPointerLeave={() => setActive(null)}
              onFocus={() => setActive(p.code)}
              onBlur={() => setActive(null)}
              className={cn(
                "flex min-h-14 w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors duration-300",
                active === p.code ? "bg-ice" : "bg-white",
              )}
            >
              <span>
                <span className="block font-medium">{p.country}</span>
                <span className="text-label block text-[0.6rem] text-grey-2">
                  {p.city} · {p.role}
                </span>
              </span>
              <span
                aria-hidden
                className={cn("size-2 shrink-0 rounded-full", p.hub ? "bg-blue" : "border border-blue", active === p.code && "bg-blue")}
              />
            </button>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
