import { useLocale } from "../hooks/useLocaleHook";

/** Language toggle button that switches between Arabic and English. */
export function LangToggle() {
  const { lang, setLang } = useLocale();
  const nextLang = lang === "en" ? "ar" : "en";
  const label = lang === "en" ? "العربية" : "English";

  return (
    <button
      onClick={() => setLang(nextLang)}
      className="text-[10px] tracking-[1px] py-1 px-3 rounded border border-border-muted text-text-secondary hover:text-text-primary hover:border-text-muted transition-all duration-200"
      title={`Switch to ${label}`}
    >
      {label}
    </button>
  );
}
