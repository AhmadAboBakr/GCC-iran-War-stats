/** Dark panel wrapper used to group chart sections. */
export function Panel({ children, className = "" }) {
  return (
    <div
      className={`bg-bg-panel border border-border-panel rounded-md px-2 pt-[18px] pb-3 mb-3.5 ${className}`}
    >
      {children}
    </div>
  );
}

/** Section label used above charts inside panels. */
export function SectionLabel({ children, color = "#64748b" }) {
  return (
    <div
      className="text-[9px] tracking-[4px] mb-2.5 pl-1 font-mono"
      style={{ color }}
    >
      {children}
    </div>
  );
}
