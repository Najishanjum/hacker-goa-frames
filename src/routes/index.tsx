import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { toPng } from "html-to-image";

import { Backdrop } from "@/components/hh/Backdrop";
import { GoaSticker } from "@/components/hh/GoaSticker";
import { IntroLoader } from "@/components/hh/IntroLoader";
import { BuilderForm } from "@/components/hh/BuilderForm";
import { IdCard, PfpFrame, type Builder } from "@/components/hh/Preview";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hacker House Goa — Builder ID & PFP Generator" },
      {
        name: "description",
        content:
          "Create your Hacker House Goa builder pass and PFP frame. Upload a photo, roll a builder title, and export a tropical hacker ID card as PNG.",
      },
      { property: "og:title", content: "Hacker House Goa — Builder ID & PFP Generator" },
      {
        property: "og:description",
        content:
          "Design your Hacker House Goa builder pass and PFP frame in seconds, then download it as a PNG.",
      },
    ],
  }),
  component: Index,
});

type Mode = "card" | "pfp";

function Index() {
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<Mode>("card");
  const [busy, setBusy] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const [builder, setBuilder] = useState<Builder>({
    name: "",
    stack: "",
    handle: "",
    title: "Feral Shipper",
    photo: null,
  });

  const patch = useCallback(
    (p: Partial<Builder>) => setBuilder((prev) => ({ ...prev, ...p })),
    [],
  );

  const download = async () => {
    if (!previewRef.current) return;
    setBusy(true);
    try {
      const url = await toPng(previewRef.current, { pixelRatio: 3, cacheBust: true });
      const a = document.createElement("a");
      a.href = url;
      a.download = `hh-goa-${mode}-${(builder.name || "builder").toLowerCase().replace(/\s+/g, "-")}.png`;
      a.click();
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {loading ? <IntroLoader onDone={() => setLoading(false)} /> : null}
      </AnimatePresence>

      <Backdrop />

      <main className="relative min-h-screen px-5 pb-20 pt-12 sm:px-8">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: loading ? 2.6 : 0.1, duration: 0.7 }}
          className="mx-auto max-w-5xl text-center"
        >
          <p className="font-mono-ui text-[10px] tracking-[0.5em] text-goa-yellow/80">
            28–31 OCT 2026 · ANJUNA, GOA
          </p>
          <h1 className="mt-4 font-display text-[15vw] uppercase leading-[0.82] tracking-tight text-goa-yellow sm:text-8xl">
            Hacker
            <br />
            House <GoaSticker className="align-super text-[0.3em]" />
          </h1>
          <p className="mx-auto mt-5 max-w-md font-mono-ui text-xs leading-relaxed text-goa-white/75">
            Build your official builder pass. Upload a photo, roll a title, export a PNG, and
            claim your spot on the beach.
          </p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: loading ? 2.8 : 0.25, duration: 0.7 }}
          className="mx-auto mt-14 grid max-w-6xl gap-8 lg:grid-cols-2"
        >
          <div className="rounded-3xl border border-goa-yellow/20 bg-goa-green-deep/35 p-6 backdrop-blur-2xl sm:p-8">
            <div className="mb-6 grid grid-cols-2 gap-1 rounded-full bg-goa-green-ink/70 p-1">
              {(["pfp", "card"] as Mode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`rounded-full px-4 py-2.5 font-mono-ui text-[11px] font-bold tracking-[0.2em] transition ${
                    mode === m
                      ? "bg-goa-yellow text-goa-green-ink"
                      : "text-goa-white/70 hover:text-goa-yellow"
                  }`}
                >
                  {m === "pfp" ? "PFP FRAME" : "BUILDER PASS"}
                </button>
              ))}
            </div>
            <BuilderForm b={builder} onChange={patch} />
          </div>

          <div className="lg:sticky lg:top-10 lg:self-start">
            <div ref={previewRef}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                >
                  {mode === "card" ? <IdCard b={builder} /> : <PfpFrame b={builder} />}
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={download}
              disabled={busy}
              className="mt-6 w-full rounded-2xl bg-goa-yellow py-4 font-mono-ui text-sm font-bold tracking-[0.25em] text-goa-green-ink transition hover:shadow-[0_0_36px_color-mix(in_oklab,var(--goa-yellow)_55%,transparent)] disabled:opacity-60"
            >
              {busy ? "RENDERING…" : "DOWNLOAD PNG"}
            </button>
          </div>
        </motion.div>

        <footer className="mx-auto mt-24 max-w-5xl border-t border-goa-yellow/20 pt-6 text-center font-mono-ui text-[10px] tracking-[0.35em] text-goa-white/60">
          HACKER HOUSE गोवा · #FRAMEDINGOA
        </footer>
      </main>
    </>
  );
}
