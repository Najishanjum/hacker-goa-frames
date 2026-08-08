import { GoaSticker } from "./GoaSticker";
import sunset from "@/assets/sunset.jpg";

export type Builder = {
  name: string;
  stack: string;
  handle: string;
  title: string;
  photo: string | null;
};

function TicketEdge() {
  return (
    <div
      className="h-2 w-full"
      style={{
        backgroundImage:
          "repeating-linear-gradient(90deg, var(--goa-pink) 0 6px, var(--goa-yellow) 6px 12px)",
      }}
    />
  );
}

export function IdCard({ b }: { b: Builder }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-goa-green-ink shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)]">
      <TicketEdge />
      <div className="relative p-5 sm:p-6">
        <img
          src={sunset}
          alt=""
          loading="lazy"
          width={1024}
          height={512}
          className="pointer-events-none absolute bottom-0 right-0 w-2/3 opacity-30"
        />
        <div className="relative">
          <div className="flex items-start justify-between gap-3">
            <p className="font-mono-ui text-[11px] font-bold leading-tight text-goa-yellow">
              2:47<span className="text-[8px]">PM</span>
              <br />
              STUDIO
            </p>
            <p className="font-mono-ui text-[9px] tracking-widest text-goa-white/80">
              GOA, INDIA · 28–31 OCT 2026
            </p>
          </div>

          <div className="mt-2 flex items-center justify-between gap-3">
            <h3 className="font-display text-3xl uppercase leading-none tracking-tight text-goa-yellow sm:text-4xl">
              Hacker House
            </h3>
            <GoaSticker className="text-sm" />
          </div>

          <div className="mt-5 grid grid-cols-[minmax(0,110px)_minmax(0,1fr)] gap-4 sm:grid-cols-[minmax(0,130px)_minmax(0,1fr)]">
            <div className="aspect-square overflow-hidden rounded-lg border-2 border-goa-yellow bg-goa-green-deep">
              {b.photo ? (
                <img src={b.photo} alt={b.name || "Builder"} className="h-full w-full object-cover" />
              ) : (
                <div className="grid h-full w-full place-items-center px-2 text-center font-mono-ui text-[9px] leading-relaxed text-goa-white/70">
                  Upload a photo to preview your pass.
                </div>
              )}
            </div>

            <div className="min-w-0">
              <p className="font-mono-ui text-[9px] tracking-[0.3em] text-goa-white/70">BUILDER</p>
              <p className="truncate font-display text-2xl uppercase leading-tight text-goa-white sm:text-3xl">
                {b.name || "Your Name"}
              </p>
              <span className="mt-2 inline-block rounded-full bg-goa-pink px-3 py-1 font-mono-ui text-[10px] font-bold uppercase tracking-wider text-goa-yellow">
                {b.title || "Feral Shipper"}
              </span>
              <p className="mt-3 font-mono-ui text-[9px] tracking-[0.3em] text-goa-white/70">
                STACK / ROLE
              </p>
              <p className="truncate font-mono-ui text-sm font-bold text-goa-yellow">
                {b.stack || "Full-Stack"}
              </p>
              {b.handle ? (
                <p className="truncate font-mono-ui text-[11px] text-goa-white/80">{b.handle}</p>
              ) : null}
            </div>
          </div>

          <div className="mt-5 flex items-end justify-between gap-3">
            <p className="font-mono-ui text-[10px] text-goa-yellow">#FramedInGoa</p>
            <p className="font-mono-ui text-[10px] text-goa-white/70">hhgoa · 2026</p>
          </div>
        </div>
      </div>
      <TicketEdge />
    </div>
  );
}

export function PfpFrame({ b }: { b: Builder }) {
  return (
    <div className="rounded-2xl bg-goa-green-ink p-8 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)]">
      <div className="mx-auto aspect-square w-full max-w-[340px] rounded-full bg-[conic-gradient(from_180deg,var(--goa-yellow),var(--goa-pink),var(--goa-yellow))] p-[10px]">
        <div className="h-full w-full overflow-hidden rounded-full bg-goa-green-deep p-[6px]">
          <div className="h-full w-full overflow-hidden rounded-full bg-goa-green-deep">
            {b.photo ? (
              <img src={b.photo} alt={b.name || "Builder"} className="h-full w-full object-cover" />
            ) : (
              <div className="grid h-full w-full place-items-center px-8 text-center font-mono-ui text-xs leading-relaxed text-goa-white/70">
                Upload a photo to preview your HH Goa PFP.
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-6 text-center">
        <p className="font-display text-2xl uppercase tracking-tight text-goa-yellow">
          Hacker House <GoaSticker className="text-xs align-middle" />
        </p>
        <p className="mt-1 font-mono-ui text-[10px] tracking-[0.35em] text-goa-white/75">
          GOA, INDIA · 28–31 OCT 2026
        </p>
      </div>
    </div>
  );
}
