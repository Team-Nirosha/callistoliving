import { CheckCircle2, Sparkles, X } from "lucide-react";
import { FormEvent, useEffect, useId, useState } from "react";

const LOW_BUDGET_VALUE = "under-5";

type EnquiryPopupProps = {
  open: boolean;
  onClose: () => void;
};

export function EnquiryPopup({ open, onClose }: EnquiryPopupProps) {
  const titleId = useId();
  const [budget, setBudget] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const isLowBudget = budget === LOW_BUDGET_VALUE;

  const handleClose = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("enquiry_popup_dismissed", "true");
    }
    onClose();
  };

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (open) return;
    setSubmitted(false);
  }, [open]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isLowBudget) setSubmitted(true);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md animate-in fade-in duration-300"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) handleClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-lg md:max-w-xl max-h-[92vh] overflow-y-auto rounded-2xl border border-gold/50 bg-[#14110d]/85 p-6 sm:p-9 backdrop-blur-2xl shadow-[0_0_80px_rgba(0,0,0,0.85)] text-white animate-in zoom-in-95 duration-400"
      >
        {/* Top Gold Accent Bar */}
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-transparent via-gold to-transparent" />

        {/* Ambient Dark Gold Radial Light */}
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gold/20 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 h-56 w-56 rounded-full bg-gold/10 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close enquiry form"
          className="absolute right-5 top-5 z-10 grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-black/40 text-white/90 transition-all duration-300 hover:border-gold hover:bg-gold/25 hover:text-gold cursor-pointer"
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div className="flex min-h-[320px] flex-col items-center justify-center text-center py-6">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-gold/20 text-gold border border-gold/40 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
              <CheckCircle2 size={36} strokeWidth={1.5} />
            </div>
            <p className="eyebrow text-gold mt-6 tracking-[0.25em]">Enquiry Received</p>
            <h2 id={titleId} className="mt-2 font-display text-3xl md:text-4xl text-white">
              Thank you for reaching out.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75">
              Our lead interior architect will review your project details and get back to you within 24 hours.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="mt-8 border border-gold bg-gold px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-ink transition-all hover:bg-white hover:border-white shadow-lg cursor-pointer"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2.5 text-gold">
              <Sparkles size={20} strokeWidth={1.5} />
              <span className="eyebrow text-gold font-semibold tracking-[0.25em]">Callisto Living Studio</span>
            </div>

            <h2 id={titleId} className="mt-2 font-display text-3xl sm:text-4xl leading-tight text-white">
              Begin Your <span className="italic text-gold">Interior Project</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-white/70">
              Share your vision and our design team will curate a personalized project proposal.
            </p>

            <form className="mt-6 space-y-4" onSubmit={onSubmit}>
              <div>
                <label className="eyebrow text-[10px] text-gold/90 font-medium">Full Name</label>
                <input
                  required
                  name="name"
                  autoComplete="name"
                  placeholder="e.g. Eleanor Vance"
                  className="mt-1.5 w-full rounded-t-md border-b border-gold/40 bg-white/5 px-3 py-2.5 text-sm text-white outline-none transition-all placeholder:text-white/35 focus:border-gold focus:bg-white/10"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="eyebrow text-[10px] text-gold/90 font-medium">Email Address</label>
                  <input
                    required
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="mt-1.5 w-full rounded-t-md border-b border-gold/40 bg-white/5 px-3 py-2.5 text-sm text-white outline-none transition-all placeholder:text-white/35 focus:border-gold focus:bg-white/10"
                  />
                </div>
                <div>
                  <label className="eyebrow text-[10px] text-gold/90 font-medium">Phone Number</label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    placeholder="+91 98765 43210"
                    className="mt-1.5 w-full rounded-t-md border-b border-gold/40 bg-white/5 px-3 py-2.5 text-sm text-white outline-none transition-all placeholder:text-white/35 focus:border-gold focus:bg-white/10"
                  />
                </div>
              </div>

              <div>
                <label className="eyebrow text-[10px] text-gold/90 font-medium">Estimated Project Budget</label>
                <select
                  required
                  value={budget}
                  onChange={(event) => setBudget(event.target.value)}
                  className="mt-1.5 w-full rounded-t-md border-b border-gold/40 bg-[#1a1713] px-3 py-2.5 text-sm text-white outline-none transition-all focus:border-gold cursor-pointer"
                >
                  <option value="" disabled className="bg-[#1a1713] text-white/50">Select your budget range</option>
                  <option value="under-5" className="bg-[#1a1713] text-white">Under ₹5 lakh</option>
                  <option value="5-15" className="bg-[#1a1713] text-white">₹5–15 lakh</option>
                  <option value="15-30" className="bg-[#1a1713] text-white">₹15–30 lakh</option>
                  <option value="30-plus" className="bg-[#1a1713] text-white">₹30 lakh+</option>
                </select>
              </div>

              {isLowBudget && (
                <p role="alert" className="border-l-2 border-gold bg-gold/15 p-3 text-xs leading-relaxed text-white/90">
                  Currently, our bespoke architecture packages start at ₹5 lakh. Select another range or contact us directly.
                </p>
              )}

              <button
                type="submit"
                disabled={isLowBudget}
                className="group mt-4 flex w-full items-center justify-between border border-gold bg-gold px-6 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-ink transition-all duration-300 hover:bg-white hover:border-white hover:text-black hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] disabled:cursor-not-allowed disabled:bg-stone/50 disabled:text-white/40 cursor-pointer"
              >
                <span>Send Enquiry</span>
                <span className="text-base transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </form>
          </div>
        )}
      </section>
    </div>
  );
}
