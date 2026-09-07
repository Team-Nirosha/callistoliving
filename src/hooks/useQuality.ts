import { useMemo } from "react";

export type Quality = {
  tier: "low" | "medium" | "high";
  dpr: [number, number];
  shadows: boolean;
  particles: number;
};

/**
 * Device-based quality tiering.
 * - Phones (coarse pointer, narrow viewport, few cores) → low
 * - Mid-range tablets/laptops → medium
 * - High-end desktops → high
 * - prefers-reduced-motion → particles disabled, all tiers
 */
export function useQuality(): Quality {
  return useMemo(() => {
    if (typeof window === "undefined")
      return { tier: "high", dpr: [1, 1.5], shadows: true, particles: 420 };

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const w = window.innerWidth;
    const cores = navigator.hardwareConcurrency ?? 4;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    // Detect high-DPR displays (retina) — lower render res to compensate
    const hiDpr = (window.devicePixelRatio ?? 1) > 1.5;

    const particles = reducedMotion ? 0 : undefined;

    if (w < 768 || (coarse && cores <= 4)) {
      return {
        tier: "low",
        dpr: [0.75, 1.0],
        shadows: false,
        particles: particles ?? 120,
      };
    }
    if (w < 1280 || cores <= 6 || (coarse && hiDpr)) {
      return {
        tier: "medium",
        dpr: [1, 1.25],
        shadows: true,
        particles: particles ?? 240,
      };
    }
    return {
      tier: "high",
      dpr: [1, hiDpr ? 1.25 : 1.5],
      shadows: true,
      particles: particles ?? 380,
    };
  }, []);
}

