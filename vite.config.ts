// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    build: {
      // Raise the chunk size warning threshold — we have intentionally large 3D chunks
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            // Keep Three.js + r3f in a dedicated lazy chunk (already lazy-loaded via Scene)
            if (id.includes("node_modules/three/")) return "three";
            if (
              id.includes("node_modules/@react-three/fiber/") ||
              id.includes("node_modules/@react-three/drei/")
            )
              return "r3f";
            // Keep gsap in its own chunk — loaded only by Sections.tsx
            if (id.includes("node_modules/gsap/")) return "gsap";
            // Keep lucide icons in their own chunk
            if (id.includes("node_modules/lucide-react/")) return "lucide";
          },
        },
      },
    },
  },
});

