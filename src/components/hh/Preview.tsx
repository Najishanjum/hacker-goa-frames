import { useRef } from "react";
import { GoaSticker } from "./GoaSticker";
import sunset from "@/assets/sunset.jpg";

export type CardVariant = "classic" | "sunset" | "landscape" | "minimal";

export const CARD_VARIANTS: { id: CardVariant; label: string; hint: string }[] = [
  { id: "classic", label: "Active Builder Card", hint: "The original HH Goa pass" },
  { id: "sunset", label: "Sunset Vibe Builder", hint: "Portrait, sunset arch" },
  { id: "landscape", label: "Landscape Nordic Vibrant", hint: "Wide neon magazine cut" },
  { id: "minimal", label: "Landscape Natural Builder", hint: "Clean minimal green" },
];

export type Builder = {
  name: string;
  stack: string;
  handle: string;
  title: string;
  builderId?: string;
  variant?: CardVariant;
  photo: string | null;
  zoom: number;
  ox: number;
  oy: number;
};


// Deterministic QR Code Scanner component with tropical palm tree center
export function QRScanner({ seed = "#HH-GOA-5384", size = 84 }: { seed?: string; size?: number }) {
  const numSeed = seed.replace(/\D/g, "") || "5384";
  const num = parseInt(numSeed, 10);
  const rows = 13;
  const cols = 13;

  const isFilled = (r: number, c: number) => {
    // Corner finder patterns
    if ((r < 4 && c < 4) || (r < 4 && c > 8) || (r > 8 && c < 4)) {
      if (r === 0 || r === 3 || c === 0 || c === 3) return true;
      if (r === 12 || r === 9 || c === 12 || c === 9) return true;
      if (r === 1 || r === 2) {
        if (c === 1 || c === 2 || c === 10 || c === 11) return true;
      }
      if (r === 11 || r === 10) {
        if (c === 1 || c === 2) return true;
      }
      return false;
    }
    // Empty center for palm tree icon
    if (r >= 5 && r <= 7 && c >= 5 && c <= 7) return false;
    const hash = (r * 19 + c * 31 + num * 7) % 100;
    return hash > 44;
  };

  return (
    <div className="relative inline-flex flex-col items-center rounded-xl bg-white p-1.5 border border-goa-yellow/50 shadow-md select-none">
      <div className="relative">
        <svg width={size} height={size} viewBox="0 0 13 13" className="shape-rendering-crisp">
          <rect width="13" height="13" fill="#ffffff" />
          {Array.from({ length: rows }).map((_, r) =>
            Array.from({ length: cols }).map((_, c) =>
              isFilled(r, c) ? (
                <rect key={`${r}-${c}`} x={c} y={r} width="1" height="1" fill="#094727" />
              ) : null
            )
          )}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] border border-[#094727] shadow-sm">
            🌴
          </div>
        </div>
      </div>
    </div>
  );
}

// Barcode graphic component
export function BarcodeScanner({ code = "#HH-GOA-5384" }: { code?: string }) {
  const bars = [2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 4, 1, 2, 3, 1, 2, 1, 4, 2];
  return (
    <div className="flex flex-col items-center">
      <p className="font-mono-ui text-[9px] font-bold tracking-widest text-goa-yellow/90">BUILDER ID</p>
      <p className="font-mono-ui text-xs font-black tracking-widest text-goa-white">{code}</p>
      <div className="mt-1 flex items-center gap-[2px] h-7 bg-white px-2 py-1 rounded border border-goa-yellow/40">
        {bars.map((w, idx) => (
          <div
            key={idx}
            className="bg-[#094727]"
            style={{ width: `${w}px`, height: "100%" }}
          />
        ))}
      </div>
    </div>
  );
}

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

function ClassicCard({ b }: { b: Builder }) {
  const uniqueId = b.builderId || "#HH-GOA-5384";

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
                {b.title || "HACKER"}
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
  onUploadClick,
}: {
  b: Builder;
  onAdjust?: (patch: { ox: number; oy: number }) => void;
  onUploadClick?: () => void;
}) {
  const drag = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  const uniqueId = b.builderId || "#HH-GOA-5384";

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
    <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-[#094727] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)] select-none">
      {/* Frame Artwork Overlay Background */}
      <img
        src="/pfp-frame.png"
        alt="Hacker House Goa PFP Frame"
        className="pointer-events-none absolute inset-0 z-10 h-full w-full object-cover"
      />

      {/* Photo Viewport Container (z-20 so uploaded photos are ALWAYS 100% visible) */}
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stop}
        onPointerCancel={stop}
        onClick={() => {
          if (!b.photo && onUploadClick) {
            onUploadClick();
          }
        }}
        className={`absolute z-20 overflow-hidden rounded-full border-[7px] border-[#ff007f] shadow-[0_0_24px_rgba(255,0,127,0.5)] transition-all ${
          !b.photo ? "cursor-pointer hover:scale-[1.01] hover:border-[#ff3399]" : ""
        }`}
        style={{
          left: "17.4%",
          top: "15.8%",
          width: "65.2%",
          height: "65.2%",
          cursor: b.photo ? "grab" : "pointer",
          touchAction: "none",
        }}
      >
        <div className="relative h-full w-full rounded-full border-[4px] border-[#ffd700] overflow-hidden bg-[#05311a]">
          {b.photo ? (
            <img
              src={b.photo}
              alt={b.name || "Builder PFP"}
              draggable={false}
              className="h-full w-full select-none object-cover"
              style={{ transform: `scale(${b.zoom}) translate(${b.ox}%, ${b.oy}%)` }}
            />
          ) : (
            <div className="grid h-full w-full place-items-center p-6 text-center font-mono-ui">
              <div className="flex flex-col items-center gap-2">
                <span className="text-3xl animate-bounce">📸</span>
                <p className="text-xs font-bold text-[#ffd700] uppercase tracking-wider">
                  Click to Upload Photo
                </p>
                <p className="text-[10px] text-[#70c997]">
                  PNG, JPG, HEIC supported
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Dynamic Builder Title Overlay over the pink badge (left bottom, tilted -8deg) */}
      <div
        className="pointer-events-none absolute z-30 -rotate-8 flex items-center"
        style={{ left: "5.2%", bottom: "24.5%", width: "23%", height: "7.5%" }}
      >
        <div className="flex h-full w-full items-center justify-center rounded-md bg-[#ff007f] px-2.5 py-1 text-center font-mono-ui text-[clamp(9px,1.9cqw,13px)] font-black uppercase tracking-wider text-white shadow-[0_3px_0_rgba(0,0,0,0.3)]">
          <span className="truncate">{b.title || "HACKER"}</span>
        </div>
      </div>
    </div>
  );
}






