import { useState } from "preact/hooks";
import type { CSSProperties } from "preact";
import { Header } from "./Header";
import { GlobalLanguageList } from "./GlobalLanguageList";
import { ChevronDown, ChevronUp } from "./Icons";
import type { GlobalLanguage } from "../types/types";

interface Props {
  globalLanguages: GlobalLanguage[];
}

/**
 * Sidebar component that adapts to mobile (accordion) and desktop (sticky).
 */
export function Sidebar({ globalLanguages }: Props) {
  const [showMobileSpecs, setShowMobileSpecs] = useState(false);

  // Dynamic height calculation based on theme tokens
  const sidebarStyle: CSSProperties = {
    "--sidebar-h-md": "calc(100vh - var(--spacing-layout-md) * 2)",
    "--sidebar-h-lg": "calc(100vh - var(--spacing-layout-lg) * 2 - 1px)",
  };

  return (
    <aside
      style={sidebarStyle}
      className="lg:sticky lg:top-layout-lg flex flex-col h-auto md:h-[var(--sidebar-h-md)] lg:h-[var(--sidebar-h-lg)]"
    >
      <Header />

      {/* Mobile/Tablet Version: Collapsible Languages */}
      <div className="lg:hidden border border-border rounded-xl overflow-hidden">
        <button
          onClick={() => setShowMobileSpecs(!showMobileSpecs)}
          aria-expanded={showMobileSpecs}
          className="w-full flex items-center justify-between px-6 py-4 bg-border font-mono text-xs uppercase tracking-[0.2em] text-primary focus-visible:[outline-offset:-2px]"
        >
          <span>{showMobileSpecs ? "Hide Global Languages" : "View Global Languages"}</span>
          {showMobileSpecs ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {showMobileSpecs && (
          <div className="p-4 border-t border-border bg-card/50">
            {globalLanguages.length > 0 && <GlobalLanguageList languages={globalLanguages} />}
          </div>
        )}
      </div>

      {/* Desktop Version: Static List */}
      <div className="hidden lg:flex flex-1 flex-col">
        {globalLanguages.length > 0 && <GlobalLanguageList languages={globalLanguages} />}
      </div>
    </aside>
  );
}
