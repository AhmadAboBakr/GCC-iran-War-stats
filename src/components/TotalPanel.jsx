import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from "recharts";
import { COUNTRIES, COUNTRY_KEYS, WEAPON_COLORS as C, TIMELINE_EVENTS, RECHARTS_AXIS_TICK, RECHARTS_GRID } from "../utils/constants";
import { mergeTotals, shortN } from "../utils/data";
import { useLocale } from "../hooks/useLocaleHook";
import { Stat } from "./Stat";
import { Panel, SectionLabel } from "./Panel";
import { ChartTooltip } from "./ChartTooltip";
import { DeltaCards } from "./DeltaCards";
import { WeaponDonut } from "./WeaponDonut";

/** Regional overview panel showing aggregated data across all countries. */
export function TotalPanel({ allData }) {
  const { t } = useLocale();

  if (COUNTRY_KEYS.some(k => !allData[k])) {
    return (
      <div className="text-text-muted font-mono text-[11px] p-5">{t("loading")}</div>
    );
  }

  const merged = mergeTotals(allData);
  const latest = merged[merged.length - 1];

  const compareData = COUNTRY_KEYS.map(k => {
    const l = allData[k][allData[k].length - 1];
    return {
      label: COUNTRIES[k].flag + " " + t(`tab.${k}`),
      color: COUNTRIES[k].color,
      ballistic: l.ballistic,
      cruise: l.cruise,
      drones: l.drones,
      total: l.ballistic + l.cruise + l.drones,
    };
  }).sort((a, b) => b.total - a.total);

  return (
    <div>
      <DeltaCards data={merged} color="#4dd0e1" />

      <div className="flex gap-2 mb-4 flex-wrap">
        <Stat label={t("stat.totalBallistic")} value={latest.ballistic} color={C.ballistic} />
        <Stat label={t("stat.totalCruise")}    value={latest.cruise}    color={C.cruise} />
        <Stat label={t("stat.totalDrones")}    value={latest.drones}    color={C.drones} />
        <Stat label={t("stat.grandTotal")}     value={latest.ballistic + latest.cruise + latest.drones} color="#4dd0e1" />
      </div>

      <Panel>
        <div className="flex items-center justify-between flex-wrap gap-4 mb-2 px-1">
          <SectionLabel color="#4dd0e1">{t("chart.weaponMix")}</SectionLabel>
          <WeaponDonut ballistic={latest.ballistic} cruise={latest.cruise} drones={latest.drones} size={110} />
        </div>
      </Panel>

      <Panel>
        <SectionLabel color="#4dd0e1">{t("chart.regionalCumulative")}</SectionLabel>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={merged} margin={{ top: 4, right: 20, left: 2, bottom: 0 }}>
            <defs>
              {[["tD", C.drones], ["tB", C.ballistic], ["tC", C.cruise]].map(([id, c]) => (
                <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={c} stopOpacity={0.18} />
                  <stop offset="95%" stopColor={c} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid {...RECHARTS_GRID} />
            <XAxis dataKey="date" tick={RECHARTS_AXIS_TICK} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={shortN} tick={RECHARTS_AXIS_TICK} axisLine={false} tickLine={false} width={40} />
            <Tooltip content={<ChartTooltip />} />
            {TIMELINE_EVENTS.map(e => (
              <ReferenceLine key={e.day} x={e.date} stroke={e.color} strokeDasharray="3 3" strokeOpacity={0.5} label={{ value: t(e.labelKey), position: "top", fill: e.color, fontSize: 8, fontFamily: "IBM Plex Mono" }} />
            ))}
            <Area type="monotone" dataKey="drones"    name={t("weapon.drones")}    stroke={C.drones}    strokeWidth={2} fill="url(#tD)" dot={{ fill: C.drones, r: 2, strokeWidth: 0 }}    animationDuration={900} />
            <Area type="monotone" dataKey="ballistic" name={t("weapon.ballistic")} stroke={C.ballistic} strokeWidth={2} fill="url(#tB)" dot={{ fill: C.ballistic, r: 2, strokeWidth: 0 }} animationDuration={1000} />
            <Area type="monotone" dataKey="cruise"    name={t("weapon.cruise")}    stroke={C.cruise}    strokeWidth={2} fill="url(#tC)" dot={{ fill: C.cruise, r: 2, strokeWidth: 0 }}    animationDuration={1100} />
          </AreaChart>
        </ResponsiveContainer>
      </Panel>

      <Panel>
        <SectionLabel color="#4dd0e1">{t("chart.perCountry")}</SectionLabel>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={compareData} margin={{ top: 4, right: 20, left: 2, bottom: 0 }}>
            <CartesianGrid {...RECHARTS_GRID} />
            <XAxis dataKey="label" tick={RECHARTS_AXIS_TICK} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={shortN} tick={RECHARTS_AXIS_TICK} axisLine={false} tickLine={false} width={40} />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey="drones"    name={t("weapon.drones")}    stackId="s" fill={`${C.drones}77`}    radius={[0, 0, 0, 0]} animationDuration={900} />
            <Bar dataKey="ballistic" name={t("weapon.ballistic")} stackId="s" fill={`${C.ballistic}77`} radius={[0, 0, 0, 0]} animationDuration={1000} />
            <Bar dataKey="cruise"    name={t("weapon.cruise")}    stackId="s" fill={`${C.cruise}99`}    radius={[2, 2, 0, 0]} animationDuration={1100} />
          </BarChart>
        </ResponsiveContainer>
        <div className="flex gap-4 justify-center mt-2.5 flex-wrap">
          {[
            { c: C.drones, key: "weapon.drones" },
            { c: C.ballistic, key: "weapon.ballistic" },
            { c: C.cruise, key: "weapon.cruise" },
          ].map(({ c, key }) => (
            <div key={key} className="flex items-center gap-[5px] text-[9px] text-text-muted tracking-[2px] font-mono">
              <div className="w-3.5 h-0.5" style={{ background: c }} />
              {t(key)}
            </div>
          ))}
        </div>
      </Panel>

      <Panel>
        <SectionLabel color="#4dd0e1">{t("chart.uaeShare")}</SectionLabel>
        <div className="flex gap-2.5 flex-wrap">
          {["ballistic", "cruise", "drones"].map(type => {
            const uaeVal = allData.uae[allData.uae.length - 1][type];
            const totVal = compareData.reduce((s, d) => s + d[type], 0);
            const pct = totVal > 0 ? ((uaeVal / totVal) * 100).toFixed(0) : 0;
            const color = C[type];
            return (
              <div
                key={type}
                className="flex-1 min-w-[110px] py-2.5 px-3.5 rounded"
                style={{
                  background: `${color}0d`,
                  border: `1px solid ${color}33`,
                }}
              >
                <div className="text-text-secondary text-[8px] tracking-[3px] mb-1.5 font-mono">
                  {t(`weapon.${type}`)}
                </div>
                <div className="text-[28px] font-bold font-mono ltr-nums" style={{ color }}>
                  {pct}<span className="text-sm ms-0.5">%</span>
                </div>
                <div className="text-text-muted text-[8px] mt-0.5 font-mono">{t("chart.ofRegionalTotal")}</div>
              </div>
            );
          })}
        </div>
      </Panel>
    </div>
  );
}
