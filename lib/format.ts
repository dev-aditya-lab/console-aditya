// Pure, client-safe types and helpers (no database imports).

export type ProjectItem = {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  order: number;
  createdAt: string;
};

export type BlogItem = {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
};

export function withProtocol(url?: string): string | undefined {
  if (!url) return undefined;
  return /^https?:\/\//.test(url) ? url : `https://${url}`;
}

export function formatDate(input: string, long = false): string {
  try {
    return new Date(input).toLocaleDateString("en-US", {
      year: "numeric",
      month: long ? "long" : "short",
      day: "numeric",
    });
  } catch {
    return input;
  }
}

export function readingTime(text: string): string {
  const words = text?.trim().split(/\s+/).length || 0;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

export function excerpt(text: string, length = 160): string {
  const clean = text.replace(/[#*_`>\-[\]()!]/g, " ").replace(/\s+/g, " ").trim();
  if (clean.length <= length) return clean;
  const clipped = clean.slice(0, length);
  const sp = clipped.lastIndexOf(" ");
  return `${clipped.slice(0, sp > 0 ? sp : length)}…`;
}
