import { useContext } from "react";
import { LocaleContext } from "./LocaleContext";

/** Hook to access locale context anywhere in the tree. */
export function useLocale() {
  return useContext(LocaleContext);
}
