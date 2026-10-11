"use client";

import { useEffect, useRef } from "react";

// Loads three.js only in the browser and hands the canvas to the stage.
export function Stage3D() {
  const canvas = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    let stage = null;
    let cancelled = false;
    const reveal = () => stage && stage.reveal();
    const refresh = () => stage && stage.refresh();

    (async () => {
      try {
        const [THREE, { initStage }] = await Promise.all([import("three"), import("@/lib/stage")]);
        if (cancelled) return;
        stage = initStage(THREE, canvas.current, matchMedia("(prefers-reduced-motion: reduce)").matches);
      } catch {
        stage = null;
      }
      if (cancelled) return;
      if (!stage) {
        root.classList.add("no-gl");
        return;
      }
      if (root.classList.contains("ready")) stage.reveal();
    })();

    addEventListener("pt:ready", reveal);
    addEventListener("pt:refresh", refresh);
    return () => {
      cancelled = true;
      removeEventListener("pt:ready", reveal);
      removeEventListener("pt:refresh", refresh);
      if (stage) stage.dispose();
    };
  }, []);

  return <canvas id="gl" ref={canvas} aria-hidden="true" />;
}
