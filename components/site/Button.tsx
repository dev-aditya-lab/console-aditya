"use client";

import { Magnetic } from "@/components/motion/Magnetic";
import { TLink } from "@/components/motion/TransitionProvider";
import { cn } from "@/lib/utils";

/** Arrow whose head swaps out/in diagonally on hover (parent needs `group`). */
export function ArrowIcon({ className }: { className?: string }) {
  return (
    <span className={cn("relative inline-block h-[1em] w-[1em] overflow-hidden align-middle", className)} aria-hidden>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute inset-0 h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-full group-hover:-translate-y-full"
      >
        <path d="M7 17 17 7M8 7h9v9" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute inset-0 h-full w-full -translate-x-full translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0"
      >
        <path d="M7 17 17 7M8 7h9v9" />
      </svg>
    </span>
  );
}

export function Roll({ children }: { children: string }) {
  return (
    <span className="roll">
      <span>{children}</span>
      <span aria-hidden>{children}</span>
    </span>
  );
}

type Variant = "solid" | "outline" | "accent";

const base =
  "group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-4 text-sm font-medium tracking-tight isolate";

const variants: Record<Variant, string> = {
  solid: "bg-ink text-white",
  accent: "bg-accent text-white",
  outline: "border border-ink/20 text-ink",
};

const fills: Record<Variant, string> = {
  solid: "bg-accent",
  accent: "bg-ink",
  outline: "bg-ink",
};

/** Pill button: magnetic pull, liquid fill sweep from below, rolling label, swapping arrow. */
export function Button({
  href,
  children,
  variant = "solid",
  arrow = true,
  external,
  className,
  onClick,
  type,
}: {
  href?: string;
  children: string;
  variant?: Variant;
  arrow?: boolean;
  external?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const inner = (
    <>
      <span
        className={cn(
          "absolute inset-x-[-10%] bottom-0 -z-10 h-[160%] translate-y-[105%] rounded-[50%] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-[-12%]",
          fills[variant],
        )}
        aria-hidden
      />
      <span className={cn("transition-colors duration-500", variant === "outline" && "group-hover:text-white")}>
        <Roll>{children}</Roll>
      </span>
      {arrow && <ArrowIcon className={cn("transition-colors duration-500", variant === "outline" && "group-hover:text-white")} />}
    </>
  );

  const cls = cn(base, variants[variant], className);

  return (
    <Magnetic strength={0.3} innerStrength={0.15}>
      {href ? (
        <TLink
          href={href}
          className={cls}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {inner}
        </TLink>
      ) : (
        <button type={type ?? "button"} onClick={onClick} className={cls}>
          {inner}
        </button>
      )}
    </Magnetic>
  );
}
