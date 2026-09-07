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
  const [shouldLoad3D, setShouldLoad3D] = useState(false);

  useEffect(() => {
    // Progressive chunk loading: render the Hero, typography, and navigation immediately without blocking JS
    if (typeof window === "undefined") return;
    const loadTimeout = window.setTimeout(() => {
      if ("requestIdleCallback" in window) {
        (window as any).requestIdleCallback(() => setShouldLoad3D(true), { timeout: 1500 });
      } else {
        setShouldLoad3D(true);
      }
    }, 150);

    return () => window.clearTimeout(loadTimeout);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("enquiry_popup_dismissed")) {
      return;
    }
    // Defer enquiry popup so it doesn't interrupt or lag the initial landing experience
    const timer = window.setTimeout(() => setIsEnquiryOpen(true), 15000);
    return () => window.clearTimeout(timer);
  }, []);

  const onProgress = useCallback((p: number) => {
    frame.scroll = p;
  }, []);

  return (
    <div className="relative bg-ink overflow-x-hidden w-full max-w-[100vw]">
      <CustomCursor />
      <Navbar onEnquire={() => setIsEnquiryOpen(true)} />
      {shouldLoad3D ? (
        <Suspense fallback={<div className="fixed inset-0 z-0 bg-ink" />}>
          <Scene />
        </Suspense>
      ) : (
        <div className="fixed inset-0 z-0 bg-ink" />
      )}

      <div className="pointer-events-none fixed bottom-8 right-6 z-[75] md:right-12">
        <DayNightToggle />
      </div>
      <ObjectPanel />
      <EnquiryPopup open={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />

      <main className="relative z-10 overflow-x-hidden w-full max-w-[100vw]">
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
