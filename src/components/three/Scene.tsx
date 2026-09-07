import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
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

/** Lightweight IBL substitute: 3 hemisphere lights cover warm/cool sky + fill */
function AmbientEnvironment() {
  return (
    <>
      {/* Warm overhead sky — mimics the top Lightformer */}
      <hemisphereLight args={["#fff0da", "#2a2218", 1.4]} position={[0, 6, 2]} />
      {/* Cool-blue side fill — mimics the lateral Lightformer */}
      <hemisphereLight args={["#9fb6d6", "#1a1e28", 0.7]} position={[10, 2, 9]} />
    </>
  );
}

export function Scene() {
  const q = useQuality();

  return (
    <div className="fixed inset-0 z-0 transition-opacity duration-700">
      <PointerTracker />
      <Canvas
        shadows={q.shadows}
        dpr={q.dpr}
        gl={{
          antialias: q.tier !== "low",
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        camera={{ position: [-11, 1.6, 9], fov: 42, near: 0.1, far: 400 }}
        onCreated={({ gl, scene }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.06;
          scene.fog = new THREE.Fog("#ded2bc", 34, 150);
          setState({ loaded: true });
        }}
      >
        <Suspense fallback={null}>
          <Lighting />
          <AmbientEnvironment />
          <Interior />
          <Hotspots />
          <Particles count={q.particles} />
          <CameraRig />
          <AdaptiveDpr pixelated={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}

