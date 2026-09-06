import { useMemo } from "react";

export type Quality = {
  tier: "low" | "medium" | "high";
  dpr: [number, number];
  shadows: boolean;
  particles: number;
};

/** Device-based quality tiering: phones get fewer particles, no shadows, lower DPR. */
export function useQuality(): Quality {
  return useMemo(() => {
    if (typeof window === "undefined")
      return { tier: "high", dpr: [1, 1.6], shadows: true, particles: 700 };
    const w = window.innerWidth;
    const cores = navigator.hardwareConcurrency ?? 4;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (w < 768 || (coarse && cores <= 4))
      return { tier: "low", dpr: [1, 1.3], shadows: false, particles: 220 };
    if (w < 1280 || cores <= 6)
      return { tier: "medium", dpr: [1, 1.5], shadows: true, particles: 420 };
    return { tier: "high", dpr: [1, 1.8], shadows: true, particles: 750 };
  }, []);
}
