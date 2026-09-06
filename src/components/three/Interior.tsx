import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { frame, setState, useApp } from "@/lib/store";
import { getTexture, materialSpecs } from "@/lib/textures";

export const ZONES = [
  { key: "living", name: "Living Room", x: 0, area: "620 sq.ft.", style: "Contemporary Luxury" },
  { key: "dining", name: "Dining Room", x: 15, area: "340 sq.ft.", style: "Sculptural Modern" },
  { key: "kitchen", name: "Kitchen", x: 30, area: "280 sq.ft.", style: "Minimal Utility" },
  { key: "bedroom", name: "Bedroom", x: 45, area: "410 sq.ft.", style: "Soft Brutalist" },
  { key: "balcony", name: "Balcony", x: 60, area: "180 sq.ft.", style: "Open Air" },
  { key: "exterior", name: "Exterior", x: 75, area: "—", style: "Facade" },
] as const;

const WARM = "#e8dfd0";
const DARKWOOD = "#2b2320";
const BLACK = "#141210";
const GOLD = "#c9a56a";

type ObjInfo = { title: string; lines: string[] };

function useInteractive(info: ObjInfo) {
  return {
    onPointerOver: (e: any) => {
      e.stopPropagation();
      setState({ cursor: "explore" });
    },
    onPointerOut: () => setState({ cursor: "default" }),
    onClick: (e: any) => {
      e.stopPropagation();
      setState({ selected: info });
    },
  };
}

function Box({
  args,
  position,
  rotation,
  color,
  roughness = 0.7,
  metalness = 0,
  info,
}: {
  args: [number, number, number];
  position: [number, number, number];
  rotation?: [number, number, number];
  color: string;
  roughness?: number;
  metalness?: number;
  info?: ObjInfo;
}) {
  const handlers = useInteractive(info ?? { title: "", lines: [] });
  return (
    <mesh
      position={position}
      rotation={rotation}
      castShadow
      receiveShadow
      {...(info ? handlers : {})}
    >
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
    </mesh>
  );
}

function Sofa({ position }: { position: [number, number, number] }) {
  const g = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (g.current) g.current.position.y = position[1] + Math.sin(s.clock.elapsedTime * 0.6) * 0.012;
  });
  const info = { title: "Sofa", lines: ["Italian leather", "Custom design", "Hand-stitched frame"] };
  return (
    <group ref={g} position={position}>
      <Box args={[4.4, 0.5, 1.7]} position={[0, 0.42, 0]} color="#3b342e" roughness={0.85} info={info} />
      <Box args={[4.4, 1.0, 0.35]} position={[0, 0.9, -0.7]} color="#463d35" roughness={0.85} info={info} />
      <Box args={[0.35, 0.7, 1.7]} position={[-2.0, 0.75, 0]} color="#463d35" roughness={0.85} info={info} />
      <Box args={[0.35, 0.7, 1.7]} position={[2.0, 0.75, 0]} color="#463d35" roughness={0.85} info={info} />
      <Box args={[0.9, 0.22, 0.8]} position={[-1.1, 0.76, 0.05]} color="#8d7f6c" roughness={0.95} info={info} />
      <Box args={[0.9, 0.22, 0.8]} position={[0.9, 0.76, 0.05]} color="#a3947e" roughness={0.95} info={info} />
      {[-2.0, 2.0].map((x) =>
        [-0.6, 0.6].map((z) => (
          <mesh key={`${x}${z}`} position={[x, 0.09, z]} castShadow>
            <cylinderGeometry args={[0.05, 0.05, 0.18, 12]} />
            <meshStandardMaterial color={GOLD} metalness={0.9} roughness={0.3} />
          </mesh>
        )),
      )}
    </group>
  );
}

