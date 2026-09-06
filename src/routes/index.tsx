import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { CustomCursor } from "@/components/CustomCursor";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Navbar } from "@/components/Navbar";
import { EnquiryPopup } from "@/components/EnquiryPopup";
import { DayNightToggle, ObjectPanel } from "@/components/SceneControls";
import {
  About,
  Contact,
  FAQ,
  Hero,
  Journey,
  MaterialSection,
  Projects,
  RoomPlanner,
  Services,
  Testimonials,
} from "@/components/Sections";
import { frame } from "@/lib/store";

const Scene = lazy(() => import("@/components/three/Scene").then((m) => ({ default: m.Scene })));

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Callisto Living — Premium Interior Design Studio" },
      {
        name: "description",
        content:
          "Callisto Living designs timeless luxury interiors. Walk through a real-time 3D residence — living room to exterior — in your browser.",
      },
      { property: "og:title", content: "Callisto Living — Premium Interior Design Studio" },
      {
        property: "og:description",
        content:
          "A real-time 3D interior experience: scroll to walk from the living room to the exterior of a luxury residence.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("enquiry_popup_dismissed")) {
      return;
    }
    const timer = window.setTimeout(() => setIsEnquiryOpen(true), 500);
    return () => window.clearTimeout(timer);
  }, []);

  const onProgress = useCallback((p: number) => {
    frame.scroll = p;
  }, []);

  return (
    <div className="relative bg-ink">
      <CustomCursor />
      <Navbar onEnquire={() => setIsEnquiryOpen(true)} />
      <Suspense fallback={null}>
        <Scene />
      </Suspense>

      <div className="pointer-events-none fixed bottom-8 right-6 z-[75] md:right-12">
        <DayNightToggle />
      </div>
      <ObjectPanel />
      <EnquiryPopup open={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />

      <main className="relative z-10">
        <Hero onEnquire={() => setIsEnquiryOpen(true)} />
        <Journey onProgress={onProgress} />
        <RoomPlanner onEnquire={() => setIsEnquiryOpen(true)} />
        <MaterialSection />
        <Services />
        <Projects />
        <About />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
    </div>
  );
}
