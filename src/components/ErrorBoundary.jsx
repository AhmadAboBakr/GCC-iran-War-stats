import { Component } from "react";
import { t } from "../utils/i18n";

/** Catches render errors and shows a fallback instead of a white screen. */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      const lang = document.documentElement.lang || "en";
      return (
        <div className="min-h-screen bg-bg-primary flex items-center justify-center font-mono text-xs text-red-400 tracking-widest p-5 text-center leading-8">
          <div>
            <div className="text-text-muted mb-2">{t("error.render", lang)}</div>
            <div>{this.state.error?.message ?? "Unknown error"}</div>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 border border-red-400/40 rounded text-red-400 text-[9px] tracking-[3px]"
            >
              {t("error.reload", lang)}
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
