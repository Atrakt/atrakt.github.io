import { useState, useEffect } from "preact/hooks";
import { ChevronUp } from "./Icons";
import { LAYOUT } from "../constants/constants";

/**
 * Floating button to scroll back to top with visibility threshold.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > LAYOUT.SCROLL_THRESHOLD);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed bottom-layout-sm right-layout-sm md:bottom-layout-md md:right-layout-md z-[100] flex h-12 w-12 items-center justify-center rounded-full bg-primary text-background shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0 pointer-events-none"
      }`}
    >
      <ChevronUp size={24} />
    </button>
  );
}
