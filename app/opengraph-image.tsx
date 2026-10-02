import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "NovaLink Innovations — We build digital products that move businesses forward.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  const logo = await readFile(join(process.cwd(), "public/brand/novalink-logo.png"));
  const src = `data:image/png;base64,${logo.toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#f7f9fc",
          backgroundImage: "linear-gradient(rgba(7,16,31,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(7,16,31,.06) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          color: "#07101f",
          fontFamily: "sans-serif",
        }}
      >
        <img src={src} width={331} height={72} alt="" />
        <div style={{ display: "flex", flexDirection: "column", fontSize: 86, fontWeight: 600, letterSpacing: -4, lineHeight: 1 }}>
          <span>We build digital products</span>
          <span style={{ display: "flex" }}>
            that move&nbsp;<span style={{ color: "#176bff" }}>businesses forward.</span>
          </span>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#5a6475", letterSpacing: 3 }}>
          SOFTWARE • DESIGN • DIGITAL INNOVATION — MELBOURNE · SRI LANKA
        </div>
      </div>
    ),
    size,
  );
}
