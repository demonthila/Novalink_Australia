"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { presence } from "@/data/site";

/* Orthogonal routes from the outer nodes into the core (viewBox 640×640, 40px grid). */
const routes = [
  "M80 120 H190 a20 20 0 0 1 20 20 V280 H240",
  "M560 80 V180 a20 20 0 0 1 -20 20 H360 V240",
  "M600 320 H400",
  "M520 560 V460 a20 20 0 0 0 -20 -20 H360 V400",
  "M120 520 H220 a20 20 0 0 0 20 -20 V360",
  "M40 320 H240",
  "M320 40 V240",
  "M320 600 V400",
  "M80 120 V60 a20 20 0 0 1 20 -20 H320",
  "M600 320 V100 a20 20 0 0 0 -20 -20 H560",
  "M120 520 V580 a20 20 0 0 0 20 20 H320",
];
const nodes = [
  { x: 80, y: 120, label: "Interface", pulse: true },
  { x: 560, y: 80 },
  { x: 600, y: 320, label: "API", pulse: true },
  { x: 520, y: 560 },
  { x: 120, y: 520, label: "Data", pulse: true },
  { x: 40, y: 320 },
  { x: 320, y: 40 },
  { x: 320, y: 600 },
];
/* 4×4 module grid inside the core: 2 = blue, 1 = ice (some blink), 0 = outline */
const cells = [2, 1, 0, 1, 1, 2, 1, 0, 0, 1, 2, 1, 1, 0, 1, 2];
const blink = new Set([1, 6, 9, 14]);
const PROBE_RANGE = 170;

/**
 * Hero graphic: a connected digital system. SVG + CSS animation (no WebGL).
 * Layers drift with the pointer; over the graphic, a probe links to nearby nodes.
 */
