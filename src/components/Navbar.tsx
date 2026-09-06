import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { setState } from "@/lib/store";

const LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/", hash: "about" },
  { label: "Services", to: "/", hash: "services" },
  { label: "Projects", to: "/", hash: "projects" },
  { label: "Interiors", to: "/", hash: "interiors" },
  { label: "Gallery", to: "/experience" },
  { label: "Contact", to: "/", hash: "contact" },
];

export function Navbar({ onEnquire }: { onEnquire?: () => void }) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.55);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hover = {
    onMouseEnter: () => setState({ cursor: "open" }),
    onMouseLeave: () => setState({ cursor: "default" }),
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[70] transition-all duration-700 ${
        solid ? "border-b border-gold/20 bg-ink/85 backdrop-blur-xl py-1" : "bg-transparent py-2"
      }`}
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 md:px-12">
        <Link to="/" {...hover} className="leading-none flex items-baseline">
          <span className="font-display text-xl md:text-2xl tracking-[0.3em] text-sand">CALLISTO</span>
          <span className="ml-2 text-[10px] md:text-xs uppercase tracking-[0.4em] text-gold font-medium">Living</span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              hash={l.hash}
              {...hover}
              className="text-xs md:text-sm uppercase tracking-[0.16em] font-medium text-sand/80 transition-all duration-300 hover:text-gold hover:tracking-[0.2em]"
            >
              {l.label}
            </Link>
          ))}

          {onEnquire && (
            <button
              type="button"
              onClick={onEnquire}
              {...hover}
              className="ml-3 inline-flex items-center justify-center border border-gold/80 bg-gold/10 px-5 py-2 text-xs md:text-sm font-semibold uppercase tracking-[0.16em] text-gold transition-all duration-300 hover:bg-gold hover:text-ink hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] cursor-pointer"
            >
              Enquire Now
            </button>
          )}
        </div>

        <div className="flex items-center gap-4 lg:hidden">
          {onEnquire && (
            <button
              type="button"
              onClick={onEnquire}
              className="border border-gold bg-gold/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-gold"
            >
              Enquire
            </button>
          )}
          <button
            onClick={() => setOpen((v) => !v)}
            {...hover}
            className="text-xs uppercase tracking-[0.2em] font-medium text-sand"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-gold/20 bg-ink/98 px-6 pb-8 pt-4 backdrop-blur-2xl lg:hidden animate-in slide-in-from-top-4 duration-300">
          {LINKS.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              hash={l.hash}
              onClick={() => setOpen(false)}
              className="block py-3 font-display text-2xl text-sand hover:text-gold transition-colors"
            >
              {l.label}
            </Link>
          ))}
          {onEnquire && (
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onEnquire();
              }}
              className="mt-4 flex w-full items-center justify-center border border-gold bg-gold py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-ink"
            >
              Take Enquiry →
            </button>
          )}
        </div>
      )}
    </header>
  );
}
