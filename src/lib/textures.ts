import * as THREE from "three";
import type { MaterialKey } from "./store";

function canvas(size = 256) {
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  return { c, ctx: c.getContext("2d")! };
}

function toTexture(c: HTMLCanvasElement, repeat = 4) {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeat, repeat);
  t.anisotropy = 4;
  return t;
}

function veinPass(
  ctx: CanvasRenderingContext2D,
  size: number,
  count: number,
  color: string,
  width: number,
) {
  ctx.strokeStyle = color;
  for (let i = 0; i < count; i++) {
    ctx.beginPath();
    ctx.lineWidth = width * (0.4 + Math.random() * 0.8);
    let x = Math.random() * size;
    let y = -10;
    ctx.moveTo(x, y);
    while (y < size + 10) {
      x += (Math.random() - 0.5) * 50;
      y += 24 + Math.random() * 32;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
}

function marbleTex() {
  const size = 256;
  const { c, ctx } = canvas(size);
  ctx.fillStyle = "#efece5";
  ctx.fillRect(0, 0, size, size);
  veinPass(ctx, size, 6, "rgba(150,143,130,0.35)", 2.5);
  veinPass(ctx, size, 4, "rgba(90,85,76,0.25)", 1.2);
  veinPass(ctx, size, 8, "rgba(255,255,255,0.45)", 1.8);
  return toTexture(c, 3);
}

function woodTex() {
  const size = 256;
  const { c, ctx } = canvas(size);
  ctx.fillStyle = "#6b4a2f";
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 48; i++) {
    const y = (i / 48) * size;
    ctx.strokeStyle = `rgba(${40 + Math.random() * 60},${25 + Math.random() * 35},${12 + Math.random() * 20},0.4)`;
    ctx.lineWidth = 1 + Math.random() * 2;
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x <= size; x += 32) {
      ctx.lineTo(x, y + Math.sin((x + i * 20) * 0.03) * 2);
    }
    ctx.stroke();
  }
  return toTexture(c, 5);
}

function stoneTex() {
  const size = 256;
  const { c, ctx } = canvas(size);
  ctx.fillStyle = "#8d8981";
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 90; i++) {
    const r = 2 + Math.random() * 12;
    ctx.fillStyle = `rgba(${110 + Math.random() * 60},${105 + Math.random() * 55},${98 + Math.random() * 50},0.28)`;
    ctx.beginPath();
    ctx.arc(Math.random() * size, Math.random() * size, r, 0, Math.PI * 2);
    ctx.fill();
  }
  return toTexture(c, 6);
}

function metalTex() {
  const size = 256;
  const { c, ctx } = canvas(size);
  ctx.fillStyle = "#9d9384";
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 120; i++) {
    const y = Math.random() * size;
    ctx.strokeStyle = `rgba(255,255,255,${Math.random() * 0.14})`;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(size, y + (Math.random() - 0.5) * 2);
    ctx.stroke();
  }
  return toTexture(c, 3);
}

function glassTex() {
  const size = 256;
  const { c, ctx } = canvas(size);
  ctx.fillStyle = "#d8e2e4";
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 12; i++) {
    ctx.strokeStyle = "rgba(255,255,255,0.22)";
    ctx.lineWidth = 4 + Math.random() * 14;
    ctx.beginPath();
    ctx.moveTo(Math.random() * size, 0);
    ctx.lineTo(Math.random() * size, size);
    ctx.stroke();
  }
  return toTexture(c, 2);
}

function fabricTex() {
  const size = 256;
  const { c, ctx } = canvas(size);
  ctx.fillStyle = "#c9bda9";
  ctx.fillRect(0, 0, size, size);
  ctx.strokeStyle = "rgba(120,108,90,0.18)";
  for (let i = 0; i < size; i += 8) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, size);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(size, i);
    ctx.stroke();
  }
  return toTexture(c, 8);
}

const builders: Record<MaterialKey, () => THREE.Texture> = {
  marble: marbleTex,
  wood: woodTex,
  stone: stoneTex,
  metal: metalTex,
  glass: glassTex,
  fabric: fabricTex,
};

export const materialSpecs: Record<
  MaterialKey,
  { label: string; note: string; roughness: number; metalness: number }
> = {
  marble: {
    label: "Marble",
    note: "Italian Calacatta — honed finish",
    roughness: 0.18,
    metalness: 0.02,
  },
  wood: { label: "Wood", note: "Smoked oak — wide plank", roughness: 0.55, metalness: 0 },
  stone: { label: "Stone", note: "Travertine — brushed", roughness: 0.8, metalness: 0 },
  metal: { label: "Metal", note: "Champagne brass — satin", roughness: 0.28, metalness: 0.95 },
  glass: { label: "Glass", note: "Cast glass — low iron", roughness: 0.08, metalness: 0.1 },
  fabric: { label: "Fabric", note: "Belgian linen — natural", roughness: 0.95, metalness: 0 },
};

const cache = new Map<MaterialKey, THREE.Texture>();

export function getTexture(key: MaterialKey) {
  if (!cache.has(key)) cache.set(key, builders[key]());
  return cache.get(key)!;
}