function CoffeeTable({ position }: { position: [number, number, number] }) {
  const info = { title: "Coffee Table", lines: ["Natural stone", "Solid travertine base"] };
  const handlers = useInteractive(info);
  const deco = useRef<THREE.Mesh>(null);
  useFrame((s, d) => {
    if (deco.current) deco.current.rotation.y += d * 0.25 + Math.sin(s.clock.elapsedTime) * 0.0002;
  });
  return (
    <group position={position}>
      <mesh position={[0, 0.42, 0]} castShadow receiveShadow {...handlers}>
        <cylinderGeometry args={[1.05, 1.05, 0.1, 48]} />
        <meshStandardMaterial map={getTexture("stone")} color="#d9d3c6" roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.2, 0]} castShadow {...handlers}>
        <cylinderGeometry args={[0.35, 0.5, 0.4, 32]} />
        <meshStandardMaterial map={getTexture("stone")} color="#cfc8ba" roughness={0.7} />
      </mesh>
      <mesh ref={deco} position={[0, 0.6, 0]} castShadow>
        <torusKnotGeometry args={[0.16, 0.05, 90, 12]} />
        <meshStandardMaterial color={GOLD} metalness={1} roughness={0.22} />
      </mesh>
    </group>
  );
}

function Pendant({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const g = useRef<THREE.Group>(null);
  const light = useRef<THREE.PointLight>(null);
  const info = { title: "Pendant Light", lines: ["Brass finish", "Handcrafted", "Dimmable warm LED"] };
  const handlers = useInteractive(info);
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (g.current) {
      g.current.rotation.z = Math.sin(t * 0.5) * 0.035;
      g.current.rotation.x = Math.cos(t * 0.37) * 0.025;
    }
    if (light.current)
      light.current.intensity = (2 + Math.sin(t * 1.6) * 0.12) * (0.35 + frame.nightMix * 1.5) * 6;
  });
  return (
    <group ref={g} position={position} scale={scale}>
      <mesh position={[0, -0.9, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 1.8, 6]} />
        <meshStandardMaterial color="#2a2622" />
      </mesh>
      <mesh position={[0, -1.9, 0]} castShadow {...handlers}>
        <coneGeometry args={[0.42, 0.5, 28, 1, true]} />
        <meshStandardMaterial color={GOLD} metalness={1} roughness={0.25} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, -2.05, 0]}>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshStandardMaterial color="#fff2d8" emissive="#ffd9a0" emissiveIntensity={3} />
      </mesh>
      <pointLight ref={light} position={[0, -2.1, 0]} color="#ffd7a0" distance={11} decay={2} castShadow={false} />
    </group>
  );
}

function Plant({ position }: { position: [number, number, number] }) {
  const g = useRef<THREE.Group>(null);
  const info = { title: "Olive Tree", lines: ["Living specimen", "Terracotta vessel"] };
  const handlers = useInteractive(info);
  const leaves = useMemo(
    () =>
      Array.from({ length: 16 }, () => ({
        p: [
          (Math.random() - 0.5) * 1.1,
          1.1 + Math.random() * 1.2,
          (Math.random() - 0.5) * 1.1,
        ] as [number, number, number],
        r: [Math.random() * 3, Math.random() * 3, Math.random() * 3] as [number, number, number],
        s: 0.3 + Math.random() * 0.35,
      })),
    [],
  );
  useFrame((s) => {
    if (g.current) g.current.rotation.z = Math.sin(s.clock.elapsedTime * 0.8) * 0.02;
  });
  return (
    <group position={position} {...handlers}>
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.35, 0.28, 0.7, 24]} />
        <meshStandardMaterial color="#8c6b52" roughness={0.9} />
      </mesh>
      <group ref={g}>
        <mesh position={[0, 1.0, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.07, 1.0, 8]} />
          <meshStandardMaterial color="#4a3b2c" roughness={1} />
        </mesh>
        {leaves.map((l, i) => (
          <mesh key={i} position={l.p} rotation={l.r} scale={l.s} castShadow>
            <icosahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color={i % 3 === 0 ? "#4e6046" : "#5d7051"} roughness={0.9} flatShading />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function Curtain({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => new THREE.PlaneGeometry(2.2, 5, 18, 2), []);
  const base = useMemo(() => Float32Array.from(geo.attributes.position.array), [geo]);
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = base[i * 3];
      const y = base[i * 3 + 1];
      pos.setZ(i, Math.sin(x * 3 + t * 0.9) * 0.12 * ((5 - (y + 2.5)) / 5 + 0.3));
    }
    pos.needsUpdate = true;
    if (ref.current) ref.current.rotation.y = Math.sin(t * 0.3) * 0.02;
  });
  return (
    <mesh ref={ref} geometry={geo} position={position} castShadow>
      <meshStandardMaterial
        map={getTexture("fabric")}
        color="#ded4c2"
        roughness={1}
        side={THREE.DoubleSide}
        transparent
        opacity={0.94}
      />
    </mesh>
  );
}

