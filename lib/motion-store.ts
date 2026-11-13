import type Lenis from "lenis";

/**
 * Tiny shared mutable store read every frame by the WebGL scene and
 * written by scroll/pointer listeners. Deliberately not React state —
 * updating it never triggers a render.
 */
export const store = {
  scroll: 0,
  velocity: 0,
  limit: 1,
  mouse: { x: 0, y: 0 }, // -1..1, y up
  route: "/",
  lenis: null as Lenis | null,
};
