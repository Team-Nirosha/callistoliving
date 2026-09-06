import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, Environment, Lightformer, Preload } from "@react-three/drei";
import { Suspense, useEffect } from "react";
import * as THREE from "three";
import { frame, setState } from "@/lib/store";
import { useQuality } from "@/hooks/useQuality";
import { CameraRig } from "./CameraRig";
import { Hotspots } from "./Hotspots";
import { Interior } from "./Interior";
import { Lighting } from "./Lighting";
import { Particles } from "./Particles";

function PointerTracker() {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      frame.pointerX = (e.clientX / window.innerWidth - 0.5) * 2;
      frame.pointerY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return null;
}

export function Scene() {
  const q = useQuality();

  useEffect(() => {
    const t = setTimeout(() => setState({ loaded: true }), 2600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      <PointerTracker />
      <Canvas
        shadows={q.shadows}
        dpr={q.dpr}
        gl={{ antialias: q.tier !== "low", powerPreference: "high-performance" }}
        camera={{ position: [-11, 1.6, 9], fov: 42, near: 0.1, far: 400 }}
        onCreated={({ gl, scene }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.06;
          scene.fog = new THREE.Fog("#ded2bc", 34, 150);
        }}
      >
        <Suspense fallback={null}>
          <Lighting />
          <Environment resolution={128}>
            <Lightformer intensity={1.4} position={[0, 6, 2]} scale={[14, 8, 1]} color="#fff0da" />
            <Lightformer
              intensity={0.7}
              color="#9fb6d6"
              position={[10, 2, 9]}
              rotation-y={Math.PI / 2}
              scale={[24, 6, 1]}
            />
          </Environment>
          <Interior />
          <Hotspots />
          <Particles count={q.particles} />
          <CameraRig />
          <AdaptiveDpr pixelated={false} />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
