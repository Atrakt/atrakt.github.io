import { memo } from "preact/compat";
import { METADATA } from "../constants/constants";

export const Footer = memo(function Footer() {
  return (
    <footer className="w-full pt-8 lg:border-t lg:border-border">
      <p className="font-mono text-xs text-center uppercase tracking-[0.2em] text-muted/60 flex flex-col items-center gap-1">
        <span>
          © {new Date().getFullYear()} {METADATA.name}
        </span>
        <span>SINCE {METADATA.since}</span>
      </p>
    </footer>
  );
});
