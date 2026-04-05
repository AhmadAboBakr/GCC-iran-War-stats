import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from "recharts";
import { COUNTRIES, WEAPON_COLORS as C, TIMELINE_EVENTS, RECHARTS_AXIS_TICK, RECHARTS_GRID } from "../utils/constants";
import { buildDiff, shortN } from "../utils/data";
import { useLocale } from "../hooks/useLocaleHook";
import { Stat } from "./Stat";
import { Panel, SectionLabel } from "./Panel";
import { Toggle } from "./Toggle";
import { ChartTooltip } from "./ChartTooltip";
import { DeltaCards } from "./DeltaCards";
import { WeaponDonut } from "./WeaponDonut";

/** Dashboard panel for an individual country. */
export function CountryPanel({ data, meta, countryKey }) {
  const { t } = useLocale();
  const cfg = COUNTRIES[countryKey];
  const latest = data[data.length - 1];
  const diff = buildDiff(data);
  const [show, setShow] = useState({ ballistic: true, cruise: true, drones: true });
  const toggle = k => setShow(p => ({ ...p, [k]: !p[k] }));

  const eventsInRange = TIMELINE_EVENTS.filter(
    e => e.day >= data[0].day && e.day <= latest.day
  );

  return (
    <div>
      <DeltaCards data={data} color={cfg.color} />

      <div className="flex gap-2 mb-4 flex-wrap">
        <Stat label={t("stat.ballistic")} value={latest.ballistic} color={C.ballistic} />
        <Stat label={t("stat.cruise")}    value={latest.cruise}    color={C.cruise} />
        <Stat label={t("stat.drones")}    value={latest.drones}    color={C.drones} />
        <Stat label={t("stat.total")}     value={latest.ballistic + latest.cruise + latest.drones} color={cfg.color} />
      </div>

      {meta?.note && (
        <div
          className="bg-bg-panel border border-border-muted rounded-[3px] py-2 px-3 mb-3.5 text-text-secondary text-[9px] tracking-[1px] font-mono leading-[1.7]"
          style={{ borderInlineStart: `2px solid ${cfg.color}66` }}
        >
          ℹ {meta.note}
        </div>
      )}

      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="flex gap-2 flex-wrap">
          <Toggle label={t("weapon.drones")}    active={show.drones}    color={C.drones}    onClick={() => toggle("drones")} />
          <Toggle label={t("weapon.ballistic")} active={show.ballistic} color={C.ballistic} onClick={() => toggle("ballistic")} />
          <Toggle label={t("weapon.cruise")}    active={show.cruise}    color={C.cruise}    onClick={() => toggle("cruise")} />
        </div>
        <div className="ms-auto">
          <WeaponDonut ballistic={latest.ballistic} cruise={latest.cruise} drones={latest.drones} size={90} />
        </div>
      </div>

      <Panel>
        <SectionLabel color={cfg.color}>{t("chart.cumulative")}</SectionLabel>
        <ResponsiveContainer width="100%" height={210}>
          <AreaChart data={data} margin={{ top: 4, right: 20, left: 2, bottom: 0 }}>
            <defs>
              {[["gD", C.drones], ["gB", C.ballistic], ["gC", C.cruise]].map(([id, c]) => (
                <linearGradient key={id} id={`${id}_${countryKey}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={c} stopOpacity={0.22} />
                  <stop offset="95%" stopColor={c} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid {...RECHARTS_GRID} />
            <XAxis dataKey="date" tick={RECHARTS_AXIS_TICK} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={shortN} tick={RECHARTS_AXIS_TICK} axisLine={false} tickLine={false} width={40} />
            <Tooltip content={<ChartTooltip />} />
            {eventsInRange.map(e => (
              <ReferenceLine key={e.day} x={e.date} stroke={e.color} strokeDasharray="3 3" strokeOpacity={0.5} label={{ value: t(e.labelKey), position: "top", fill: e.color, fontSize: 8, fontFamily: "IBM Plex Mono" }} />
            ))}
            {show.drones    && <Area type="monotone" dataKey="drones"    name={t("weapon.drones")}    stroke={C.drones}    strokeWidth={2} fill={`url(#gD_${countryKey})`} dot={{ fill: C.drones, r: 3, strokeWidth: 0 }}    activeDot={{ r: 5 }} animationDuration={900} />}
            {show.ballistic && <Area type="monotone" dataKey="ballistic" name={t("weapon.ballistic")} stroke={C.ballistic} strokeWidth={2} fill={`url(#gB_${countryKey})`} dot={{ fill: C.ballistic, r: 3, strokeWidth: 0 }} activeDot={{ r: 5 }} animationDuration={1000} />}
            {show.cruise    && <Area type="monotone" dataKey="cruise"    name={t("weapon.cruise")}    stroke={C.cruise}    strokeWidth={2} fill={`url(#gC_${countryKey})`} dot={{ fill: C.cruise, r: 3, strokeWidth: 0 }}    activeDot={{ r: 5 }} animationDuration={1100} />}
          </AreaChart>
        </ResponsiveContainer>
      </Panel>

      <Panel>
        <SectionLabel>{t("chart.dailyRate")}</SectionLabel>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={diff} margin={{ top: 4, right: 20, left: 2, bottom: 0 }}>
            <CartesianGrid {...RECHARTS_GRID} />
            <XAxis dataKey="date" tick={RECHARTS_AXIS_TICK} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={shortN} tick={RECHARTS_AXIS_TICK} axisLine={false} tickLine={false} width={40} />
            <Tooltip content={<ChartTooltip isRate />} />
            <ReferenceLine y={0} stroke="#1e293b" />
            {show.drones    && <Bar dataKey="drones"    name={t("weapon.drones")}    fill={`${C.drones}99`}    radius={[2, 2, 0, 0]} stackId="s" animationDuration={900} />}
            {show.ballistic && <Bar dataKey="ballistic" name={t("weapon.ballistic")} fill={`${C.ballistic}99`} radius={[2, 2, 0, 0]} stackId="s" animationDuration={1000} />}
            {show.cruise    && <Bar dataKey="cruise"    name={t("weapon.cruise")}    fill={`${C.cruise}99`}    radius={[2, 2, 0, 0]} stackId="s" animationDuration={1100} />}
          </BarChart>
        </ResponsiveContainer>
      </Panel>
    </div>
  );
}
