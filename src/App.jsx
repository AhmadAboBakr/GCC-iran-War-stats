import { COUNTRIES } from "./utils/constants";
import { relativeTime } from "./utils/data";
import { useAttackData } from "./hooks/useAttackData";
import { useHashTab } from "./hooks/useHashTab";
import { useLocale } from "./hooks/useLocaleHook";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { CountryPanel } from "./components/CountryPanel";
import { TotalPanel } from "./components/TotalPanel";
import { Sparkline } from "./components/Sparkline";
import { LangToggle } from "./components/LangToggle";

const TAB_KEYS = ["total", "uae", "bahrain", "kuwait", "qatar", "ksa"];
const TAB_FLAGS = { total: "🌍", uae: "🇦🇪", bahrain: "🇧🇭", kuwait: "🇰🇼", qatar: "🇶🇦", ksa: "🇸🇦" };

function AppContent() {
  const { allData, allMeta, loading, error, lastFetch } = useAttackData();
  const [tab, setTab] = useHashTab("total");
  const { t, dir } = useLocale();

  const activeColor = COUNTRIES[tab]?.color ?? "#4dd0e1";
  const latestDay = allMeta.uae?.day ?? "—";
  const lastUpdatedDate = allMeta.uae?.lastUpdated;

  if (loading) {
    return (
      <div className="bg-bg-primary min-h-screen flex items-center justify-center font-mono text-text-dim text-[11px] tracking-[3px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 border-2 border-text-dim border-t-weapon-drones rounded-full animate-spin" />
          {t("loading")}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-bg-primary min-h-screen flex items-center justify-center font-mono text-red-400 text-[11px] p-5 text-center leading-8 tracking-[3px]">
        {t("error")}: {error}
      </div>
    );
  }

  return (
    <div className="bg-bg-primary min-h-screen text-text-primary font-mono px-4 py-6">
      <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;700&family=IBM+Plex+Sans+Arabic:wght@400;500;700&family=Bebas+Neue&display=swap"
        rel="stylesheet"
      />

      <div className="max-w-[920px] mx-auto">
        {/* Header */}
        <div className="mb-1.5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div
              className="text-[9px] tracking-[4px] mb-[5px] transition-colors duration-300"
              style={{ color: activeColor }}
            >
              ◉ {t("header.subtitle")}
            </div>
            <LangToggle />
          </div>
          <h1 className="font-display text-[clamp(24px,5vw,48px)] tracking-[3px] m-0 text-[#f1f5f9] leading-none">
            {t("header.title")}
          </h1>
          <div className="text-text-dim text-[9px] tracking-[3px] mt-[5px] flex items-center gap-3 flex-wrap">
            <span className="ltr-nums">{t("header.dateRange")} · {t("header.day")} {latestDay}</span>
            {lastUpdatedDate && (
              <span className="text-text-faint">
                {t("header.updated")} {relativeTime(lastUpdatedDate, t).toUpperCase()}
                {lastFetch && (
                  <span className="ms-1 text-text-faint">
                    · {t("header.checked")} {relativeTime(lastFetch.toISOString(), t).toUpperCase()}
                  </span>
                )}
              </span>
            )}
          </div>
        </div>

        {/* Active color bar */}
        <div
          className="h-px mb-5 transition-all duration-300"
          style={{
            background: dir === "rtl"
              ? `linear-gradient(270deg,${activeColor},#1e3a5f,transparent)`
              : `linear-gradient(90deg,${activeColor},#1e3a5f,transparent)`,
          }}
        />

        {/* Tab bar */}
        <div className="flex gap-1 mb-6 flex-wrap">
          {TAB_KEYS.map(key => {
            const active = tab === key;
            const c = COUNTRIES[key]?.color;
            return (
              <button
                key={key}
                onClick={() => setTab(key)}
                className="text-[10px] tracking-[2px] py-[7px] px-3.5 rounded-t-[3px] font-mono transition-all duration-[180ms] flex items-center"
                style={{
                  background: active ? `${c}22` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${active ? c : "#1e293b"}`,
                  borderBottom: active ? `2px solid ${c}` : "1px solid #1e293b",
                  color: active ? c : "#64748b",
                }}
              >
                {TAB_FLAGS[key]} {t(`tab.${key}`)}
                {allData[key] && key !== "total" && (
                  <Sparkline data={allData[key]} color={active ? c : "#475569"} />
                )}
              </button>
            );
          })}
        </div>

        {/* Content */}
        {tab === "total" && <TotalPanel allData={allData} />}
        {tab !== "total" && allData[tab] && (
          <CountryPanel data={allData[tab]} meta={allMeta[tab]} countryKey={tab} />
        )}

        {/* Footer */}
        <div className="flex justify-between flex-wrap gap-1.5 mt-4 pt-3 border-t border-border-subtle">
          <div className="text-text-faint text-[8px] tracking-[2px]">
            {t("footer.sources")}
          </div>
          <div className="text-text-faint text-[8px] tracking-[2px] ltr-nums">
            {t("footer.updated")}: 04 APR 2026 · {t("header.day")} {latestDay}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}