function Artwork({ position, rotation }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  const info = { title: "Artwork", lines: ["Commissioned canvas", "Oil on linen, 2024"] };
  const handlers = useInteractive(info);
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow {...handlers}>
        <boxGeometry args={[2.6, 1.7, 0.08]} />
        <meshStandardMaterial color="#241f1b" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[2.3, 1.4]} />
        <meshStandardMaterial color="#7d6c56" roughness={0.9} />
      </mesh>
      <mesh position={[0, -0.25, 0.06]}>
        <planeGeometry args={[2.3, 0.55]} />
        <meshStandardMaterial color="#3c332a" roughness={0.9} />
      </mesh>
    </group>
  );
}

function Shell({ floorTex }: { floorTex: THREE.Texture }) {
  const spec = materialSpecs[useApp((s) => s.floor)];
  return (
    <group>
      {/* floor */}
      <mesh rotation-x={-Math.PI / 2} position={[36, 0, 0]} receiveShadow>
        <planeGeometry args={[110, 22]} />
        <meshStandardMaterial
          map={floorTex}
          color="#ffffff"
          roughness={spec.roughness}
          metalness={spec.metalness}
        />
      </mesh>
      {/* ceiling */}
      <mesh rotation-x={Math.PI / 2} position={[30, 4.6, 0]} receiveShadow>
        <planeGeometry args={[74, 22]} />
        <meshStandardMaterial color={WARM} roughness={0.95} />
      </mesh>
      {/* back wall */}
      <mesh position={[30, 2.3, -8]} receiveShadow>
        <planeGeometry args={[74, 8]} />
        <meshStandardMaterial color={WARM} roughness={0.95} />
      </mesh>
      {/* front wall with window openings */}
      {[-4.6, 10, 25, 40].map((x) => (
        <mesh key={x} position={[x, 2.3, 8]} rotation-y={Math.PI} receiveShadow>
          <planeGeometry args={[6, 8]} />
          <meshStandardMaterial color={WARM} roughness={0.95} />
        </mesh>
      ))}
      {/* end wall */}
      <mesh position={[-8, 2.3, 0]} rotation-y={Math.PI / 2} receiveShadow>
        <planeGeometry args={[16, 8]} />
        <meshStandardMaterial color={BLACK} roughness={0.9} />
      </mesh>
      {/* partitions between zones */}
      {[22, 37, 52].map((x) => (
        <group key={x}>
          <mesh position={[x, 2.3, -5]} rotation-y={Math.PI / 2} receiveShadow castShadow>
            <planeGeometry args={[6, 4.6] as any} />
            <meshStandardMaterial color="#ded3c1" roughness={0.95} side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}
      {/* glazing mullions */}
      {[1, 6, 17, 21, 32, 36, 47, 51].map((x) => (
        <mesh key={x} position={[x, 2.3, 8]} castShadow>
          <boxGeometry args={[0.12, 4.6, 0.12]} />
          <meshStandardMaterial color={BLACK} metalness={0.6} roughness={0.4} />
        </mesh>
      ))}
      {/* skirting */}
      <mesh position={[30, 0.08, -7.9]}>
        <boxGeometry args={[74, 0.16, 0.12]} />
        <meshStandardMaterial color={DARKWOOD} roughness={0.6} />
      </mesh>
    </group>
  );
}

function Dining() {
  const info = { title: "Dining Table", lines: ["Solid oak monolith", "Seats eight"] };
  const handlers = useInteractive(info);
  return (
    <group position={[15, 0, -1]}>
      <mesh position={[0, 0.76, 0]} castShadow receiveShadow {...handlers}>
        <boxGeometry args={[4.6, 0.12, 1.5]} />
        <meshStandardMaterial map={getTexture("wood")} color="#c8b79b" roughness={0.45} />
      </mesh>
      {[-2, 2].map((x) => (
        <mesh key={x} position={[x, 0.38, 0]} castShadow>
          <boxGeometry args={[0.16, 0.76, 1.3]} />
          <meshStandardMaterial color={DARKWOOD} roughness={0.5} />
        </mesh>
      ))}
      {[-1.5, -0.5, 0.5, 1.5].map((x) =>
        [-1.15, 1.15].map((z) => (
          <group key={`${x}-${z}`} position={[x, 0, z]}>
            <mesh position={[0, 0.45, 0]} castShadow>
              <boxGeometry args={[0.5, 0.08, 0.5]} />
              <meshStandardMaterial color="#5a4d40" roughness={0.8} />
            </mesh>
            <mesh position={[0, 0.75, z > 0 ? 0.22 : -0.22]} castShadow>
              <boxGeometry args={[0.5, 0.62, 0.07]} />
              <meshStandardMaterial color="#5a4d40" roughness={0.8} />
            </mesh>
          </group>
        )),
      )}
      <Pendant position={[-1, 4.5, 0]} scale={0.8} />
      <Pendant position={[1, 4.5, 0]} scale={0.8} />
    </group>
  );
}

function Kitchen() {
  const info = { title: "Kitchen Island", lines: ["Book-matched marble", "Integrated brass fittings"] };
  const handlers = useInteractive(info);
  return (
    <group position={[30, 0, -2]}>
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow {...handlers}>
        <boxGeometry args={[4.2, 0.9, 1.6]} />
        <meshStandardMaterial color="#241f1b" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.94, 0]} castShadow {...handlers}>
        <boxGeometry args={[4.5, 0.09, 1.8]} />
        <meshStandardMaterial map={getTexture("marble")} color="#ffffff" roughness={0.2} />
      </mesh>
      <mesh position={[0, 2.9, -5.6]} castShadow receiveShadow>
        <boxGeometry args={[6.5, 2.2, 0.6]} />
        <meshStandardMaterial color="#2c2622" roughness={0.55} />
      </mesh>
      <mesh position={[0, 1.05, -5.6]} castShadow receiveShadow>
        <boxGeometry args={[6.5, 2.1, 0.7]} />
        <meshStandardMaterial map={getTexture("wood")} color="#b09a7d" roughness={0.5} />
      </mesh>
      {[-1.2, 1.2].map((x) => (
        <mesh key={x} position={[x, 1.2, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.5, 12]} />
          <meshStandardMaterial color={GOLD} metalness={1} roughness={0.25} />
        </mesh>
      ))}
      <Pendant position={[-1.3, 4.5, 0]} scale={0.7} />
      <Pendant position={[1.3, 4.5, 0]} scale={0.7} />
    </group>
  );
}

