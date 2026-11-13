export type ShapeId = "blob" | "ring" | "knot" | "capsule" | "octa" | "box" | "pearl";

/** x / y are normalised viewport coords (-1…1, y up); z is world depth; s is a scale multiplier. */
export type Pose = { x: number; y: number; z: number; s: number };

const P = (x: number, y: number, z: number, s: number): Pose => ({ x, y, z, s });

type PoseSet = Record<ShapeId, Pose>;

const ORDER: ShapeId[] = ["blob", "ring", "knot", "capsule", "octa", "box", "pearl"];

/** Free spots around a left-aligned hero headline: right edge, top band and under the title. */
const SLOTS: Pose[] = [
  P(0.98, 0.72, -2, 0.45),
  P(0.3, -0.86, -1.5, 0.5),
  P(-0.05, 0.78, -3, 0.4),
  P(0.99, -0.15, -2.5, 0.45),
  P(0.5, 0.82, -2, 0.35),
  P(0.2, -0.5, 1.2, 0.7),
];

/** One large "feature" shape lower-right; the rest tuck into the free slots. */
function inner(primary: ShapeId): PoseSet {
  const set = {} as PoseSet;
  set[primary] = P(0.7, -0.62, -0.5, 0.85);
  ORDER.filter((id) => id !== primary).forEach((id, i) => {
    set[id] = SLOTS[i];
  });
  return set;
}

const poses: Record<string, PoseSet> = {
  home: {
    blob: P(0.62, 0.02, 0, 1.05),
    ring: P(0.28, -0.78, -1.5, 0.55),
    knot: P(0.92, 0.82, -1.5, 0.55),
    capsule: P(-0.18, 0.92, -3.5, 0.45),
    octa: P(0.98, -0.2, -2.5, 0.5),
    box: P(0.08, 0.5, -3, 0.4),
    pearl: P(0.4, 0.4, 1.5, 0.8),
  },
  about: inner("blob"),
  experience: inner("ring"),
  journey: inner("knot"),
  skills: inner("octa"),
  achievements: inner("capsule"),
  projects: inner("box"),
  blog: inner("capsule"),
  contact: inner("blob"),
};

poses.default = poses.blog;

/** Phone layout: a small cluster in the empty band above the headline. Missing shapes are hidden. */
export const MOBILE_POSES: Partial<Record<ShapeId, Pose>> = {
  blob: P(0.5, 0.74, 0, 0.62),
  knot: P(-0.62, 0.76, -1, 0.4),
  octa: P(0.02, 0.8, -1, 0.3),
};

export function poseFor(route: string): PoseSet {
  if (route === "/") return poses.home;
  const seg = route.split("/")[1];
  return poses[seg] ?? poses.default;
}
