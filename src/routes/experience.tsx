import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { CustomCursor } from "@/components/CustomCursor";
import { Navbar } from "@/components/Navbar";

const FloorPlan = lazy(() =>
  import("@/components/three/FloorPlan").then((m) => ({ default: m.FloorPlan })),
);

export const Route = createFileRoute("/experience")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "3D Floor Plan Experience — Callisto Living" },
      {
        name: "description",
        content:
          "Rotate, zoom and pan an interactive 3D apartment. Click any room to fly the camera in and read its materials, style and area.",
      },
      { property: "og:title", content: "3D Floor Plan Experience — Callisto Living" },
      {
        property: "og:description",
        content: "Interactive 3D apartment plan — click a room to fly the camera inside.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ExperiencePage,
});

function ExperiencePage() {
  return (
    <div className="relative h-screen overflow-hidden bg-ink">
      <CustomCursor />
      <Navbar />
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            <p className="eyebrow">Preparing the model…</p>
          </div>
        }
      >
        <FloorPlan />
      </Suspense>
    </div>
  );
}
