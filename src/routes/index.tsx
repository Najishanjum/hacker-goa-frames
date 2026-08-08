import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { toPng } from "html-to-image";

import { Backdrop } from "@/components/hh/Backdrop";
import { GoaSticker } from "@/components/hh/GoaSticker";
import { IntroLoader } from "@/components/hh/IntroLoader";
import { BuilderForm } from "@/components/hh/BuilderForm";
import { IdCard, PfpFrame, type Builder } from "@/components/hh/Preview";
import footerBand from "@/assets/footer-band.png.asset.json";

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

const SHARE_TEXT =
  "Locked in for Hacker House Goa 2026 🌴 28–31 Oct, Goa, India. Make yours 👇 #FrameInGoa";

function Index() {
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<Mode>("pfp");
  const [busy, setBusy] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const [builder, setBuilder] = useState<Builder>({
    name: "",
    stack: "",
    handle: "",
    title: "Feral Shipper",
    photo: null,
    zoom: 1,
    ox: 0,
    oy: 0,
  });

  const patch = useCallback(
    (p: Partial<Builder>) => setBuilder((prev) => ({ ...prev, ...p })),
    [],
  );

  const render = async () => {
    if (!previewRef.current) return null;
    return toPng(previewRef.current, { pixelRatio: 3, cacheBust: true });
  };

  const fileName = `hh-goa-${mode}-${(builder.name || "builder").toLowerCase().replace(/\s+/g, "-")}.png`;

  const download = async () => {
    setBusy(true);
    try {
      const url = await render();
      if (!url) return;
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();
    } finally {
      setBusy(false);
    }
  };

  const shareImage = async () => {
    setBusy(true);
    try {
      const url = await render();
      if (!url) return;
      const blob = await (await fetch(url)).blob();
      const file = new File([blob], fileName, { type: "image/png" });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], text: SHARE_TEXT });
      } else {
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        a.click();
      }
    } finally {
      setBusy(false);
    }
  };

  const postOnX = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <>
      <AnimatePresence>
        {loading ? <IntroLoader onDone={() => setLoading(false)} /> : null}
      </AnimatePresence>

      <Backdrop />

      <main className="relative flex min-h-screen flex-col px-5 pb-0 pt-12 sm:px-8">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: loading ? 2.6 : 0.1, duration: 0.7 }}
          className="mx-auto max-w-5xl text-center"
        >
          <p className="font-mono-ui text-[10px] tracking-[0.5em] text-goa-yellow/80">
            28–31 OCT 2026 · ANJUNA, GOA
          </p>
          <h1 className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-display text-[11vw] uppercase leading-[0.9] tracking-tight text-goa-yellow drop-shadow-[0_6px_24px_rgba(0,0,0,0.45)] sm:text-7xl">
            Hacker House <GoaSticker className="text-[0.42em]" />
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
            <BuilderForm b={builder} onChange={patch} mode={mode} />
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
                  {mode === "card" ? (
                    <IdCard b={builder} />
                  ) : (
                    <PfpFrame b={builder} onAdjust={patch} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={download}
                disabled={busy}
                className="w-full rounded-2xl bg-goa-yellow py-4 font-mono-ui text-sm font-bold tracking-[0.25em] text-goa-green-ink transition hover:shadow-[0_0_36px_color-mix(in_oklab,var(--goa-yellow)_55%,transparent)] disabled:opacity-60"
              >
                {busy ? "RENDERING…" : "DOWNLOAD PNG"}
              </button>
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={postOnX}
                  className="rounded-2xl bg-goa-pink py-3.5 font-mono-ui text-xs font-bold tracking-[0.2em] text-goa-yellow transition hover:shadow-[0_0_30px_color-mix(in_oklab,var(--goa-pink)_60%,transparent)]"
                >
                  POST ON X
                </button>
                <button
                  type="button"
                  onClick={shareImage}
                  disabled={busy}
                  className="rounded-2xl border border-goa-yellow/50 py-3.5 font-mono-ui text-xs font-bold tracking-[0.2em] text-goa-yellow transition hover:bg-goa-yellow/10 disabled:opacity-60"
                >
                  SHARE IMAGE
                </button>
              </div>
              <p className="text-center font-mono-ui text-[10px] leading-relaxed text-goa-white/55">
                “{SHARE_TEXT}”
              </p>
            </div>
          </div>
        </motion.div>

        <footer className="relative -mx-5 mt-auto pt-24 sm:-mx-8">
          <div className="bg-goa-green px-5 pt-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-goa-yellow/60 bg-goa-green-ink/85 px-4 py-2 font-mono-ui text-[11px] font-bold tracking-[0.18em] text-goa-yellow">
              <GoaSticker className="text-[9px]" /> · 28–31 OCT 2026 · #FrameInGoa
            </span>
            <p className="mt-2 pb-4 font-mono-ui text-[11px] tracking-[0.1em] text-goa-white/85">
              Built by Najish Anjum
            </p>
          </div>
          <img
            src={footerBand.url}
            alt=""
            className="h-16 w-full object-cover object-bottom sm:h-20"
          />
        </footer>


      </main>
    </>
  );
}