function Bedroom() {
  const info = { title: "Bed", lines: ["Belgian linen", "Upholstered headboard"] };
  const handlers = useInteractive(info);
  return (
    <group position={[45, 0, -2.5]}>
      <mesh position={[0, 0.3, 0]} castShadow receiveShadow {...handlers}>
        <boxGeometry args={[4.2, 0.6, 4.6]} />
        <meshStandardMaterial color="#3a332c" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.72, 0.2]} castShadow {...handlers}>
        <boxGeometry args={[4.0, 0.3, 4.0]} />
        <meshStandardMaterial map={getTexture("fabric")} color="#efe7d8" roughness={1} />
      </mesh>
      <mesh position={[0, 1.25, -2.3]} castShadow {...handlers}>
        <boxGeometry args={[4.4, 1.9, 0.3]} />
        <meshStandardMaterial map={getTexture("fabric")} color="#b9a98f" roughness={1} />
      </mesh>
      {[-1.0, 1.0].map((x) => (
        <mesh key={x} position={[x, 0.95, -1.6]} rotation-x={-0.25} castShadow>
          <boxGeometry args={[1.4, 0.22, 0.7]} />
          <meshStandardMaterial color="#ffffff" roughness={1} />
        </mesh>
      ))}
      {[-2.7, 2.7].map((x) => (
        <mesh key={x} position={[x, 0.3, -2.0]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 0.6, 0.8]} />
          <meshStandardMaterial map={getTexture("wood")} color="#c3ae8e" roughness={0.5} />
        </mesh>
      ))}
      <Artwork position={[0, 3.0, -7.85]} />
    </group>
  );
}

