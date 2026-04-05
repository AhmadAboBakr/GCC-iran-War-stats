import { createContext } from "react";

export const LocaleContext = createContext({
  lang: "en",
  dir: "ltr",
  t: (k) => k,
  setLang: () => {},
});
