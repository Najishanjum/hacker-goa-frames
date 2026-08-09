import { useRef, useState, useImperativeHandle, forwardRef } from "react";
import type { Builder } from "./Preview";
import { rollTitle } from "@/lib/titles";

const fieldClass =
  "w-full rounded-xl border border-goa-yellow/30 bg-goa-green-deep/80 px-4 py-3 font-mono-ui text-sm text-goa-white placeholder:text-goa-white/40 outline-none transition focus:border-goa-yellow focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--goa-yellow)_30%,transparent)]";

const labelClass = "mb-1.5 block font-mono-ui text-[11px] font-bold tracking-[0.25em] text-goa-yellow";

export type BuilderFormRef = {
  openFilePicker: () => void;
};

export const BuilderForm = forwardRef<
  BuilderFormRef,
  {
    b: Builder;
    onChange: (patch: Partial<Builder>) => void;
    mode: "card" | "pfp";
  }
>(function BuilderForm({ b, onChange, mode }, ref) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  useImperativeHandle(ref, () => ({
    openFilePicker: () => {
      inputRef.current?.click();
    },
  }));

  const readFile = (file?: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange({ photo: String(reader.result), zoom: 1, ox: 0, oy: 0 });
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      {/* Hidden File Input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/heic,image/*"
        className="hidden"
        onChange={(e) => readFile(e.target.files?.[0])}
      />

      {/* Photo Upload Box */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          readFile(e.dataTransfer.files?.[0]);
        }}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        className={`group relative cursor-pointer rounded-2xl border-2 border-dashed px-6 py-8 text-center transition-all ${
          dragging
            ? "border-goa-pink bg-goa-pink/20 scale-[0.99]"
            : "border-goa-yellow/50 bg-goa-green-deep/70 hover:border-goa-yellow hover:bg-goa-green-deep/90 hover:shadow-[0_0_24px_rgba(255,235,59,0.2)]"
        }`}
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-goa-yellow/20 text-2xl text-goa-yellow transition group-hover:scale-110 group-hover:bg-goa-yellow group-hover:text-goa-green-ink">
          📸
        </div>
        <p className="mt-3 font-display text-2xl text-goa-yellow">
          {b.photo ? "Photo Uploaded!" : "Upload your photo"}
        </p>
        <p className="mt-1 font-mono-ui text-xs text-goa-white/80">
          JPG · PNG · HEIC · Drag & drop or click anywhere to select
        </p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-goa-yellow px-5 py-2.5 font-mono-ui text-xs font-black tracking-wider text-goa-green-ink shadow-md transition group-hover:scale-105">
          {b.photo ? "🔄 CHANGE PHOTO" : "📂 CHOOSE PHOTO FILE"}
        </div>
      </div>

      {/* Crop & Adjust Controls (visible whenever a photo exists) */}
      {b.photo ? (
        <div className="space-y-3.5 rounded-2xl border border-goa-yellow/25 bg-goa-green-deep/60 p-5 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className={labelClass + " mb-0"}>CROP & ADJUST PHOTO</span>
            <div className="flex items-center gap-3 font-mono-ui text-[11px] font-bold tracking-wider">
              <button
                type="button"
                onClick={() => onChange({ zoom: 1, ox: 0, oy: 0 })}
                className="text-goa-yellow underline-offset-4 hover:underline"
              >
                RESET
              </button>
              <button
                type="button"
                onClick={() => onChange({ photo: null })}
                className="text-goa-pink underline-offset-4 hover:underline"
              >
                REMOVE
              </button>
            </div>
          </div>

          <div>
            <div className="mb-1 flex justify-between font-mono-ui text-[10px] text-goa-white/80">
              <span>ZOOM</span>
              <span>{Math.round(b.zoom * 100)}%</span>
            </div>
            <input
              type="range"
              min={1}
              max={3}
              step={0.01}
              aria-label="Zoom"
              value={b.zoom}
              onChange={(e) => onChange({ zoom: Number(e.target.value) })}
              className="w-full accent-goa-pink cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="font-mono-ui text-[10px] tracking-widest text-goa-white/80">
              POSITION X ({b.ox}%)
              <input
                type="range"
                min={-60}
                max={60}
                step={1}
                value={b.ox}
                onChange={(e) => onChange({ ox: Number(e.target.value) })}
                className="mt-1 w-full accent-goa-yellow cursor-pointer"
              />
            </label>
            <label className="font-mono-ui text-[10px] tracking-widest text-goa-white/80">
              POSITION Y ({b.oy}%)
              <input
                type="range"
                min={-60}
                max={60}
                step={1}
                value={b.oy}
                onChange={(e) => onChange({ oy: Number(e.target.value) })}
                className="mt-1 w-full accent-goa-yellow cursor-pointer"
              />
            </label>
          </div>
          <p className="font-mono-ui text-[10px] text-goa-white/60">
            💡 You can also drag the photo directly inside the frame preview!
          </p>
        </div>
      ) : null}

      {/* Form Fields: Only Title in PFP mode; Name, Stack, Handle, Title in Card mode */}
      <div className="space-y-4 rounded-2xl border border-goa-yellow/25 bg-goa-green-deep/60 p-5 backdrop-blur-xl">
        {mode === "card" ? (
          <>
            <div>
              <label className={labelClass} htmlFor="name">BUILDER NAME</label>
              <input id="name" className={fieldClass} placeholder="Aarav Sharma" value={b.name}
                onChange={(e) => onChange({ name: e.target.value })} />
            </div>
            <div>
              <label className={labelClass} htmlFor="stack">STACK / ROLE</label>
              <input id="stack" className={fieldClass} placeholder="Rust + Solana" value={b.stack}
                onChange={(e) => onChange({ stack: e.target.value })} />
            </div>
            <div>
              <label className={labelClass} htmlFor="handle">X HANDLE</label>
              <input id="handle" className={fieldClass} placeholder="@yourhandle" value={b.handle}
                onChange={(e) => onChange({ handle: e.target.value })} />
            </div>
          </>
        ) : null}

        <div>
          <label className={labelClass} htmlFor="title">BUILDER TITLE</label>
          <div className="flex gap-2">
            <input
              id="title"
              className={fieldClass}
              placeholder="FERAL SHIPPER"
              value={b.title}
              onChange={(e) => onChange({ title: e.target.value })}
            />
            <button
              type="button"
              onClick={() => onChange({ title: rollTitle(b.title) })}
              className="shrink-0 rounded-xl bg-goa-pink px-4 font-mono-ui text-xs font-bold tracking-wider text-goa-yellow transition hover:scale-105 hover:shadow-[0_0_24px_color-mix(in_oklab,var(--goa-pink)_65%,transparent)]"
            >
              ROLL 🎲
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});




