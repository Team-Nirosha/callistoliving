import { useSyncExternalStore } from "react";

export type MaterialKey = "marble" | "wood" | "stone" | "metal" | "glass" | "fabric";
export type CursorMode = "default" | "explore" | "view" | "open" | "drag";

export type AppState = {
  loaded: boolean;
  progress: number;
  night: boolean;
  floor: MaterialKey;
  cursor: CursorMode;
  selected: { title: string; lines: string[] } | null;
};

let state: AppState = {
  loaded: false,
  progress: 0,
  night: false,
  floor: "marble",
  cursor: "default",
  selected: null,
};

const listeners = new Set<() => void>();

export function setState(patch: Partial<AppState>) {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
}

export function getState() {
  return state;
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useApp<T>(selector: (s: AppState) => T): T {
  return useSyncExternalStore(
    subscribe,
    () => selector(state),
    () => selector(state),
  );
}

/** Per-frame values that must never trigger a React render. */
export const frame = {
  scroll: 0,
  pointerX: 0,
  pointerY: 0,
  nightMix: 0,
};
