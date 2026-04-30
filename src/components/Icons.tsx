import { memo } from "preact/compat";
import type { ComponentChildren } from "preact";
import { ICON_PATHS } from "../constants/constants";

interface IconProps {
  size?: number;
  className?: string;
  "aria-hidden"?: boolean;
  viewBox?: string;
  children?: ComponentChildren;
}

/**
 * Base Icon component to avoid SVG boilerplate repetition.
 */
const Icon = memo(
  ({ size = 24, className = "", "aria-hidden": ariaHidden, children, viewBox = "0 0 24 24" }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={ariaHidden}
    >
      {children}
    </svg>
  )
);


export const ChevronDown = memo((props: IconProps) => (
  <Icon {...props}>
    <path d={ICON_PATHS.CHEVRON_DOWN} />
  </Icon>
));


export const ChevronUp = memo((props: IconProps) => (
  <Icon {...props}>
    <path d={ICON_PATHS.CHEVRON_UP} />
  </Icon>
));

