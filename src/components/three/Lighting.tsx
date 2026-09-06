import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { frame, useApp } from "@/lib/store";

export function Lighting() {
  const night = useApp((s) => s.night);
  const sun = useRef<THREE.DirectionalLight>(null);
  const amb = useRef<THREE.AmbientLight>(null);
  const fill = useRef<THREE.HemisphereLight>(null);
  const spot = useRef<THREE.SpotLight>(null);
  const bg = useRef<THREE.Color>(new THREE.Color("#0a0908"));
  const boot = useRef(0);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    boot.current = Math.min(boot.current + dt / 2.2, 1);
    const target = night ? 1 : 0;
    frame.nightMix += (target - frame.nightMix) * (1 - Math.exp(-2.4 * dt));
    const n = frame.nightMix;
    const rise = THREE.MathUtils.smoothstep(boot.current, 0.15, 1);

    if (sun.current) {
      sun.current.intensity = THREE.MathUtils.lerp(2.6, 0.18, n) * rise;
      sun.current.color.set(n > 0.5 ? "#8fa6c6" : "#ffe6c2");
      sun.current.position.set(-26 + n * 40, 16 - n * 6, 24);
    }
    if (amb.current) amb.current.intensity = THREE.MathUtils.lerp(0.75, 0.16, n) * rise;
    if (fill.current) fill.current.intensity = THREE.MathUtils.lerp(0.7, 0.22, n) * rise;
    if (spot.current) spot.current.intensity = THREE.MathUtils.lerp(12, 34, n) * rise;

    bg.current.set(n > 0.5 ? "#07070a" : "#c8bda9").lerp(
      new THREE.Color(n > 0.5 ? "#07070a" : "#c8bda9"),
      1,
    );
    const c = new THREE.Color("#ded2bc").lerp(new THREE.Color("#06060a"), n);
    state.scene.background = c;
    if (state.scene.fog) (state.scene.fog as THREE.Fog).color.copy(c);
  });

  return (
    <>
      <ambientLight ref={amb} color="#f4e6d2" intensity={0.7} />
      <hemisphereLight ref={fill} color="#fff3e2" groundColor="#3a332c" intensity={0.7} />
      <directionalLight
        ref={sun}
        position={[-26, 16, 24]}
        intensity={2.4}
        color="#ffe6c2"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-40}
        shadow-camera-right={90}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
        shadow-camera-far={140}
        shadow-bias={-0.0006}
      />
      <spotLight
        ref={spot}
        position={[0, 4.4, 2]}
        target-position={[0, 0, -3]}
        angle={0.7}
        penumbra={0.9}
        distance={18}
        color="#ffd9ab"
        castShadow
        shadow-bias={-0.001}
      />
      <pointLight position={[45, 2.2, 1]} color="#ffcf9c" intensity={8} distance={12} />
      <pointLight position={[60, 2.6, 6]} color="#a9c4e6" intensity={6} distance={16} />
    </>
  );
}
