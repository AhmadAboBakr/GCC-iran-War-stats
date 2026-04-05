import { useState, useEffect, useCallback } from "react";

const VALID_TABS = ["total", "uae", "bahrain", "kuwait", "qatar", "ksa"];

/** Syncs the active tab with the URL hash for direct linking. */
export function useHashTab(defaultTab = "total") {
  const readHash = useCallback(() => {
    const h = window.location.hash.replace("#", "");
    return VALID_TABS.includes(h) ? h : defaultTab;
  }, [defaultTab]);

  const [tab, setTabState] = useState(readHash);

  useEffect(() => {
    const onHash = () => setTabState(readHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [readHash]);

  const setTab = (key) => {
    window.location.hash = key;
    setTabState(key);
  };

  return [tab, setTab];
}
