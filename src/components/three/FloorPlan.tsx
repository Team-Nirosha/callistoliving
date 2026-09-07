import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { setState } from "@/lib/store";
import { getTexture } from "@/lib/textures";
import { useQuality } from "@/hooks/useQuality";
import { DayNightToggle } from "@/components/SceneControls";

type Room = {
  id: string;
  name: string;
  x: number;
  z: number;
  w: number;
  d: number;
  material: string;
  style: string;
  area: string;
  color: string;
};

const ROOMS: Room[] = [
  {
    id: "living",
    name: "Living Room",
    x: -4,
    z: -3,
    w: 9,
    d: 7,
    material: "Italian Marble",
    style: "Contemporary Luxury",
    area: "620 sq.ft.",
    color: "#cbbfa8",
  },
  {
    id: "dining",
    name: "Dining Room",
    x: 3.2,
    z: -4.5,
    w: 5.4,
    d: 4,
    material: "Smoked Oak",
    style: "Sculptural Modern",
    area: "340 sq.ft.",
    color: "#bfae90",
  },
  {
    id: "kitchen",
    name: "Kitchen",
    x: 3.2,
    z: -0.5,
    w: 5.4,
    d: 4,
    material: "Calacatta & Brass",
    style: "Minimal Utility",
    area: "280 sq.ft.",
    color: "#d3c9b6",
  },
  {
    id: "bedroom",
    name: "Bedroom",
    x: -4.5,
    z: 4.5,
    w: 8,
    d: 6,
    material: "Belgian Linen",
    style: "Soft Brutalist",
    area: "410 sq.ft.",
    color: "#c2b39a",
  },
  {
    id: "bathroom",
    name: "Bathroom",
    x: 2.6,
    z: 3.6,
    w: 4.2,
    d: 4.2,
    material: "Travertine",
    style: "Spa Minimal",
    area: "150 sq.ft.",
    color: "#b9b2a4",
  },
  {
    id: "balcony",
    name: "Balcony",
    x: 2.9,
    z: 7.6,
    w: 12,
    d: 3.4,
    material: "Travertine Deck",
    style: "Open Air",
    area: "180 sq.ft.",
    color: "#a89e8c",
  },
];

function RoomBlock({
  room,
  active,
  onSelect,
}: {
  room: Room;
  active: boolean;
  onSelect: (r: Room) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const wallH = 1.1;
  return (
    <group position={[room.x, 0, room.z]}>
      <mesh
        receiveShadow
        rotation-x={-Math.PI / 2}
        position={[0, 0.02, 0]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          setState({ cursor: "open" });
        }}
        onPointerOut={() => {
          setHovered(false);
          setState({ cursor: "default" });
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(room);
        }}
      >
        <planeGeometry args={[room.w, room.d]} />
        <meshStandardMaterial
          map={getTexture(room.id === "bedroom" ? "wood" : "marble")}
          color={hovered || active ? "#ffffff" : room.color}
          roughness={0.35}
          emissive="#c9a56a"
          emissiveIntensity={hovered || active ? 0.16 : 0}
        />
      </mesh>
      {[
        [0, -room.d / 2, room.w, 0.12],
        [0, room.d / 2, room.w, 0.12],
        [-room.w / 2, 0, 0.12, room.d],
        [room.w / 2, 0, 0.12, room.d],
      ].map(([x, z, w, d], i) => (
        <mesh key={i} position={[x, wallH / 2, z]} castShadow receiveShadow>
          <boxGeometry args={[w, wallH, d]} />
          <meshStandardMaterial color="#efe7d8" roughness={0.9} />
        </mesh>
      ))}
      <Html center position={[0, 1.6, 0]} distanceFactor={16} zIndexRange={[30, 0]}>
        <div
          className={`pointer-events-none whitespace-nowrap text-[11px] uppercase tracking-[0.3em] transition-colors ${
            hovered || active ? "text-gold" : "text-ink/70"
          }`}
        >
          {room.name}
        </div>
      </Html>
    </group>
  );
}

