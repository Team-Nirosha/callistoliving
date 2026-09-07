import { Link } from "@tanstack/react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { Armchair, BedDouble, ChevronDown, CookingPot, Monitor, Star } from "lucide-react";
import apartment from "@/assets/project-apartment.webp";
import blackHouse from "@/assets/project-black-house.webp";
import minimal from "@/assets/project-minimal.webp";
import villa from "@/assets/project-villa.webp";
import { PROJECTS } from "@/lib/projects";
import { setState } from "@/lib/store";
import { MaterialExplorer } from "./SceneControls";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const hoverProps = (mode: "open" | "view" = "open") => ({
  onMouseEnter: () => setState({ cursor: mode }),
  onMouseLeave: () => setState({ cursor: "default" }),
});

export function Hero({ onEnquire }: { onEnquire: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.6 });
      tl.from(".hero-line", { y: 60, opacity: 0, duration: 1, stagger: 0.12, ease: "power4.out" })
        .from(".hero-sub", { y: 20, opacity: 0, duration: 0.8 }, "-=0.5")
        .from(".hero-cta", { y: 15, opacity: 0, duration: 0.7, stagger: 0.1 }, "-=0.4")
        .from(".hero-eyebrow", { opacity: 0, duration: 0.6 }, "-=1.2");
      gsap.to(".hero-content", {
        opacity: 0,
        y: -50,
        ease: "none",
        scrollTrigger: { start: 0, end: "80% top", scrub: true, trigger: root.current },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative isolate z-[60] flex min-h-screen items-center py-20 md:py-0"
    >
      <div className="hero-content relative z-[80] mx-auto w-full max-w-[1600px] px-6 md:px-12">
        <div className="hero-eyebrow inline-flex items-center gap-3 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-gold animate-ping" />
          <span className="eyebrow text-gold font-medium tracking-[0.25em]">
            Premium Interior Design Studio
          </span>
        </div>

        <h1 className="mt-6 max-w-5xl font-display text-[3.2rem] leading-[0.95] text-sand md:text-[6rem] lg:text-[7rem]">
          <span className="hero-line block overflow-hidden">SPACES</span>
          <span className="hero-line block overflow-hidden">THAT</span>
          <span className="hero-line block overflow-hidden italic text-gold">DEFINE YOU</span>
        </h1>

        <p className="hero-sub mt-8 max-w-xl text-base md:text-lg leading-relaxed text-sand/80">
          We create timeless luxury interiors where architecture, bespoke craftsmanship, and
          emotional elegance unite seamlessly.
        </p>

        <div className="relative z-[100] mt-10 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4">
          <button
            type="button"
            onClick={onEnquire}
            {...hoverProps()}
            className="hero-cta group relative z-[110] inline-flex w-full sm:w-auto items-center justify-center border-2 border-gold bg-gold px-8 py-4 text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-ink shadow-[0_0_30px_rgba(212,175,55,0.45)] transition-all duration-300 hover:-translate-y-1 hover:border-sand hover:bg-sand hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] cursor-pointer text-center"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Take Enquiry{" "}
              <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          </button>

          <a
            href="#projects"
            {...hoverProps()}
            className="hero-cta inline-flex w-full sm:w-auto items-center justify-center border border-gold/70 bg-gold/5 px-8 py-4 text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-gold transition-all duration-300 hover:bg-gold/20 hover:border-gold text-center"
          >
            Explore Our Work
          </a>

          <Link
            to="/experience"
            {...hoverProps()}
            className="hero-cta inline-flex w-full sm:w-auto items-center justify-center border border-sand/30 bg-sand/5 px-8 py-4 text-xs md:text-sm font-medium uppercase tracking-[0.2em] text-sand transition-all duration-300 hover:border-sand hover:bg-sand/15 text-center"
          >
            Enter 3D Experience
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 right-6 hidden text-right md:block md:right-12">
        <p className="eyebrow text-gold/80">Scroll to walk through</p>
        <div className="ml-auto mt-3 h-14 w-px bg-gradient-to-b from-gold to-transparent animate-pulse" />
      </div>
    </section>
  );
}

