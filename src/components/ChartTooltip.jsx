import { useLocale } from "../hooks/useLocaleHook";

/** Custom Recharts tooltip with dark styling and i18n. */
export function ChartTooltip({ active, payload, label, isRate }) {
  const { t } = useLocale();
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-[#0f172a] border border-border-muted rounded px-4 py-3 font-mono text-[11px] min-w-[190px]" dir="ltr">
      <div className="text-text-muted text-[9px] tracking-[3px] mb-2">
        {label}{isRate ? ` — ${t("tooltip.dailyRate")}` : ` — ${t("tooltip.cumulative")}`}
      </div>
      {payload.map(p =>
        p.value !== null ? (
          <div key={p.dataKey} style={{ color: p.color }} className="mb-[3px]">
            <span className="text-text-dim">▸ </span>
            <span className="text-[#cbd5e1]">{p.name?.toUpperCase()}: </span>
            <span className="font-bold">
              {isRate ? `${p.value}${t("tooltip.perDay")}` : p.value?.toLocaleString()}
            </span>
          </div>
        ) : null
      )}
    </div>
  );
}
