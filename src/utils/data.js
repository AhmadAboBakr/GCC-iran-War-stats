/** Calculates daily rate of change from cumulative data. */
export function buildDiff(src) {
  return src.slice(1).map((row, i) => {
    const prev = src[i];
    const days = row.day - prev.day || 1;
    return {
      date: row.date,
      day: row.day,
      ballistic: +((row.ballistic - prev.ballistic) / days).toFixed(2),
      cruise:    +((row.cruise    - prev.cruise)    / days).toFixed(2),
      drones:    +((row.drones    - prev.drones)    / days).toFixed(2),
    };
  });
}

/** Merges all country datasets into a single regional total by day. */
export function mergeTotals(datasets) {
  const byDay = {};
  const dateByDay = {};

  for (const rows of Object.values(datasets)) {
    for (const row of rows) {
      if (!byDay[row.day]) {
        byDay[row.day] = { ballistic: 0, cruise: 0, drones: 0 };
        dateByDay[row.day] = row.date;
      }
      byDay[row.day].ballistic += row.ballistic;
      byDay[row.day].cruise    += row.cruise;
      byDay[row.day].drones    += row.drones;
    }
  }

  return Object.keys(byDay)
    .sort((a, b) => +a - +b)
    .map(day => ({ date: dateByDay[day], day: +day, ...byDay[day] }));
}

/** Formats large numbers (1000+ → "1k"). */
export function shortN(v) {
  return v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v;
}

/** Returns a human-readable relative time string, localized via the t function. */
export function relativeTime(dateStr, t) {
  const then = new Date(dateStr);
  const now = new Date();
  const diffMs = now - then;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return t("time.justNow");
  if (diffMins < 60) return `${diffMins}${t("time.mAgo")}`;
  if (diffHours < 24) return `${diffHours}${t("time.hAgo")}`;
  if (diffDays === 1) return t("time.yesterday");
  return `${diffDays}${t("time.dAgo")}`;
}

/** Computes daily deltas between the last two data points for a country. */
export function getDailyDelta(data) {
  if (data.length < 2) return null;
  const curr = data[data.length - 1];
  const prev = data[data.length - 2];
  const days = curr.day - prev.day || 1;
  return {
    ballistic: curr.ballistic - prev.ballistic,
    cruise:    curr.cruise    - prev.cruise,
    drones:    curr.drones    - prev.drones,
    days,
    fromDate: prev.date,
    toDate: curr.date,
  };
}