function Balcony() {
  return (
    <group position={[60, 0, 0]}>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.02, 3]} receiveShadow>
        <planeGeometry args={[12, 9]} />
        <meshStandardMaterial map={getTexture("stone")} color="#cfc7b6" roughness={0.9} />
      </mesh>
      {[-6, 6].map((x) => (
        <mesh key={x} position={[x, 0.6, 7.4]} castShadow>
          <boxGeometry args={[0.1, 1.2, 0.1]} />
          <meshStandardMaterial color={BLACK} metalness={0.5} roughness={0.5} />
        </mesh>
      ))}
      <mesh position={[0, 0.6, 7.4]}>
        <boxGeometry args={[12, 1.2, 0.03]} />
        <meshPhysicalMaterial
          color="#cfe0e2"
          transparent
          opacity={0.25}
          roughness={0.05}
          metalness={0}
        />
      </mesh>
      <mesh position={[0, 1.22, 7.4]}>
        <boxGeometry args={[12.2, 0.07, 0.14]} />
        <meshStandardMaterial color={GOLD} metalness={1} roughness={0.3} />
      </mesh>
      <Plant position={[-4, 0, 5]} />
      <Plant position={[4.2, 0, 5.6]} />
      <group position={[1.5, 0, 3.5]}>
        <mesh position={[0, 0.42, 0]} castShadow>
          <cylinderGeometry args={[0.7, 0.7, 0.08, 32]} />
          <meshStandardMaterial map={getTexture("stone")} color="#ddd6c7" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.2, 0.4, 16]} />
          <meshStandardMaterial color={BLACK} roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
}

function Exterior() {
  const towers = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        x: 70 + Math.random() * 90,
        z: -60 + Math.random() * 120,
        h: 6 + Math.random() * 32,
        w: 4 + Math.random() * 7,
      })).filter((t) => Math.abs(t.z) > 12 || t.x > 95),
    [],
  );
  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} position={[100, -0.05, 0]} receiveShadow>
        <planeGeometry args={[300, 300]} />
        <meshStandardMaterial color="#1b1917" roughness={1} />
      </mesh>
      {towers.map((t, i) => (
        <mesh key={i} position={[t.x, t.h / 2, t.z]} castShadow receiveShadow>
          <boxGeometry args={[t.w, t.h, t.w]} />
          <meshStandardMaterial
            color="#26221f"
            emissive="#f0c98a"
            emissiveIntensity={0.06}
            roughness={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

export function Interior() {
  const floor = useApp((s) => s.floor);
  const tex = getTexture(floor);
  return (
    <group onPointerMissed={() => setState({ selected: null })}>
      <Shell floorTex={tex} />
      {/* LIVING */}
      <Sofa position={[0, 0, -3.4]} />
      <CoffeeTable position={[0, 0, -0.6]} />
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.012, -1.4]} receiveShadow>
        <planeGeometry args={[8, 6]} />
        <meshStandardMaterial map={getTexture("fabric")} color="#b8a98f" roughness={1} />
      </mesh>
      <Artwork position={[-1, 2.6, -7.85]} />
      <Plant position={[4.6, 0, -5.5]} />
      <Plant position={[-5.4, 0, 1.8]} />
      <Pendant position={[0, 4.5, -1]} />
      <Curtain position={[-2.4, 2.4, 7.6]} />
      <Curtain position={[8.4, 2.4, 7.6]} />
      <Box
        args={[3.2, 0.5, 0.6]}
        position={[-6.4, 0.7, -6.4]}
        color="#241f1b"
        roughness={0.5}
        info={{ title: "Console", lines: ["Blackened oak", "Wall-mounted"] }}
      />
      <Dining />
      <Kitchen />
      <Bedroom />
      <Balcony />
      <Exterior />
    </group>
  );
}