function FlyCamera({ target }: { target: Room | null }) {
  const { camera } = useThree();
  const controls = useRef<OrbitControlsImpl>(null);
  const want = useRef(new THREE.Vector3(14, 14, 16));
  const wantTarget = useRef(new THREE.Vector3(0, 0, 0));
  const animating = useRef(false);

  if (target) {
    want.current.set(target.x + 3.2, 3.4, target.z + 5.2);
    wantTarget.current.set(target.x, 0.6, target.z);
    animating.current = true;
  }

  useFrame((_, delta) => {
    if (!animating.current || !controls.current) return;
    const k = 1 - Math.exp(-2.6 * Math.min(delta, 0.05));
    camera.position.lerp(want.current, k);
    controls.current.target.lerp(wantTarget.current, k);
    controls.current.update();
    if (camera.position.distanceTo(want.current) < 0.05) animating.current = false;
  });

  return (
    <OrbitControls
      ref={controls}
      enableDamping
      dampingFactor={0.08}
      minDistance={4}
      maxDistance={40}
      maxPolarAngle={Math.PI / 2.15}
      onStart={() => {
        animating.current = false;
        setState({ cursor: "drag" });
      }}
      onEnd={() => setState({ cursor: "default" })}
    />
  );
}

export function FloorPlan() {
  const [active, setActive] = useState<Room | null>(null);
  const [fly, setFly] = useState<Room | null>(null);
  const q = useQuality();

  const select = (r: Room) => {
    setActive(r);
    setFly(r);
    setTimeout(() => setFly(null), 60);
  };

  return (
    <div className="relative h-screen">
      <Canvas
        shadows={q.shadows}
        dpr={q.dpr}
        camera={{ position: [14, 14, 16], fov: 42 }}
        onCreated={({ gl, scene }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          scene.background = new THREE.Color("#15130f");
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.75} color="#f6e9d6" />
          <hemisphereLight intensity={0.5} color="#fff2df" groundColor="#2a251f" />
          <directionalLight
            position={[12, 18, 10]}
            intensity={2.1}
            color="#ffe7c6"
            castShadow
            shadow-mapSize-width={512}
            shadow-mapSize-height={512}
          />
          {/* Lightweight IBL substitute — avoids gainmap-js dependency */}
          <hemisphereLight args={["#fff1dd", "#2a251f", 1.2]} position={[0, 8, 2]} />
          <mesh rotation-x={-Math.PI / 2} position={[0, -0.02, 0]} receiveShadow>
            <planeGeometry args={[60, 60]} />
            <meshStandardMaterial color="#1d1a16" roughness={1} />
          </mesh>
          {ROOMS.map((r) => (
            <RoomBlock key={r.id} room={r} active={active?.id === r.id} onSelect={select} />
          ))}
          <FlyCamera target={fly} />
        </Suspense>
      </Canvas>

      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 pt-28 md:p-12 md:pt-32">
        <div>
          <p className="eyebrow">Interactive Model</p>
          <h1 className="mt-3 font-display text-4xl text-sand md:text-6xl">
            The Apartment <span className="italic text-gold">in 3D</span>
          </h1>
          <p className="mt-3 max-w-sm text-xs tracking-[0.16em] text-sand/55">
            Drag to rotate · Scroll to zoom · Right-drag to pan · Click a room to fly inside
          </p>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-6">
          {active ? (
            <div className="glass-panel pointer-events-auto w-72 p-6">
              <p className="eyebrow">Selected Room</p>
              <h2 className="mt-2 font-display text-3xl text-sand">{active.name}</h2>
              {[
                ["Material", active.material],
                ["Style", active.style],
                ["Area", active.area],
              ].map(([k, v]) => (
                <div key={k} className="mt-3">
                  <p className="eyebrow">{k}</p>
                  <p className="text-sm tracking-wide text-sand/85">{v}</p>
                </div>
              ))}
            </div>
          ) : (
            <div />
          )}
          <div className="pointer-events-auto flex flex-wrap gap-2">
            {ROOMS.map((r) => (
              <button
                key={r.id}
                onClick={() => select(r)}
                className={`border px-4 py-3 text-[9px] uppercase tracking-[0.24em] transition-colors ${
                  active?.id === r.id
                    ? "border-gold/70 bg-gold/15 text-gold"
                    : "border-sand/20 text-sand/60 hover:border-gold/50 hover:text-sand"
                }`}
              >
                {r.name}
              </button>
            ))}
            <DayNightToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
