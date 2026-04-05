import { useState, useEffect, useCallback } from "react";
import { t as translate } from "../utils/i18n";
import { LocaleContext } from "./LocaleContext";

/** Reads ?lang= from URL, defaults to "en". */
function readLangFromURL() {
  const params = new URLSearchParams(window.location.search);
  const lang = params.get("lang");
  return lang === "ar" ? "ar" : "en";
}

/** Updates the ?lang= URL param without reloading. */
function writeLangToURL(lang) {
  const url = new URL(window.location);
  url.searchParams.set("lang", lang);
  window.history.replaceState({}, "", url);
}

/** Provider that wraps the app and supplies locale context. */
export function LocaleProvider({ children }) {
  const [lang, setLangState] = useState(readLangFromURL);
  const dir = lang === "ar" ? "rtl" : "ltr";

  const setLang = useCallback((newLang) => {
    setLangState(newLang);
    writeLangToURL(newLang);
  }, []);

  const tFn = useCallback((key) => translate(key, lang), [lang]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  return (
    <LocaleContext.Provider value={{ lang, dir, t: tFn, setLang }}>
      {children}
    </LocaleContext.Provider>
  );
}
