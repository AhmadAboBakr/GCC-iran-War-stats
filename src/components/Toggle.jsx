/** Toggle button for showing/hiding weapon types on charts. */
export function Toggle({ label, active, color, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-[9px] tracking-[2px] font-mono py-1 px-[11px] rounded-[3px] transition-all duration-[180ms]"
      style={{
        background: active ? `${color}25` : "transparent",
        border: `1px solid ${active ? color : "#334155"}`,
        color: active ? color : "#64748b",
      }}
    >
      {active ? "▪" : "□"} {label}
    </button>
  );
}
