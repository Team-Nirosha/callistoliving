import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { frame } from "@/lib/store";

/** Waypoints: [camera position, look-at target] per scroll stop. */
export const WAYPOINTS: { pos: [number, number, number]; look: [number, number, number] }[] = [
  { pos: [-4.5, 1.65, 5.2], look: [0.5, 1.3, -2.6] },
  { pos: [7.5, 1.7, 3.4], look: [15, 1.4, -1] },
  { pos: [22.5, 1.7, 3.0], look: [30, 1.3, -2] },
  { pos: [38, 1.7, 2.4], look: [45, 1.3, -2.5] },
  { pos: [55, 1.75, 3.6], look: [61, 1.4, 5.5] },
  { pos: [74, 6.5, 26], look: [40, 3.5, -2] },
];

function sample(t: number, key: "pos" | "look", out: THREE.Vector3) {
  const n = WAYPOINTS.length - 1;
  const f = THREE.MathUtils.clamp(t, 0, 1) * n;
  const i = Math.min(Math.floor(f), n - 1);
  const k = THREE.MathUtils.smoothstep(f - i, 0, 1);
  const a = WAYPOINTS[i][key];
  const b = WAYPOINTS[i + 1][key];
  return out.set(
    THREE.MathUtils.lerp(a[0], b[0], k),
    THREE.MathUtils.lerp(a[1], b[1], k),
    THREE.MathUtils.lerp(a[2], b[2], k),
  );
}

export function CameraRig({ intro = true }: { intro?: boolean }) {
  const { camera } = useThree();
  const pos = useRef(new THREE.Vector3());
  const look = useRef(new THREE.Vector3());
  const current = useRef(new THREE.Vector3(-11, 1.6, 9));
  const currentLook = useRef(new THREE.Vector3(0.5, 1.3, -2.6));
  const t0 = useRef(0);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    t0.current += dt;
    const time = state.clock.elapsedTime;

    sample(frame.scroll, "pos", pos.current);
    sample(frame.scroll, "look", look.current);

    // cinematic intro dolly
    if (intro) {
      const introK = THREE.MathUtils.clamp((t0.current - 0.9) / 3.2, 0, 1);
      const e = 1 - Math.pow(1 - introK, 3);
      pos.current.x -= (1 - e) * 7;
      pos.current.z += (1 - e) * 4.5;
    }

    // breathing + mouse parallax
    pos.current.x += Math.sin(time * 0.23) * 0.16 + frame.pointerX * 0.9;
    pos.current.y += Math.sin(time * 0.31) * 0.07 - frame.pointerY * 0.45;
    pos.current.z += Math.cos(time * 0.19) * 0.12;
    look.current.y += frame.pointerY * 0.55;
    look.current.x += frame.pointerX * 0.5;

    const k = 1 - Math.exp(-3.2 * dt);
    current.current.lerp(pos.current, k);
    currentLook.current.lerp(look.current, k);
    camera.position.copy(current.current);
    camera.lookAt(currentLook.current);
  });

  return null;
}
