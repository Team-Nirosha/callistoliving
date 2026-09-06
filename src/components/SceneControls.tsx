import { materialSpecs } from "@/lib/textures";
import { setState, useApp, type MaterialKey } from "@/lib/store";

const KEYS: MaterialKey[] = ["marble", "wood", "stone", "metal", "glass", "fabric"];

export function DayNightToggle() {
  const night = useApp((s) => s.night);
  return (
    <div className="glass-panel pointer-events-auto flex items-center gap-1 px-1 py-1">
      {(["Day", "Night"] as const).map((m) => {
        const active = (m === "Night") === night;
        return (
          <button
            key={m}
            onClick={() => setState({ night: m === "Night" })}
            onMouseEnter={() => setState({ cursor: "open" })}
            onMouseLeave={() => setState({ cursor: "default" })}
            className={`px-4 py-2 text-[10px] uppercase tracking-[0.3em] transition-colors ${
              active ? "bg-gold/20 text-gold" : "text-sand/60 hover:text-sand"
            }`}
          >
            {m}
          </button>
        );
      })}
    </div>
  );
}

export function MaterialExplorer() {
  const floor = useApp((s) => s.floor);
  return (
    <div className="glass-panel pointer-events-auto w-full max-w-md p-6">
      <p className="eyebrow">Explore Materials</p>
      <h3 className="mt-2 font-display text-3xl text-sand">{materialSpecs[floor].label}</h3>
      <p className="mt-1 text-xs tracking-[0.14em] text-sand/55">{materialSpecs[floor].note}</p>
      <div className="mt-6 grid grid-cols-3 gap-2">
        {KEYS.map((k) => (
          <button
            key={k}
            onClick={() => setState({ floor: k })}
            onMouseEnter={() => setState({ cursor: "open" })}
            onMouseLeave={() => setState({ cursor: "default" })}
            className={`border px-2 py-3 text-[9px] uppercase tracking-[0.24em] transition-all duration-500 ${
              floor === k
                ? "border-gold/70 bg-gold/15 text-gold"
                : "border-sand/15 text-sand/55 hover:border-gold/40 hover:text-sand"
            }`}
          >
            {materialSpecs[k].label}
          </button>
        ))}
      </div>
      <p className="mt-4 text-[10px] tracking-[0.2em] text-sand/40">
        The floor updates live in the 3D scene
      </p>
    </div>
  );
}

export function ObjectPanel() {
  const selected = useApp((s) => s.selected);
  if (!selected || !selected.title) return null;
  return (
    <div className="glass-panel pointer-events-auto fixed bottom-8 left-6 z-[75] w-72 p-6 md:left-12">
      <button
        onClick={() => setState({ selected: null })}
        className="absolute right-4 top-3 text-[10px] uppercase tracking-[0.24em] text-sand/50 hover:text-gold"
      >
        Close
      </button>
      <p className="eyebrow">Selected</p>
      <h4 className="mt-2 font-display text-2xl text-sand">{selected.title}</h4>
      {selected.lines.map((l) => (
        <p key={l} className="mt-1 text-[11px] uppercase tracking-[0.18em] text-sand/55">
          {l}
        </p>
      ))}
    </div>
  );
}
