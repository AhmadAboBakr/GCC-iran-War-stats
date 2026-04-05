import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { WEAPON_COLORS } from "../utils/constants";
import { useLocale } from "../hooks/useLocaleHook";

/** Donut chart showing weapon type distribution for a country or region. */
export function WeaponDonut({ ballistic, cruise, drones, size = 130 }) {
  const { t } = useLocale();

  const data = [
    { name: t("weapon.ballistic"), value: ballistic, color: WEAPON_COLORS.ballistic },
    { name: t("weapon.cruise"),    value: cruise,    color: WEAPON_COLORS.cruise },
    { name: t("weapon.drones"),    value: drones,    color: WEAPON_COLORS.drones },
  ].filter(d => d.value > 0);

  const total = ballistic + cruise + drones;

  return (
    <div className="flex items-center gap-4">
      <div style={{ width: size, height: size }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="55%"
              outerRadius="85%"
              dataKey="value"
              stroke="none"
              animationDuration={900}
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} fillOpacity={0.85} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const d = payload[0];
                const pct = ((d.value / total) * 100).toFixed(1);
                return (
                  <div className="bg-[#0f172a] border border-border-muted rounded px-3 py-2 font-mono text-[10px]" dir="ltr">
                    <span style={{ color: d.payload.color }}>{d.name}</span>
                    <span className="text-text-secondary ml-2">
                      {d.value.toLocaleString()} ({pct}%)
                    </span>
                  </div>
                );
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-col gap-1.5">
        {data.map(d => {
          const pct = ((d.value / total) * 100).toFixed(0);
          return (
            <div key={d.name} className="flex items-center gap-2 font-mono text-[10px]">
              <div className="w-2 h-2 rounded-full" style={{ background: d.color }} />
              <span className="text-text-secondary">{d.name}</span>
              <span className="font-bold ltr-nums" style={{ color: d.color }}>{pct}%</span>
            </div>
          );
        })}
        <div className="text-text-dim text-[8px] tracking-[2px] font-mono mt-1">
          <span className="ltr-nums">{total.toLocaleString()}</span> {t("donut.total")}
        </div>
      </div>
    </div>
  );
}
