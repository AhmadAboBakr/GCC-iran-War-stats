export const BASE = import.meta.env.BASE_URL;

export const URLS = {
  uae:     `${BASE}uae-attacks-data.json`,
  bahrain: `${BASE}bahrain-attacks-data.json`,
  kuwait:  `${BASE}kuwait-attacks-data.json`,
  qatar:   `${BASE}qatar-attacks-data.json`,
  ksa:     `${BASE}ksa-attacks-data.json`,
};

export const COUNTRY_KEYS = ["uae", "bahrain", "kuwait", "qatar", "ksa"];

export const COUNTRIES = {
  uae:     { label: "UAE",     flag: "🇦🇪", color: "#ff7043" },
  bahrain: { label: "Bahrain", flag: "🇧🇭", color: "#ef5350" },
  kuwait:  { label: "Kuwait",  flag: "🇰🇼", color: "#66bb6a" },
  qatar:   { label: "Qatar",   flag: "🇶🇦", color: "#f48fb1" },
  ksa:     { label: "KSA",     flag: "🇸🇦", color: "#81c784" },
  total:   { label: "Total",   flag: "🌍",  color: "#4dd0e1" },
};

export const WEAPON_COLORS = {
  ballistic: "#ff7043",
  cruise:    "#ffd54f",
  drones:    "#4dd0e1",
};

export const TIMELINE_EVENTS = [
  { day: 1,  date: "Feb 28", labelKey: "event.warBegins",    color: "#ef5350" },
  { day: 3,  date: "Mar 2",  labelKey: "event.qatarSu24",   color: "#f48fb1" },
  { day: 19, date: "Mar 18", labelKey: "event.trumpWarning", color: "#ffd54f" },
  { day: 29, date: "Mar 28", labelKey: "event.ksaReport",    color: "#81c784" },
];

export const REFRESH_INTERVAL_MS = 5 * 60 * 1000;

export const RECHARTS_AXIS_TICK = {
  fill: "#94a3b8",
  fontSize: 9,
  fontFamily: "IBM Plex Mono",
};

export const RECHARTS_GRID = {
  stroke: "rgba(255,255,255,0.06)",
  strokeDasharray: "4 4",
};