const JOURNEY = [
  {
    name: "Living Room",
    material: "Italian Marble",
    style: "Contemporary Luxury",
    area: "620 sq.ft.",
  },
  { name: "Dining Room", material: "Smoked Oak", style: "Sculptural Modern", area: "340 sq.ft." },
  { name: "Kitchen", material: "Calacatta & Brass", style: "Minimal Utility", area: "280 sq.ft." },
  { name: "Bedroom", material: "Belgian Linen", style: "Soft Brutalist", area: "410 sq.ft." },
  { name: "Balcony", material: "Travertine", style: "Open Air", area: "180 sq.ft." },
  { name: "Exterior", material: "Basalt Facade", style: "Monolithic", area: "—" },
];

export function Journey({ onProgress }: { onProgress: (p: number) => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const lastIndex = useRef(0);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        onProgress(self.progress);
        const newIndex = Math.min(
          JOURNEY.length - 1,
          Math.round(self.progress * (JOURNEY.length - 1)),
        );
        if (newIndex !== lastIndex.current) {
          lastIndex.current = newIndex;
          setIndex(newIndex);
        }
      },
    });
    return () => st.kill();
  }, [onProgress]);

  const room = JOURNEY[index];

  return (
    <div ref={root} className="relative h-[560vh]">
      <div className="sticky top-0 flex h-screen items-end">
        <div className="mx-auto flex w-full max-w-[1600px] items-end justify-between gap-8 px-6 pb-16 md:px-12">
          <div key={room.name} className="animate-fade-in">
            <p className="eyebrow">{`0${index + 1} / 0${JOURNEY.length}`}</p>
            <h2 className="mt-3 font-display text-5xl leading-none text-sand md:text-7xl">
              {room.name}
            </h2>
            <div className="mt-6 flex flex-wrap gap-8">
              {[
                ["Material", room.material],
                ["Style", room.style],
                ["Area", room.area],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="eyebrow">{k}</p>
                  <p className="mt-1 text-sm tracking-wide text-sand/85">{v}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden w-40 md:block">
            {JOURNEY.map((r, i) => (
              <div key={r.name} className="flex items-center gap-3 py-1">
                <div
                  className={`h-px transition-all duration-500 ${
                    i === index ? "w-10 bg-gold" : "w-4 bg-sand/25"
                  }`}
                />
                <span
                  className={`text-[9px] uppercase tracking-[0.24em] transition-colors ${
                    i === index ? "text-gold" : "text-sand/35"
                  }`}
                >
                  {r.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const ROOM_COLLECTIONS = [
  {
    id: "living-room",
    label: "Living Atelier",
    subtitle: "Custom seating, Italian marble & linear light",
    image: minimal,
    Icon: Armchair,
    area: "620 sq.ft.",
    materials: ["Calacatta Marble", "Brushed Brass", "Smoked Walnut"],
    quote:
      "Sculptural seating paired with custom architectural lighting, tailored for effortless hosting and serene evenings.",
    specs: [
      { title: "Lighting System", desc: "Linear LED cove & recessed dark light spots" },
      { title: "Custom Joinery", desc: "Smoked walnut paneling & floating media console" },
      { title: "Surface Finish", desc: "Honed Italian Calacatta slab & micro-cement" },
    ],
  },
  {
    id: "master-suite",
    label: "Primary Sanctuary",
    subtitle: "Soft bouclé, acoustic wood & tactile peace",
    image: apartment,
    Icon: BedDouble,
    area: "410 sq.ft.",
    materials: ["Belgian Linen", "Smoked Oak", "Fluted Glass"],
    quote:
      "A quiet private retreat balancing raw textures with warm ambient tones, creating a sanctuary of restful luxury.",
    specs: [
      { title: "Acoustic Layer", desc: "Sound-dampening wool fabric wall wrapping" },
      { title: "Built-in Suite", desc: "Walk-in dressing joinery with brass trims" },
      { title: "Ambient Mood", desc: "Circadian dimmable indirect sconces" },
    ],
  },
  {
    id: "media-lounge",
    label: "Media Lounge",
    subtitle: "Integrated acoustic walls & bronze accents",
    image: blackHouse,
    Icon: Monitor,
    area: "340 sq.ft.",
    materials: ["Basalt Stone", "Bronze Mirror", "Textured Velvet"],
    quote:
      "Sleek wall integration housing state-of-the-art media with concealed wine storage and bronze reflective accents.",
    specs: [
      { title: "Acoustic Joinery", desc: "Concealed speaker baffles & velvet panels" },
      { title: "Beverage Bar", desc: "Integrated bronze glass climate cabinet" },
      { title: "Lighting Controls", desc: "One-touch cinematic scene preset panel" },
    ],
  },
  {
    id: "culinary-space",
    label: "Culinary Atelier",
    subtitle: "Monolithic stone island & brass precision",
    image: villa,
    Icon: CookingPot,
    area: "280 sq.ft.",
    materials: ["Travertine Slab", "Patinated Metal", "Oak Shaker"],
    quote:
      "Seamless waterfall islands and hidden pantry doors where culinary functionality meets monolithic marble architecture.",
    specs: [
      { title: "Centerpiece Island", desc: "Hand-honed Travertine waterfall counter" },
      { title: "Cabinetry Atelier", desc: "Full-height pocket doors with brass handles" },
      { title: "Utility Design", desc: "Integrated professional induction & downdraft" },
    ],
  },
];

export function RoomPlanner({ onEnquire }: { onEnquire?: () => void }) {
  const [activeId, setActiveId] = useState(ROOM_COLLECTIONS[0].id);
  const active = ROOM_COLLECTIONS.find((room) => room.id === activeId) ?? ROOM_COLLECTIONS[0];

  return (
    <section
      id="interiors"
      className="relative border-t border-sand/15 bg-ink py-28 overflow-hidden"
    >
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gold/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative mx-auto max-w-[1600px] px-6 md:px-12">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-gold font-medium tracking-[0.25em]">
                02 — Spatial Atelier
              </p>
              <h2 className="mt-4 max-w-3xl font-display text-4xl leading-tight text-sand md:text-6xl lg:text-7xl">
                Interior spaces, crafted to <span className="italic text-gold">perfection.</span>
              </h2>
            </div>
            <p className="max-w-md text-sm md:text-base leading-relaxed text-sand/70">
              Select a room below to experience our material selections, architectural joinery, and
              tailored design philosophy.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 flex items-center gap-3 overflow-x-auto pb-4 scrollbar-none border-b border-sand/15">
          {ROOM_COLLECTIONS.map((room) => {
            const Icon = room.Icon;
            const selected = room.id === activeId;
            return (
              <button
                key={room.id}
                type="button"
                onClick={() => setActiveId(room.id)}
                onMouseEnter={() => setState({ cursor: "open" })}
                onMouseLeave={() => setState({ cursor: "default" })}
                className={`group flex items-center gap-3 border px-6 py-4 transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  selected
                    ? "border-gold bg-gold/15 text-gold shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                    : "border-sand/20 bg-bone/5 text-sand/70 hover:border-gold/60 hover:text-sand"
                }`}
              >
                <Icon
                  size={18}
                  strokeWidth={selected ? 2 : 1.5}
                  className={selected ? "text-gold" : "text-sand/50 group-hover:text-gold"}
                />
                <span className="text-xs md:text-sm font-semibold tracking-[0.16em] uppercase">
                  {room.label}
                </span>
                {selected && <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />}
              </button>
            );
          })}
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 items-stretch">
          <div className="group relative min-h-[460px] md:min-h-[560px] overflow-hidden border border-gold/30 bg-bone/10 shadow-2xl transition-all duration-500">
            <img
              src={active.image}
              alt={`${active.label} luxury interior design`}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />

            <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
              <span className="border border-gold/40 bg-ink/75 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold backdrop-blur-md">
                Area: {active.area}
              </span>
              <span className="border border-sand/20 bg-ink/75 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-sand/80 backdrop-blur-md">
                Verified Atelier Design
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <p className="eyebrow text-gold">{active.label}</p>
              <h3 className="mt-2 font-display text-3xl md:text-5xl text-sand leading-tight">
                {active.subtitle}
              </h3>

              <div className="mt-4 flex flex-wrap gap-2">
                {active.materials.map((m) => (
                  <span
                    key={m}
                    className="border border-gold/30 bg-gold/10 px-3 py-1 text-[11px] font-medium tracking-[0.12em] text-gold uppercase backdrop-blur-sm"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between border border-sand/15 bg-bone/5 p-8 md:p-10 backdrop-blur-md">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-gold" />
                <p className="eyebrow text-gold">Design Story & Specs</p>
              </div>

              <blockquote className="mt-6 border-l-2 border-gold pl-5 font-display text-2xl md:text-3xl italic leading-relaxed text-sand">
                “{active.quote}”
              </blockquote>

              <div className="mt-8 space-y-5 border-t border-sand/15 pt-6">
                {active.specs.map((spec) => (
                  <div key={spec.title} className="flex items-start gap-4">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold" />
                    <div>
                      <h4 className="text-xs uppercase tracking-[0.18em] font-semibold text-sand">
                        {spec.title}
                      </h4>
                      <p className="mt-1 text-xs md:text-sm text-sand/70 leading-relaxed">
                        {spec.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-sand/15 pt-8">
              {onEnquire && (
                <button
                  type="button"
                  onClick={onEnquire}
                  onMouseEnter={() => setState({ cursor: "open" })}
                  onMouseLeave={() => setState({ cursor: "default" })}
                  className="flex-1 min-w-[200px] border border-gold bg-gold px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-ink transition-all duration-300 hover:bg-sand hover:border-sand shadow-[0_0_20px_rgba(212,175,55,0.3)] cursor-pointer text-center"
                >
                  Enquire For This Space →
                </button>
              )}
              <Link
                to="/experience"
                onMouseEnter={() => setState({ cursor: "view" })}
                onMouseLeave={() => setState({ cursor: "default" })}
                className="flex-1 min-w-[180px] border border-gold/60 px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-gold transition-all duration-300 hover:bg-gold/15 text-center"
              >
                3D Room View →
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {ROOM_COLLECTIONS.map((room, idx) => {
            const isSelected = room.id === activeId;
            return (
              <button
                key={room.id}
                type="button"
                onClick={() => setActiveId(room.id)}
                className={`group relative overflow-hidden border p-4 text-left transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "border-gold bg-gold/10"
                    : "border-sand/15 bg-bone/5 hover:border-gold/50"
                }`}
              >
                <div className="aspect-[4/3] w-full overflow-hidden mb-3">
                  <img
                    src={room.image}
                    alt={room.label}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="eyebrow text-[9px] text-gold">0{idx + 1} / 04</p>
                <h4 className="mt-1 font-display text-lg text-sand">{room.label}</h4>
                <p className="mt-1 text-xs text-sand/60 truncate">{room.subtitle}</p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        y: 60,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function MaterialSection() {
  return (
    <section className="relative border-t border-sand/10 py-28">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-6 md:grid-cols-2 md:px-12">
        <Reveal>
          <p className="eyebrow">07 — Materiality</p>
          <h2 className="mt-4 font-display text-5xl leading-tight text-sand md:text-7xl">
            Explore <span className="italic text-gold">Materials</span>
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-sand/65">
            Every surface in our projects is specified in the room it will live in. Change the
            palette and watch the floor of the 3D interior behind this page respond in real time.
          </p>
        </Reveal>
        <Reveal className="flex md:justify-end">
          <MaterialExplorer />
        </Reveal>
      </div>
    </section>
  );
}

const SERVICES = [
  [
    "Interior Architecture",
    "Spatial planning, volumes, joinery and light design from first sketch to handover.",
  ],
  [
    "Turnkey Residences",
    "Full execution with our atelier of makers — stone, metal, cabinetry, textiles.",
  ],
  [
    "Furniture Curation",
    "Bespoke and collectible pieces sourced and commissioned for each residence.",
  ],
  ["Art & Styling", "Commissioned artwork, objects and the final layer that makes a house yours."],
];

export function Services() {
  return (
    <section id="services" className="relative bg-ink py-28">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <Reveal>
          <p className="eyebrow">Services</p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl leading-tight text-sand md:text-6xl">
            A single studio for the entire arc of a home.
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-px bg-sand/10 md:grid-cols-2">
          {SERVICES.map(([title, body], i) => (
            <Reveal key={title} className="bg-ink p-10">
              <p className="eyebrow">{`0${i + 1}`}</p>
              <h3 className="mt-4 font-display text-3xl text-sand">{title}</h3>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-sand/60">{body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: (typeof PROJECTS)[number]; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(el, {
      rotateY: x * 9,
      rotateX: -y * 9,
      duration: 0.7,
      ease: "power3.out",
      transformPerspective: 900,
    });
  };

  const reset = () => {
    setState({ cursor: "default" });
    gsap.to(ref.current, { rotateY: 0, rotateX: 0, duration: 0.9, ease: "power3.out" });
    gsap.to(ref.current!.querySelector("img"), { scale: 1, duration: 0.9 });
    gsap.to(ref.current!.querySelector(".card-title"), { y: 0, duration: 0.6 });
  };

  const enter = () => {
    setState({ cursor: "view" });
    gsap.to(ref.current!.querySelector("img"), { scale: 1.09, duration: 1.2, ease: "power3.out" });
    gsap.to(ref.current!.querySelector(".card-title"), { y: -14, duration: 0.6 });
  };

  return (
    <Reveal className={index % 2 === 1 ? "md:mt-28" : ""}>
      <Link
        ref={ref as never}
        to="/projects/$slug"
        params={{ slug: project.slug }}
        onMouseMove={onMove}
        onMouseEnter={enter}
        onMouseLeave={reset}
        className="group block will-change-transform"
      >
        <div className="relative overflow-hidden bg-ink">
          <img
            src={project.image}
            alt={`${project.title} — interior design by Callisto Living`}
            loading="lazy"
            width={1200}
            height={1500}
            className="h-[62vh] w-full object-cover opacity-90 transition-opacity duration-700 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
          <div className="card-title absolute bottom-6 left-6 right-6">
            <p className="eyebrow">{`${project.location} — ${project.year}`}</p>
            <h3 className="mt-2 font-display text-3xl text-sand md:text-4xl">{project.title}</h3>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative bg-ink py-28">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <Reveal>
          <p className="eyebrow">Selected Work</p>
          <h2 className="mt-4 font-display text-4xl text-sand md:text-6xl">
            Projects <span className="italic text-gold">2023 — 2025</span>
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-16">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="relative bg-ink py-28">
      <div className="mx-auto grid max-w-[1600px] gap-14 px-6 md:grid-cols-[1fr_1.1fr] md:px-12">
        <Reveal>
          <p className="eyebrow">The Studio</p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-sand md:text-6xl">
            Callisto Living
          </h2>
        </Reveal>
        <Reveal>
          <p className="font-display text-2xl leading-relaxed text-sand/85 md:text-3xl">
            We design interiors the way architects design buildings — from structure and light
            outward, never from a mood board inward.
          </p>
          <p className="mt-8 max-w-xl text-sm leading-relaxed text-sand/60">
            Founded as a small atelier, the studio now delivers residences, villas and boutique
            workplaces across three continents. Each project is led end to end by one designer, with
            an in-house team of makers in stone, brass and cabinetry.
          </p>
          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-sand/10 pt-8">
            {[
              ["14", "Years"],
              ["68", "Residences"],
              ["9", "Awards"],
            ].map(([n, l]) => (
              <div key={l}>
                <p className="font-display text-5xl text-gold">{n}</p>
                <p className="eyebrow mt-2">{l}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const GOOGLE_REVIEWS = [
  {
    quote:
      "They understood the light in our house before they understood us. Everything followed from that.",
    name: "A. Mehta",
    location: "Alibaug",
    project: "Villa renovation",
  },
  {
    quote:
      "The only studio we've worked with that draws joinery and books the stone in the same week.",
    name: "L. Sørensen",
    location: "Copenhagen",
    project: "City residence",
  },
  {
    quote:
      "Every corner feels calm, personal and exceptionally well made. The execution was as thoughtful as the design.",
    name: "R. Khanna",
    location: "Mumbai",
    project: "Apartment interior",
  },
  {
    quote:
      "They made every decision feel effortless and transformed an ordinary apartment into a home with real character.",
    name: "N. Shah",
    location: "New Delhi",
    project: "Penthouse interior",
  },
];

export function TestimonialsLegacy() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = track.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const animation = gsap.to(element, { yPercent: -50, duration: 24, ease: "none", repeat: -1 });
    const pause = () => animation.pause();
    const play = () => animation.play();
    const container = root.current;
    container?.addEventListener("mouseenter", pause);
    container?.addEventListener("mouseleave", play);
    container?.addEventListener("focusin", pause);
    container?.addEventListener("focusout", play);
    return () => {
      animation.kill();
      container?.removeEventListener("mouseenter", pause);
      container?.removeEventListener("mouseleave", play);
      container?.removeEventListener("focusin", pause);
      container?.removeEventListener("focusout", play);
    };
  }, []);

  return (
    <section ref={root} id="reviews" className="relative overflow-hidden bg-ink py-28">
      <div className="mx-auto grid max-w-[1600px] items-center gap-12 px-6 md:grid-cols-[0.8fr_1.2fr] md:gap-24 md:px-12">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white font-sans text-sm font-semibold text-[#4285F4]">
              G
            </span>
            <p className="eyebrow">Google reviews</p>
          </div>
          <h2 className="mt-6 max-w-md font-display text-5xl leading-[0.95] text-sand md:text-7xl">
            Homes made to be <span className="italic text-gold">felt.</span>
          </h2>
          <div className="mt-8 flex items-center gap-4">
            <div className="flex gap-1 text-gold" aria-label="Five out of five stars">
              {Array.from({ length: 5 }, (_, index) => (
                <Star key={index} size={16} fill="currentColor" />
              ))}
            </div>
            <span className="font-display text-2xl text-sand">5.0</span>
            <span className="text-xs text-sand/55">Client satisfaction</span>
          </div>
          <p className="mt-7 max-w-sm text-sm leading-relaxed text-sand/60">
            The kind words from clients who trusted us with the spaces that matter most.
          </p>
        </Reveal>

        <div className="relative h-[440px] overflow-hidden md:h-[500px]">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-ink to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-ink to-transparent" />
          <div ref={track} className="space-y-5 pb-5">
            {[...GOOGLE_REVIEWS, ...GOOGLE_REVIEWS].map((review, index) => (
              <article
                key={`${review.name}-${index}`}
                aria-hidden={index >= GOOGLE_REVIEWS.length}
                className="border border-sand/15 bg-bone/10 p-6 transition-colors duration-300 hover:border-gold/60 md:p-8"
              >
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="font-display text-2xl text-sand">{review.name}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-sand/45">
                      {review.location} · {review.project}
                    </p>
                  </div>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white font-sans text-sm font-semibold text-[#4285F4]">
                    G
                  </span>
                </div>
                <div className="mt-6 flex gap-1 text-gold" aria-label="Five out of five stars">
                  {Array.from({ length: 5 }, (_, starIndex) => (
                    <Star key={starIndex} size={13} fill="currentColor" />
                  ))}
                </div>
                <p className="mt-5 font-display text-xl italic leading-relaxed text-sand/90 md:text-2xl">
                  “{review.quote}”
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function TestimonialsTimeline() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = root.current;
    const carousel = track.current;
    if (!section || !carousel || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;

    const ctx = gsap.context(() => {
      gsap.to(carousel, {
        x: () => -(carousel.scrollWidth - window.innerWidth + 48),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="reviews"
      className="relative h-[180vh] overflow-hidden bg-ink md:h-[190vh]"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-14">
        <div className="mx-auto w-full max-w-[1600px] px-6 md:px-12">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white font-sans text-sm font-semibold text-[#4285F4]">
                  G
                </span>
                <p className="eyebrow">Google reviews</p>
              </div>
              <h2 className="mt-5 max-w-2xl font-display text-5xl leading-[0.95] text-sand md:text-7xl">
                Homes made to be <span className="italic text-gold">felt.</span>
              </h2>
            </div>
            <div className="flex items-center gap-3 border-l border-gold/50 pl-4">
              <div className="flex gap-1 text-gold" aria-label="Five out of five stars">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star key={index} size={14} fill="currentColor" />
                ))}
              </div>
              <span className="font-display text-2xl text-sand">5.0</span>
              <span className="text-xs text-sand/55">Client satisfaction</span>
            </div>
          </div>
        </div>
        <p className="mx-auto mt-8 w-full max-w-[1600px] px-6 text-[10px] uppercase tracking-[0.28em] text-sand/40 md:mt-10 md:px-12">
          Scroll to explore our client stories
        </p>

        <div
          ref={track}
          className="mt-6 flex w-max gap-5 pl-6 will-change-transform md:mt-8 md:gap-7 md:pl-12"
        >
          {GOOGLE_REVIEWS.map((review) => (
            <article
              key={review.name}
              className="flex h-[310px] w-[82vw] max-w-[490px] flex-col justify-between border border-sand/15 bg-bone/10 p-6 transition-colors duration-300 hover:border-gold/60 md:h-[350px] md:w-[440px] md:p-8"
            >
              <div>
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="font-display text-2xl text-sand">{review.name}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-sand/45">
                      {review.location} · {review.project}
                    </p>
                  </div>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white font-sans text-sm font-semibold text-[#4285F4]">
                    G
                  </span>
                </div>
                <div className="mt-7 flex gap-1 text-gold" aria-label="Five out of five stars">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star key={index} size={13} fill="currentColor" />
                  ))}
                </div>
                <p className="mt-5 font-display text-xl italic leading-relaxed text-sand/90 md:text-2xl">
                  “{review.quote}”
                </p>
              </div>
              <p className="eyebrow text-gold/80">Verified client review</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = track.current;
    if (!carousel || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const animation = gsap.to(carousel, {
      x: () => -(carousel.scrollWidth / 2),
      duration: 34,
      ease: "none",
      repeat: -1,
    });
    const pause = () => animation.pause();
    const play = () => animation.play();
    carousel.addEventListener("mouseenter", pause);
    carousel.addEventListener("mouseleave", play);
    return () => {
      animation.kill();
      carousel.removeEventListener("mouseenter", pause);
      carousel.removeEventListener("mouseleave", play);
    };
  }, []);

  return (
    <section id="reviews" className="relative overflow-hidden bg-ink py-24 md:py-28">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-end justify-between gap-7 px-6 md:px-12">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white font-sans text-sm font-semibold text-[#4285F4]">
              G
            </span>
            <p className="eyebrow">Google reviews</p>
          </div>
          <h2 className="mt-5 font-display text-5xl leading-[0.95] text-sand md:text-6xl">
            Homes made to be <span className="italic text-gold">felt.</span>
          </h2>
        </div>
        <div className="flex items-center gap-3 border-l border-gold/50 pl-4">
          <div className="flex gap-1 text-gold" aria-label="Five out of five stars">
            {Array.from({ length: 5 }, (_, index) => (
              <Star key={index} size={14} fill="currentColor" />
            ))}
          </div>
          <span className="font-display text-2xl text-sand">5.0</span>
          <span className="text-xs text-sand/55">Client satisfaction</span>
        </div>
      </div>

      <div className="mt-10 overflow-hidden">
        <div ref={track} className="flex w-max gap-5 pl-6 will-change-transform md:gap-7 md:pl-12">
          {[...GOOGLE_REVIEWS, ...GOOGLE_REVIEWS].map((review, index) => (
            <article
              key={`${review.name}-${index}`}
              aria-hidden={index >= GOOGLE_REVIEWS.length}
              className="flex h-[290px] w-[80vw] max-w-[440px] flex-col justify-between border border-sand/15 bg-bone/10 p-6 transition-colors duration-300 hover:border-gold/60 md:h-[315px] md:w-[410px] md:p-7"
            >
              <div>
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="font-display text-2xl text-sand">{review.name}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-sand/45">
                      {review.location} · {review.project}
                    </p>
                  </div>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white font-sans text-sm font-semibold text-[#4285F4]">
                    G
                  </span>
                </div>
                <div className="mt-6 flex gap-1 text-gold" aria-label="Five out of five stars">
                  {Array.from({ length: 5 }, (_, starIndex) => (
                    <Star key={starIndex} size={13} fill="currentColor" />
                  ))}
                </div>
                <p className="mt-5 font-display text-xl italic leading-relaxed text-sand/90">
                  “{review.quote}”
                </p>
              </div>
              <p className="eyebrow text-gold/80">Verified client review</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  {
    question: "What does a Callisto Living project include?",
    answer:
      "Each project is tailored to your home and can include space planning, interior architecture, material selection, bespoke joinery, furniture curation, styling and end-to-end execution.",
  },
  {
    question: "What is the typical timeline for an interior project?",
    answer:
      "A considered residence usually takes 12–20 weeks from the first design conversation to installation. The exact schedule depends on the size of your home, custom pieces and scope of work.",
  },
  {
    question: "Do you work with existing homes and renovations?",
    answer:
      "Yes. We work on new-build homes, renovations and single-room transformations, shaping the design around the architecture that is already there.",
  },
  {
    question: "How do I begin my interior journey?",
    answer:
      "Start with an enquiry and a budget range. Our team will review your details, arrange an introductory conversation and outline the best next step for your project.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="relative border-t border-sand/10 bg-ink py-28">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-6 md:grid-cols-[0.8fr_1.2fr] md:gap-24 md:px-12">
        <Reveal>
          <p className="eyebrow">Frequently asked questions</p>
          <h2 className="mt-4 font-display text-5xl leading-[0.95] text-sand md:text-7xl">
            Everything begins with a <span className="italic text-gold">conversation.</span>
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-sand/60">
            A few helpful answers before you share your plans with us.
          </p>
        </Reveal>

        <div className="border-t border-sand/20">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className="border-b border-sand/20">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="group flex w-full items-center justify-between gap-6 py-6 text-left md:py-7"
                >
                  <span
                    className={`font-display text-2xl leading-tight transition-colors md:text-3xl ${isOpen ? "text-gold" : "text-sand group-hover:text-gold"}`}
                  >
                    {faq.question}
                  </span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center border transition ${isOpen ? "rotate-180 border-gold bg-gold text-ink" : "border-sand/25 text-sand group-hover:border-gold group-hover:text-gold"}`}
                  >
                    <ChevronDown size={16} strokeWidth={1.5} />
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${isOpen ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <p className="overflow-hidden max-w-2xl text-sm leading-relaxed text-sand/65">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="relative bg-ink pb-16 pt-28">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h2 className="mt-4 font-display text-5xl leading-tight text-sand md:text-8xl">
            Begin your <span className="italic text-gold">residence</span>
          </h2>
        </Reveal>
        <Reveal className="mt-16 grid gap-12 border-t border-sand/10 pt-12 md:grid-cols-3">
          <div>
            <p className="eyebrow">Studio</p>
            <p className="mt-3 text-sm leading-relaxed text-sand/70">
              Please note: these details are placeholders — send me your real address, phone and
              email and I'll swap them in.
            </p>
          </div>
          <div>
            <p className="eyebrow">Enquiries</p>
            <p className="mt-3 text-sm text-sand/70">studio@callistoliving.example</p>
            <p className="text-sm text-sand/70">+00 000 000 0000</p>
          </div>
          <div>
            <a
              href="mailto:studio@callistoliving.example"
              {...hoverProps()}
              className="inline-block border border-gold/60 px-8 py-4 text-[10px] uppercase tracking-[0.3em] text-gold transition-colors hover:bg-gold/15"
            >
              Start a project
            </a>
          </div>
        </Reveal>
        <div className="mt-24 flex flex-wrap items-center justify-between gap-4 border-t border-sand/10 pt-8">
          <span className="font-display text-lg tracking-[0.3em] text-sand/70">
            CALLISTO LIVING
          </span>
          <span className="text-[10px] uppercase tracking-[0.28em] text-sand/35">
            © {new Date().getFullYear()} — Interior Architecture
          </span>
        </div>
      </div>
    </section>
  );
}
