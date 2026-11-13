"use client";

import { useEffect, useLayoutEffect, useState } from "react";

export const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function canHover(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

/** True once mounted on the client and the user can hover with a precise pointer. */
export function useCanHover(): boolean {
  const [v, setV] = useState(false);
  useEffect(() => setV(canHover()), []);
  return v;
}
