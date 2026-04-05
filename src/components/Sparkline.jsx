/** Tiny inline SVG sparkline showing a country's total trend. */
export function Sparkline({ data, color, width = 40, height = 16 }) {
  if (!data || data.length < 2) return null;

  const totals = data.map(d => d.ballistic + d.cruise + d.drones);
  const max = Math.max(...totals);
  const min = Math.min(...totals);
  const range = max - min || 1;

  const points = totals
    .map((v, i) => {
      const x = (i / (totals.length - 1)) * width;
      const y = height - ((v - min) / range) * (height - 2) - 1;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      width={width}
      height={height}
      className="inline-block ml-1.5 align-middle opacity-70"
    >
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
