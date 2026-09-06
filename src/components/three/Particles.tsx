import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { frame } from "@/lib/store";

export function Particles({ count = 700 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      a[i * 3] = -8 + Math.random() * 86;
      a[i * 3 + 1] = Math.random() * 4.6;
      a[i * 3 + 2] = -8 + Math.random() * 18;
    }
    return a;
  }, [count]);

  useFrame((s, delta) => {
    const dt = Math.min(delta, 0.05);
    const pts = ref.current;
    if (!pts) return;
    const arr = pts.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += dt * (0.04 + (i % 5) * 0.01);
      arr[i * 3] += Math.sin(s.clock.elapsedTime * 0.2 + i) * dt * 0.05;
      if (arr[i * 3 + 1] > 4.6) arr[i * 3 + 1] = 0;
    }
    pts.geometry.attributes.position.needsUpdate = true;
    pts.rotation.y = frame.pointerX * 0.02;
    pts.position.y = frame.pointerY * -0.2;
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        color="#e6d3ad"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
