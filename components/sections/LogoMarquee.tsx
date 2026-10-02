"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { clients, site } from "@/data/site";
import { EASE } from "@/lib/utils";

/**
 * Optical sizing: wide wordmarks get less height than compact marks so every
 * logo carries similar visual weight on the grid.
 */
const opticalHeight = (w: number, h: number) => Math.round(46 * Math.pow(w / h, -0.32));

/** Aligned client logo wall — greyscale at rest, full colour on hover/focus. */
export function LogoMarquee() {
  const reduce = useReducedMotion();
  return (
    <section aria-labelledby="clients-h" className="border-b border-line py-14 md:py-20">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <h2 id="clients-h" className="text-label text-grey-2">
            Trusted by teams building what’s next
          </h2>
          <p className="text-label text-grey-2">
            <span className="text-blue-ink">{site.clutch.rating}/5</span> · {site.clutch.reviews} Clutch reviews
          </p>
        </div>

        <motion.ul
          className="mt-8 grid grid-cols-2 overflow-hidden rounded-md border border-line bg-line [gap:1px] sm:grid-cols-3 lg:grid-cols-5"
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          variants={{ show: { transition: { staggerChildren: 0.07 } } }}
        >
          {clients.map((c, i) => (
            <motion.li
              key={c.name}
              variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}
              className={`group relative flex h-28 items-center justify-center bg-paper px-6 transition-colors duration-500 hover:bg-white md:h-36 ${
                i === clients.length - 1 ? "col-span-2 sm:col-span-1" : ""
              }`}
            >
              <span aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-blue transition-transform duration-500 group-hover:scale-x-100" />
              <Image
                src={c.logo}
                alt={c.name}
                width={c.width}
                height={c.height}
                sizes="200px"
                style={{ height: opticalHeight(c.width, c.height) * (c.scale ?? 1), width: "auto" }}
                className="max-w-[78%] object-contain opacity-75 grayscale transition duration-500 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
              />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
