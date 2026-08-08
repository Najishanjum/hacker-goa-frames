import { useRef, useState } from "react";
import type { Builder } from "./Preview";
import { rollTitle } from "@/lib/titles";

const fieldClass =
  "w-full rounded-xl border border-goa-yellow/20 bg-goa-green-deep/70 px-4 py-3 font-mono-ui text-sm text-goa-white placeholder:text-goa-white/40 outline-none transition focus:border-goa-yellow focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--goa-yellow)_25%,transparent)]";

const labelClass = "mb-1.5 block font-mono-ui text-[10px] tracking-[0.3em] text-goa-yellow";

export function BuilderForm({
  b,
  onChange,
}: {
  b: Builder;
  onChange: (patch: Partial<Builder>) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const readFile = (file?: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange({ photo: String(reader.result) });
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
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
        className={`cursor-pointer rounded-2xl border-2 border-dashed px-6 py-10 text-center transition ${
          dragging
            ? "border-goa-pink bg-goa-pink/10"
            : "border-goa-yellow/45 bg-goa-green-deep/40 hover:border-goa-yellow"
        }`}
      >
        <p className="font-display text-2xl text-goa-yellow">Upload your photo</p>
        <p className="mt-1 font-mono-ui text-xs text-goa-white/70">
          JPG · PNG · HEIC · any crop, any ratio
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/heic,image/*"
          className="hidden"
          onChange={(e) => readFile(e.target.files?.[0])}
        />
      </div>

      <div className="space-y-4 rounded-2xl border border-goa-yellow/15 bg-goa-green-deep/45 p-5 backdrop-blur-xl">
        <div>
          <label className={labelClass} htmlFor="name">NAME</label>
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
        <div>
          <label className={labelClass} htmlFor="title">BUILDER TITLE</label>
          <div className="flex gap-2">
            <input id="title" className={fieldClass} placeholder="Smart Contract Wizard" value={b.title}
              onChange={(e) => onChange({ title: e.target.value })} />
            <button
              type="button"
              onClick={() => onChange({ title: rollTitle(b.title) })}
              className="shrink-0 rounded-xl bg-goa-pink px-4 font-mono-ui text-xs font-bold tracking-wider text-goa-yellow transition hover:shadow-[0_0_24px_color-mix(in_oklab,var(--goa-pink)_65%,transparent)]"
            >
              ROLL 🎲
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
