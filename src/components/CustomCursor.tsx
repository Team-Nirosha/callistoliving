import { useEffect, useRef } from "react";
import { useApp } from "@/lib/store";

const LABEL: Record<string, string> = {
  default: "",
  explore: "Explore",
  view: "View",
  open: "Open",
  drag: "Drag",
};

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const mode = useApp((s) => s.cursor);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
    };
    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const label = LABEL[mode];

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] hidden md:block">
      <div ref={dot} className="absolute -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-gold" />
      <div
        ref={ring}
        className={`absolute flex items-center justify-center rounded-full border border-gold/60 transition-[width,height,margin,background-color] duration-300 ${
          label
            ? "-ml-[42px] -mt-[42px] h-21 w-21 bg-ink/40 backdrop-blur-sm"
            : "-ml-[18px] -mt-[18px] h-9 w-9"
        }`}
        style={label ? { width: 84, height: 84, marginLeft: -42, marginTop: -42 } : undefined}
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-sand">{label}</span>
      </div>
    </div>
  );
}
