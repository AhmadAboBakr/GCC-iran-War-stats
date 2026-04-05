import { WEAPON_COLORS } from "../utils/constants";
import { getDailyDelta } from "../utils/data";
import { useLocale } from "../hooks/useLocaleHook";

/** Shows what changed since the last data update — daily deltas per weapon type. */
export function DeltaCards({ data, color }) {
  const { t } = useLocale();
  const delta = getDailyDelta(data);
  if (!delta) return null;

  const items = [
    { key: "ballistic", label: t("weapon.ballistic"), value: delta.ballistic },
    { key: "cruise",    label: t("weapon.cruise"),    value: delta.cruise },
    { key: "drones",    label: t("weapon.drones"),    value: delta.drones },
  ];

  const total = delta.ballistic + delta.cruise + delta.drones;
  const periodLabel = delta.days === 1
    ? delta.toDate
    : `${delta.fromDate} → ${delta.toDate}`;

  return (
    <div className="mb-4">
      <div className="text-[9px] tracking-[3px] font-mono text-text-muted mb-2 ps-0.5">
        {t("delta.latestUpdate")} — {periodLabel}
        {delta.days > 1 && (
          <span className="text-text-dim ms-2">({delta.days} {t("delta.days")})</span>
        )}
      </div>
      <div className="flex gap-2 flex-wrap">
        {items.map(({ key, label, value }) => (
          <div
            key={key}
            className="flex-1 min-w-[90px] py-2 px-3 rounded-[3px]"
            style={{
              background: value > 0 ? `${WEAPON_COLORS[key]}0d` : "rgba(255,255,255,0.02)",
              border: `1px solid ${value > 0 ? `${WEAPON_COLORS[key]}33` : "#1e293b"}`,
            }}
          >
            <div className="text-text-secondary text-[7px] tracking-[2px] font-mono mb-0.5">
              {label}
            </div>
            <div
              className="text-base font-bold font-mono ltr-nums"
              style={{ color: value > 0 ? WEAPON_COLORS[key] : "#475569" }}
            >
              {value > 0 ? `+${value}` : value === 0 ? "—" : value}
            </div>
          </div>
        ))}
        <div
          className="flex-1 min-w-[90px] py-2 px-3 rounded-[3px]"
          style={{
            background: total > 0 ? `${color}0d` : "rgba(255,255,255,0.02)",
            border: `1px solid ${total > 0 ? `${color}33` : "#1e293b"}`,
          }}
        >
          <div className="text-text-secondary text-[7px] tracking-[2px] font-mono mb-0.5">
            {t("weapon.total")}
          </div>
          <div
            className="text-base font-bold font-mono ltr-nums"
            style={{ color: total > 0 ? color : "#475569" }}
          >
            {total > 0 ? `+${total}` : "—"}
          </div>
        </div>
      </div>
    </div>
  );
}
