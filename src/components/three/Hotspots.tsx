import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";
import { setState } from "@/lib/store";

export type Hotspot = {
  id: string;
  position: [number, number, number];
  title: string;
  lines: string[];
};

export const HOTSPOTS: Hotspot[] = [
  { id: "sofa", position: [0, 1.5, -3.4], title: "Italian Leather Sofa", lines: ["Full-grain hide", "Bespoke 4.4m frame"] },
  { id: "marble", position: [2.6, 0.35, 0.6], title: "Italian Marble", lines: ["Natural stone", "Premium honed finish"] },
  { id: "pendant", position: [0, 2.6, -1], title: "Pendant Light", lines: ["Brass finish", "Handcrafted in Milan"] },
  { id: "art", position: [-1, 2.6, -7.4], title: "Commissioned Artwork", lines: ["Oil on linen", "Studio collection"] },
  { id: "table", position: [15, 1.35, -1], title: "Oak Dining Monolith", lines: ["Solid smoked oak", "Seats eight"] },
  { id: "island", position: [30, 1.6, -2], title: "Kitchen Island", lines: ["Book-matched marble", "Brass fittings"] },
  { id: "bed", position: [45, 1.9, -2.5], title: "Belgian Linen Bed", lines: ["Upholstered headboard", "Custom width"] },
  { id: "plant", position: [56, 1.8, 5], title: "Olive Terrace", lines: ["Living specimens", "Terracotta vessels"] },
];

function Spot({ spot }: { spot: Hotspot }) {
  const [hovered, setHovered] = useState(false);
  const ring = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);

  useFrame((s, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = s.clock.elapsedTime;
    if (ring.current) {
      ring.current.lookAt(s.camera.position);
      const target = hovered ? 1.55 : 1 + Math.sin(t * 2) * 0.06;
      ring.current.scale.lerp(new THREE.Vector3(target, target, target), 1 - Math.exp(-8 * dt));
      const m = ring.current.material as THREE.MeshBasicMaterial;
      m.opacity = THREE.MathUtils.lerp(m.opacity, hovered ? 0.95 : 0.4, 1 - Math.exp(-8 * dt));
    }
    if (core.current) core.current.lookAt(s.camera.position);
  });

  return (
    <group position={spot.position}>
      <mesh
        ref={core}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          setState({ cursor: "explore" });
        }}
        onPointerOut={() => {
          setHovered(false);
          setState({ cursor: "default" });
        }}
        onClick={(e) => {
          e.stopPropagation();
          setState({ selected: { title: spot.title, lines: spot.lines } });
        }}
      >
        <circleGeometry args={[0.075, 24]} />
        <meshBasicMaterial color="#f6ecd8" transparent opacity={0.95} depthTest={false} />
      </mesh>
      <mesh ref={ring} renderOrder={2}>
        <ringGeometry args={[0.12, 0.145, 40]} />
        <meshBasicMaterial color="#c9a56a" transparent opacity={0.4} depthTest={false} side={THREE.DoubleSide} />
      </mesh>
      {hovered && (
        <Html center distanceFactor={7} position={[0, 0.45, 0]} zIndexRange={[40, 0]}>
          <div className="pointer-events-none w-56 border border-gold/40 bg-ink/85 px-4 py-3 backdrop-blur-md">
            <p className="font-display text-lg leading-tight tracking-wide text-sand">{spot.title}</p>
            {spot.lines.map((l) => (
              <p key={l} className="mt-1 text-[11px] uppercase tracking-[0.18em] text-sand/60">
                {l}
              </p>
            ))}
          </div>
        </Html>
      )}
    </group>
  );
}

export function Hotspots() {
  return (
    <group>
      {HOTSPOTS.map((s) => (
        <Spot key={s.id} spot={s} />
      ))}
    </group>
  );
}
