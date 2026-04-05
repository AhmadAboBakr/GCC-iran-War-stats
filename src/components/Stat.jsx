import { useAnimatedCounter } from "../hooks/useAnimatedCounter";

/** Stat card that displays a label + animated numeric value with a colored top border. */
export function Stat({ label, value, color }) {
  const animated = useAnimatedCounter(value);

  return (
    <div
      className="flex-1 min-w-[110px] py-[11px] px-[14px] bg-bg-stat rounded"
      style={{
        border: `1px solid ${color}44`,
        borderTop: `2px solid ${color}`,
      }}
    >
      <div className="text-text-secondary text-[8px] tracking-[3px] font-mono mb-1">
        {label}
      </div>
      <div
        className="text-[22px] font-bold font-mono -tracking-[1px]"
        style={{ color }}
      >
        {animated.toLocaleString()}
      </div>
    </div>
  );
}
