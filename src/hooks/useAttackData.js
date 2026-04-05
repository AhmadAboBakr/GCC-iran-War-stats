import { useState, useEffect, useCallback } from "react";
import { URLS, REFRESH_INTERVAL_MS } from "../utils/constants";

/** Fetches all country JSON data, with auto-refresh polling. */
export function useAttackData() {
  const [allData, setAllData] = useState({});
  const [allMeta, setAllMeta] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFetch, setLastFetch] = useState(null);

  const fetchData = useCallback(() => {
    Promise.all(
      Object.entries(URLS).map(([key, url]) =>
        fetch(`${url}?t=${Date.now()}`)
          .then(r => {
            if (!r.ok) throw new Error(`${key}: HTTP ${r.status}`);
            return r.json();
          })
          .then(json => ({ key, json }))
      )
    )
      .then(results => {
        const data = {};
        const meta = {};
        for (const { key, json } of results) {
          data[key] = json.cumulative;
          meta[key] = json.meta;
        }
        setAllData(data);
        setAllMeta(meta);
        setLoading(false);
        setLastFetch(new Date());
      })
      .catch(e => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, REFRESH_INTERVAL_MS);
    return () => clearInterval(id);
  }, [fetchData]);

  return { allData, allMeta, loading, error, lastFetch, refetch: fetchData };
}
