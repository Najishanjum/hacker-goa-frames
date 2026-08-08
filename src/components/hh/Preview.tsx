import { useRef } from "react";
import { GoaSticker } from "./GoaSticker";
import sunset from "@/assets/sunset.jpg";
import frame from "@/assets/pfp-frame.png.asset.json";

export type Builder = {
  name: string;
  stack: string;
  handle: string;
  title: string;
  photo: string | null;
  zoom: number;
  ox: number;
  oy: number;
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
          className="pointer-events-none absolute -bottom-2 right-0 w-1/2 opacity-20"
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
                <img
                  src={b.photo}
                  alt={b.name || "Builder"}
                  className="h-full w-full object-cover"
                  style={{ transform: `scale(${b.zoom}) translate(${b.ox}%, ${b.oy}%)` }}
                />
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

export function PfpFrame({
  b,
  onAdjust,
}: {
  b: Builder;
  onAdjust?: (patch: { ox: number; oy: number }) => void;
}) {
  const drag = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!b.photo || !onAdjust) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, ox: b.ox, oy: b.oy };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current || !onAdjust) return;
    const box = (e.currentTarget as HTMLElement).clientWidth || 1;
    const dx = ((e.clientX - drag.current.x) / box) * 100;
    const dy = ((e.clientY - drag.current.y) / box) * 100;
    const clamp = (v: number) => Math.max(-60, Math.min(60, v));
    onAdjust({ ox: clamp(drag.current.ox + dx), oy: clamp(drag.current.oy + dy) });
  };
  const stop = () => {
    drag.current = null;
  };

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-goa-green-ink shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)]">
      {/* photo window, matched to the artwork's circular opening */}
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stop}
        onPointerCancel={stop}
        className="absolute overflow-hidden rounded-full bg-goa-green-deep"
        style={{
          left: "23.5%",
          top: "17.5%",
          width: "59.5%",
          height: "59.5%",
          cursor: b.photo ? "grab" : "default",
          touchAction: "none",
        }}
      >
        {b.photo ? (
          <img
            src={b.photo}
            alt={b.name || "Builder"}
            draggable={false}
            className="h-full w-full select-none object-cover"
            style={{ transform: `scale(${b.zoom}) translate(${b.ox}%, ${b.oy}%)` }}
          />
        ) : (
          <div className="grid h-full w-full place-items-center px-10 text-center font-mono-ui text-[11px] leading-relaxed text-goa-white/70">
            Upload a photo to preview your HH Goa PFP.
          </div>
        )}
      </div>

      <img
        src={frame.url}
        alt="Hacker House Goa PFP frame"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />

      {/* builder title badge, sitting where the artwork's pink tag is */}
      <div
        className="pointer-events-none absolute -rotate-6"
        style={{ left: "3.5%", top: "66%", width: "48%" }}
      >
        <span className="inline-block max-w-full truncate rounded-md bg-goa-pink px-3 py-1.5 font-mono-ui text-[clamp(9px,2.1cqw,13px)] font-bold uppercase tracking-[0.18em] text-goa-white shadow-[0_4px_0_0_color-mix(in_oklab,var(--goa-green-ink)_55%,transparent)]">
          {b.title || "Feral Shipper"}
        </span>
      </div>
    </div>
  );
}
