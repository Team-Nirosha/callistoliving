import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { frame, useApp } from "@/lib/store";

export function Lighting() {
  const night = useApp((s) => s.night);
  const sun = useRef<THREE.DirectionalLight>(null);
  const amb = useRef<THREE.AmbientLight>(null);
  const fill = useRef<THREE.HemisphereLight>(null);
  const dayColor = useRef(new THREE.Color("#ded2bc"));
  const nightColor = useRef(new THREE.Color("#06060a"));
  const tempColor = useRef(new THREE.Color());
  const sunDayColor = useRef(new THREE.Color("#ffe6c2"));
  const sunNightColor = useRef(new THREE.Color("#8fa6c6"));
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
      sun.current.color.copy(n > 0.5 ? sunNightColor.current : sunDayColor.current);
      sun.current.position.set(-26 + n * 40, 16 - n * 6, 24);
    }
    if (amb.current) amb.current.intensity = THREE.MathUtils.lerp(0.75, 0.16, n) * rise;
    if (fill.current) fill.current.intensity = THREE.MathUtils.lerp(0.7, 0.22, n) * rise;

    tempColor.current.copy(dayColor.current).lerp(nightColor.current, n);
    state.scene.background = tempColor.current;
    if (state.scene.fog) (state.scene.fog as THREE.Fog).color.copy(tempColor.current);
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
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-camera-left={-40}
        shadow-camera-right={90}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
        shadow-camera-far={140}
        shadow-bias={-0.0006}
      />
      {/* Warm bedroom + balcony fill lights — no shadows needed */}
      <pointLight position={[45, 2.2, 1]} color="#ffcf9c" intensity={8} distance={12} />
      <pointLight position={[60, 2.6, 6]} color="#a9c4e6" intensity={6} distance={16} />
    </>
  );
}

