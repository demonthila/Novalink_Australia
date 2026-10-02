"use client";

import { useEffect, useRef } from "react";

/** Grid + drifting blue aurora + a spotlight that reveals a brighter blue grid under the cursor. */
export function HeroBackdrop() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
        el.style.setProperty("--spot", "1");
      });
    };
    const onLeave = () => el.style.setProperty("--spot", "0");
    const host = el.parentElement!;
    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden [--mx:70%] [--my:30%] [--spot:0]">
      <div className="bg-grid absolute inset-0 opacity-70 [mask-image:linear-gradient(to_bottom,#000_55%,transparent)]" />
      <div className="aurora-a absolute -top-[20%] right-[-10%] size-[55vw] max-w-[900px] rounded-full bg-[radial-gradient(circle,rgb(37_140_255/0.22),transparent_60%)] blur-2xl" />
      <div className="aurora-b absolute top-[30%] right-[25%] size-[35vw] max-w-[560px] rounded-full bg-[radial-gradient(circle,rgb(101_184_255/0.25),transparent_60%)] blur-2xl" />
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: "var(--spot)",
          backgroundImage:
            "linear-gradient(to right, rgb(23 107 255 / .35) 1px, transparent 1px), linear-gradient(to bottom, rgb(23 107 255 / .35) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(260px circle at var(--mx) var(--my), #000, transparent 70%)",
          WebkitMaskImage: "radial-gradient(260px circle at var(--mx) var(--my), #000, transparent 70%)",
        }}
      />
    </div>
  );
}
