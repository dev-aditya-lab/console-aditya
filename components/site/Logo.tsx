import { cn } from "@/lib/utils";

/** "AG" monogram drawn from two strokes. Paths carry pathLength=1 so they can be stroke-drawn. */
export function Logo({ className, strokeWidth = 5 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 96 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("draw-on-hover", className)}
      aria-hidden
    >
      <path className="draw-path logo-path" pathLength={1} d="M6 58 L26 8 L46 58 M14 40 H38" />
      <path className="draw-path logo-path" pathLength={1} d="M88 18 C80 6 54 4 54 32 C54 60 82 62 90 46 V34 H72" />
    </svg>
  );
}