export function HeroSystem({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const [probe, setProbe] = useState<{ x: number; y: number } | null>(null);
  const mx = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });
  const my = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });
  const l1x = useTransform(mx, (v) => v * 6);
  const l1y = useTransform(my, (v) => v * 6);
  const l2x = useTransform(mx, (v) => v * 14);
  const l2y = useTransform(my, (v) => v * 14);
  const l3x = useTransform(mx, (v) => v * 28);
  const l3y = useTransform(my, (v) => v * 28);

  useEffect(() => {
    if (reduce || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = box.current?.getBoundingClientRect();
        if (!r) return;
        const x = ((e.clientX - r.left) / r.width) * 640;
        const y = ((e.clientY - r.top) / r.height) * 640;
        setProbe(x > -40 && x < 680 && y > -40 && y < 680 ? { x, y } : null);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [reduce, mx, my]);

  const near = probe
    ? nodes
        .map((n, i) => ({ i, d: Math.hypot(n.x - probe.x, n.y - probe.y) }))
        .filter((n) => n.d < PROBE_RANGE)
        .sort((a, b) => a.d - b.d)
        .slice(0, 2)
    : [];
  const lit = new Set(near.map((n) => n.i));

  return (
    <div aria-hidden className={className}>
      <div ref={box} className="relative aspect-square w-full">
        {/* Layer 1 — dot grid */}
        <motion.svg style={{ x: l1x, y: l1y }} viewBox="0 0 640 640" className="absolute inset-0 size-full">
          <defs>
            <pattern id="hs-dots" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1.1" fill="#07101f" fillOpacity="0.2" />
            </pattern>
            <radialGradient id="hs-fade">
              <stop offset="0.55" stopColor="#fff" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
            <mask id="hs-mask">
              <rect width="640" height="640" fill="url(#hs-fade)" />
            </mask>
          </defs>
          <rect width="640" height="640" fill="url(#hs-dots)" mask="url(#hs-mask)" transform="translate(-20 -20)" />
        </motion.svg>

        {/* Layer 2 — routes, packets, nodes, core, probe */}
        <motion.svg style={{ x: l2x, y: l2y }} viewBox="0 0 640 640" className="absolute inset-0 size-full overflow-visible">
          <defs>
            <radialGradient id="hs-glow">
              <stop offset="0" stopColor="#258cff" stopOpacity=".35" />
              <stop offset="1" stopColor="#258cff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="320" cy="320" r="230" fill="url(#hs-glow)" />
          <circle cx="320" cy="320" r="150" fill="none" stroke="#176bff" strokeOpacity=".25" strokeDasharray="2 10" className="spin-slow" />
          <g className="spin-rev">
            <circle cx="320" cy="320" r="118" fill="none" stroke="#176bff" strokeOpacity=".18" />
            <circle cx="438" cy="320" r="4" fill="#258cff" />
            <circle cx="202" cy="320" r="2.5" fill="#65b8ff" />
          </g>

          {routes.map((d, i) => (
            <g key={i}>
              <path d={d} fill="none" stroke="#176bff" strokeOpacity="0.28" strokeWidth="1.2" />
              <path
                d={d}
                pathLength={100}
                fill="none"
                stroke="#258cff"
                strokeWidth="2.4"
                strokeLinecap="round"
                className="route-packet"
                style={{ animationDelay: `${(i * 0.73) % 6}s`, animationDuration: `${4 + (i % 4)}s` }}
              />
            </g>
          ))}

          {/* Probe: cursor links into the system */}
          {probe &&
            near.map(({ i }) => (
              <line
                key={i}
                x1={probe.x}
                y1={probe.y}
                x2={nodes[i].x}
                y2={nodes[i].y}
                stroke="#176bff"
                strokeWidth="1.2"
                strokeDasharray="3 4"
                strokeOpacity=".8"
              />
            ))}
          {probe && near.length > 0 && (
            <g>
              <circle cx={probe.x} cy={probe.y} r="10" fill="none" stroke="#176bff" strokeOpacity=".5" />
              <circle cx={probe.x} cy={probe.y} r="3" fill="#176bff" />
            </g>
          )}

          {nodes.map((n, i) => {
            const on = lit.has(i);
            return (
              <g key={`${n.x}-${n.y}`}>
                {(n.pulse || on) && <circle cx={n.x} cy={n.y} r="9" fill="#258cff" className="node-pulse" />}
                <rect
                  x={n.x - (on ? 8 : 6)}
                  y={n.y - (on ? 8 : 6)}
                  width={on ? 16 : 12}
                  height={on ? 16 : 12}
                  rx="2"
                  fill={on ? "#176bff" : "#fff"}
                  stroke="#176bff"
                  strokeWidth="1.6"
                  style={{ transition: "all .25s" }}
                />
                {n.label && (
                  <text
                    x={n.x}
                    y={n.y - 17}
                    textAnchor="middle"
                    fontSize="11"
                    letterSpacing="1.5"
                    fill={on ? "#0f5be6" : "#5a6475"}
                    fontFamily="var(--font-geist-mono), monospace"
                  >
                    {n.label.toUpperCase()}
                  </text>
                )}
              </g>
            );
          })}

          <g>
            <rect x="240" y="240" width="160" height="160" rx="12" fill="#fff" stroke="#07101f" strokeOpacity="0.14" />
            {cells.map((c, i) => (
              <rect
                key={i}
                x={260 + (i % 4) * 32}
                y={260 + Math.floor(i / 4) * 32}
                width="24"
                height="24"
                rx="4"
                fill={c === 2 ? "#176bff" : c === 1 ? "#eaf5ff" : "#fff"}
                stroke={c === 0 ? "#07101f" : "none"}
                strokeOpacity="0.15"
                className={blink.has(i) ? "cell-blink" : undefined}
                style={blink.has(i) ? { animationDelay: `${[...blink].indexOf(i) * 1.2}s` } : undefined}
              />
            ))}
          </g>
        </motion.svg>

        {/* Layer 3 — interface fragments */}
        <motion.div style={{ x: l3x, y: l3y }} className="absolute inset-0 hidden sm:block">
          <div className="float-a absolute top-[5%] right-[0%] w-44 rounded-md border border-line bg-white/90 p-3 shadow-md backdrop-blur">
            <p className="text-label text-[0.6rem] text-grey-2">Design system</p>
            <div className="mt-2.5 flex gap-1.5">
              {["#06162d", "#176bff", "#65b8ff", "#eaf5ff"].map((c) => (
                <span key={c} className="size-6 rounded-sm border border-line" style={{ background: c }} />
              ))}
            </div>
            <div className="mt-2.5 flex items-end gap-2">
              <span className="text-2xl leading-none font-medium tracking-tight">Aa</span>
              <span className="mb-0.5 h-1.5 flex-1 overflow-hidden rounded-full bg-ice">
                <span className="block h-full w-2/3 rounded-full bg-blue/60" />
              </span>
            </div>
          </div>
          <div className="float-b absolute bottom-[6%] left-[-2%] w-48 rounded-md border border-line bg-white/90 p-3 shadow-md backdrop-blur">
            <div className="flex items-center justify-between">
              <p className="text-label text-[0.6rem] text-grey-2">Release</p>
              <span className="flex items-center gap-1.5 text-[0.65rem] text-blue-ink">
                <span className="relative flex size-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-blue" />
                  <span className="relative size-1.5 rounded-full bg-blue" />
                </span>
                Live
              </span>
            </div>
            <div className="mt-3 flex h-10 items-end gap-1">
              {[30, 45, 38, 60, 52, 74, 68, 90].map((h, i) => (
                <span
                  key={i}
                  className="bar-grow flex-1 origin-bottom rounded-[2px] bg-blue"
                  style={{ height: `${h}%`, opacity: 0.25 + i * 0.09, animationDelay: `${0.8 + i * 0.06}s` }}
                />
              ))}
            </div>
          </div>
          <div className="float-c absolute top-[46%] left-[-6%] w-40 rounded-md border border-line bg-white/90 p-3 shadow-md backdrop-blur">
            <p className="text-label text-[0.6rem] text-grey-2">Delivering in</p>
            <ul className="mt-2 flex flex-wrap gap-1">
              {presence.map((p) => (
                <li
                  key={p.code}
                  className={`text-label rounded-[3px] px-1.5 py-0.5 text-[0.58rem] ${p.hub ? "bg-blue text-white" : "bg-ice text-blue-ink"}`}
                >
                  {p.code}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
