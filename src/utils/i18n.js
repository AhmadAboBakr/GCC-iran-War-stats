export const LANGS = { en: "English", ar: "العربية" };

const translations = {
  // App header
  "header.subtitle": {
    en: "IRANIAN STRIKES ON THE GULF — OFFICIAL DEFENCE BRIEFINGS",
    ar: "الضربات الإيرانية على الخليج — إحاطات الدفاع الرسمية",
  },
  "header.title": {
    en: "GCC ATTACK TRACKER",
    ar: "متتبع هجمات مجلس التعاون",
  },
  "header.dateRange": {
    en: "28 FEB → 4 APR 2026",
    ar: "٢٨ فبراير → ٤ أبريل ٢٠٢٦",
  },
  "header.day": {
    en: "DAY",
    ar: "اليوم",
  },
  "header.updated": {
    en: "UPDATED",
    ar: "آخر تحديث",
  },
  "header.checked": {
    en: "CHECKED",
    ar: "تم الفحص",
  },

  // Loading / Error
  "loading": {
    en: "LOADING DATA...",
    ar: "جارٍ تحميل البيانات...",
  },
  "error": {
    en: "ERROR",
    ar: "خطأ",
  },
  "error.reload": {
    en: "RELOAD",
    ar: "إعادة تحميل",
  },
  "error.render": {
    en: "RENDER ERROR",
    ar: "خطأ في العرض",
  },

  // Tabs / Countries
  "tab.total": { en: "Total", ar: "الإجمالي" },
  "tab.uae": { en: "UAE", ar: "الإمارات" },
  "tab.bahrain": { en: "Bahrain", ar: "البحرين" },
  "tab.kuwait": { en: "Kuwait", ar: "الكويت" },
  "tab.qatar": { en: "Qatar", ar: "قطر" },
  "tab.ksa": { en: "KSA", ar: "السعودية" },

  // Weapon types
  "weapon.ballistic": { en: "BALLISTIC", ar: "باليستي" },
  "weapon.cruise": { en: "CRUISE", ar: "كروز" },
  "weapon.drones": { en: "DRONES", ar: "مسيّرات" },
  "weapon.total": { en: "TOTAL", ar: "الإجمالي" },

  // Stat labels
  "stat.ballistic": { en: "BALLISTIC", ar: "باليستي" },
  "stat.cruise": { en: "CRUISE", ar: "كروز" },
  "stat.drones": { en: "DRONES", ar: "مسيّرات" },
  "stat.total": { en: "TOTAL", ar: "الإجمالي" },
  "stat.totalBallistic": { en: "TOTAL BALLISTIC", ar: "إجمالي الباليستي" },
  "stat.totalCruise": { en: "TOTAL CRUISE", ar: "إجمالي الكروز" },
  "stat.totalDrones": { en: "TOTAL DRONES", ar: "إجمالي المسيّرات" },
  "stat.grandTotal": { en: "GRAND TOTAL", ar: "المجموع الكلي" },

  // Delta cards
  "delta.latestUpdate": { en: "LATEST UPDATE", ar: "آخر تحديث" },
  "delta.days": { en: "DAYS", ar: "أيام" },

  // Chart labels
  "chart.cumulative": { en: "CUMULATIVE — ALL WEAPON TYPES", ar: "تراكمي — جميع أنواع الأسلحة" },
  "chart.dailyRate": {
    en: "DAILY RATE OF CHANGE (avg/day between briefings)",
    ar: "معدل التغيير اليومي (متوسط/يوم بين الإحاطات)",
  },
  "chart.weaponMix": { en: "WEAPON MIX — REGIONAL", ar: "توزيع الأسلحة — إقليمي" },
  "chart.perCountry": {
    en: "PER-COUNTRY — TOTAL PROJECTILES (stacked, sorted)",
    ar: "حسب الدولة — إجمالي المقذوفات (مكدس، مرتب)",
  },
  "chart.uaeShare": { en: "UAE SHARE OF REGIONAL TOTAL", ar: "حصة الإمارات من الإجمالي الإقليمي" },
  "chart.ofRegionalTotal": { en: "OF REGIONAL TOTAL", ar: "من الإجمالي الإقليمي" },
  "chart.regionalCumulative": { en: "REGIONAL COMBINED — CUMULATIVE", ar: "إقليمي مجمّع — تراكمي" },

  // Tooltip
  "tooltip.dailyRate": { en: "DAILY RATE", ar: "المعدل اليومي" },
  "tooltip.cumulative": { en: "CUMULATIVE", ar: "تراكمي" },
  "tooltip.perDay": { en: "/day", ar: "/يوم" },

  // Donut
  "donut.total": { en: "TOTAL", ar: "الإجمالي" },

  // Timeline events
  "event.warBegins": { en: "War begins", ar: "بداية الحرب" },
  "event.qatarSu24": { en: "Qatar shoots down 2 Su-24s", ar: "قطر تسقط طائرتي سو-٢٤" },
  "event.trumpWarning": { en: "Trump warning — Qatar spared", ar: "تحذير ترامب — قطر تُعفى" },
  "event.ksaReport": { en: "KSA cumulative report", ar: "التقرير التراكمي للسعودية" },

  // Footer
  "footer.sources": {
    en: "SOURCES: UAE MOD · BDF BAHRAIN · KUWAIT MOD · QATAR MOD · SAUDI MOD",
    ar: "المصادر: وزارة الدفاع الإماراتية · قوة الدفاع البحرينية · وزارة الدفاع الكويتية · وزارة الدفاع القطرية · وزارة الدفاع السعودية",
  },
  "footer.updated": { en: "UPDATED", ar: "آخر تحديث" },

  // Relative time
  "time.justNow": { en: "just now", ar: "الآن" },
  "time.mAgo": { en: "m ago", ar: "د مضت" },
  "time.hAgo": { en: "h ago", ar: "س مضت" },
  "time.yesterday": { en: "yesterday", ar: "أمس" },
  "time.dAgo": { en: "d ago", ar: "ي مضت" },
};

/** Returns the translated string for a given key and locale. */
export function t(key, lang = "en") {
  const entry = translations[key];
  if (!entry) return key;
  return entry[lang] ?? entry.en ?? key;
}
