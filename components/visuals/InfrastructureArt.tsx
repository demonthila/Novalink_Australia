/**
 * Abstract "digital infrastructure" artwork: stacked isometric planes in the
 * house halftone treatment. Supporting imagery only — not a product depiction.
 */
export function InfrastructureArt({ className }: { className?: string }) {
  const plane = (y: number) => `M200 ${y} L360 ${y + 80} L200 ${y + 160} L40 ${y + 80} Z`;
  return (
    <div aria-hidden className={className}>
      <svg viewBox="0 0 400 520" className="size-full">
        <defs>
          <pattern id="ia-dots" width="7" height="7" patternUnits="userSpaceOnUse">
            <circle cx="3.5" cy="3.5" r="1.1" fill="#258cff" />
          </pattern>
          <linearGradient id="ia-fade" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0.1" />
          </linearGradient>
          <mask id="ia-mask">
            <rect width="400" height="520" fill="url(#ia-fade)" />
          </mask>
        </defs>
        <rect width="400" height="520" fill="#06162d" />
        {[300, 190, 80].map((y, i) => (
          <g key={y}>
            <path d={plane(y)} fill="url(#ia-dots)" mask="url(#ia-mask)" opacity={0.45 + i * 0.25} />
            <path d={plane(y)} fill="none" stroke="#65b8ff" strokeOpacity={0.35 + i * 0.2} />
          </g>
        ))}
        {[120, 200, 280].map((x, i) => (
          <line key={x} x1={x} y1={160 + i * 40} x2={x} y2={380 + i * 40} stroke="#65b8ff" strokeOpacity=".35" strokeDasharray="2 5" />
        ))}
        <line x1="200" y1="160" x2="200" y2="460" stroke="#258cff" strokeWidth="1.5" />
        {[160, 270, 380].map((y) => (
          <rect key={y} x="194" y={y - 6} width="12" height="12" rx="2" fill="#06162d" stroke="#258cff" strokeWidth="1.5" />
        ))}
        <circle cx="200" cy="160" r="22" fill="#258cff" fillOpacity=".18" />
      </svg>
    </div>
  );
}
