import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { frame } from "@/lib/store";

export function Particles({ count = 300 }: { count?: number }) {
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

  useFrame((s) => {
    // Skip animation when tab is not visible — saves GPU/battery
    if (document.hidden) return;
    const pts = ref.current;
    if (!pts) return;
    const t = s.clock.elapsedTime;
    pts.rotation.y = t * 0.015 + frame.pointerX * 0.02;
    pts.position.y = Math.sin(t * 0.25) * 0.08 + frame.pointerY * -0.15;
    pts.position.x = Math.cos(t * 0.18) * 0.05;
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

