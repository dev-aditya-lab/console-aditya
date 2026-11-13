"use client";

import { usePathname } from "next/navigation";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Cursor } from "@/components/motion/Cursor";
import { TransitionProvider } from "@/components/motion/TransitionProvider";
import { SceneRoot } from "@/components/three/SceneRoot";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

/** Wraps every public page with smooth scroll, the WebGL backdrop, nav, transitions and footer. Admin stays untouched. */
export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return <>{children}</>;

  return (
    <TransitionProvider>
      <SmoothScroll />
      <Cursor />
      <SceneRoot />
      <Nav />
      <main className="relative z-10">{children}</main>
      <Footer />
    </TransitionProvider>
  );
}
