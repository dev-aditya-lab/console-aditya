"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { store } from "@/lib/motion-store";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

/** Mounts the WebGL scene after first paint so it never blocks LCP. */
export function SceneRoot() {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    store.route = pathname;
  }, [pathname]);

  useEffect(() => {
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback;
    const id = idle ? idle(() => setReady(true)) : window.setTimeout(() => setReady(true), 200);
    return () => {
      if (!idle) window.clearTimeout(id);
    };
  }, []);

  return ready ? <Scene /> : null;
}
