import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { toPng } from "html-to-image";

import { Backdrop } from "@/components/hh/Backdrop";
import { GoaSticker } from "@/components/hh/GoaSticker";
import { IntroLoader } from "@/components/hh/IntroLoader";
import { BuilderForm, type BuilderFormRef } from "@/components/hh/BuilderForm";
import { IdCard, PfpFrame, type Builder } from "@/components/hh/Preview";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hacker House Goa — Builder ID & PFP Generator" },
      {
        name: "description",
        content:
          "Create your Hacker House Goa builder pass and PFP frame. Upload a photo, roll a builder title, and export a PNG.",
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

const generateUniqueId = () => `#HH-GOA-${Math.floor(1000 + Math.random() * 9000)}`;

function AnimatedTitle() {
  const text = "HACKER HOUSE GOA";
  return (
    <h1 className="mt-3 flex flex-wrap items-center justify-center gap-x-1.5 sm:gap-x-2.5 gap-y-1 font-display text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase leading-none tracking-tight text-goa-yellow select-none">
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: [0, -7, 0],
            color: [
              "var(--goa-yellow)",
              "#ffffff",
              "var(--goa-pink)",
              "var(--goa-yellow)",
            ],
            textShadow: [
              "0 0 12px rgba(255,235,59,0.6)",
              "0 0 30px rgba(255,0,127,0.9)",
              "0 0 12px rgba(255,235,59,0.6)",
            ],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: index * 0.07,
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
      <GoaSticker className="text-[0.42em] shrink-0 ml-1 sm:ml-2" />
    </h1>
  );
}

function Index() {
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<Mode>("pfp");
  const [busy, setBusy] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<BuilderFormRef>(null);
  const [builder, setBuilder] = useState<Builder>({
    name: "",
    stack: "",
    handle: "",
    title: "HACKER",
    builderId: generateUniqueId(),
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

  const fileName = `hh-goa-${mode}-${(builder.name || builder.title || "builder").toLowerCase().replace(/\s+/g, "-")}.png`;

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

      <main className="relative flex min-h-screen flex-col px-4 pb-0 pt-10 sm:px-8">
        {/* Main Header in single alignment with Animated Title */}
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: loading ? 2.6 : 0.1, duration: 0.7 }}
          className="mx-auto max-w-5xl text-center"
        >
          <p className="font-mono-ui text-[11px] font-bold tracking-[0.4em] text-goa-yellow/90">
            28–31 OCT 2026 · GOA
          </p>
          <AnimatedTitle />
          <p className="mx-auto mt-4 max-w-lg font-mono-ui text-xs leading-relaxed text-goa-white/90">
            Build your official builder pass & PFP frame. Upload a photo, adjust your crop, roll a title, export your PNG, and claim your spot on the beach.
          </p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: loading ? 2.8 : 0.25, duration: 0.7 }}
          className="mx-auto mt-10 grid max-w-6xl gap-8 lg:grid-cols-2"
        >

          {/* Controls Panel */}
          <div className="rounded-3xl border border-goa-yellow/30 bg-goa-green-deep/50 p-6 backdrop-blur-2xl sm:p-8 shadow-2xl">
            <div className="mb-6 grid grid-cols-2 gap-1 rounded-full bg-goa-green-ink/80 p-1.5 border border-goa-yellow/20">
              {(["pfp", "card"] as Mode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`rounded-full px-4 py-2.5 font-mono-ui text-xs font-bold tracking-[0.2em] transition ${
                    mode === m
                      ? "bg-goa-yellow text-goa-green-ink shadow-md"
                      : "text-goa-white/70 hover:text-goa-yellow"
                  }`}
                >
                  {m === "pfp" ? "PFP FRAME" : "BUILDER PASS"}
                </button>
              ))}
            </div>
            <BuilderForm ref={formRef} b={builder} onChange={patch} mode={mode} />
          </div>

          {/* Frame Preview & Action Buttons */}
          <div className="lg:sticky lg:top-8 lg:self-start">
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
                    <PfpFrame
                      b={builder}
                      onAdjust={patch}
                      onUploadClick={() => formRef.current?.openFilePicker()}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>


            {/* Action Buttons */}
            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={download}
                disabled={busy}
                className="w-full rounded-2xl bg-goa-yellow py-4 font-mono-ui text-sm font-black tracking-[0.25em] text-goa-green-ink shadow-lg transition hover:scale-[1.01] hover:shadow-[0_0_36px_color-mix(in_oklab,var(--goa-yellow)_60%,transparent)] disabled:opacity-60 cursor-pointer"
              >
                {busy ? "RENDERING PNG…" : "DOWNLOAD PNG"}
              </button>

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={postOnX}
                  className="rounded-2xl bg-goa-pink py-3.5 font-mono-ui text-xs font-bold tracking-[0.2em] text-goa-yellow shadow-md transition hover:scale-[1.01] hover:shadow-[0_0_30px_color-mix(in_oklab,var(--goa-pink)_65%,transparent)] cursor-pointer"
                >
                  POST ON X 🚀
                </button>
                <button
                  type="button"
                  onClick={shareImage}
                  disabled={busy}
                  className="rounded-2xl border border-goa-yellow/60 bg-goa-green-deep/50 py-3.5 font-mono-ui text-xs font-bold tracking-[0.2em] text-goa-yellow transition hover:bg-goa-yellow/15 disabled:opacity-60 cursor-pointer"
                >
                  SHARE IMAGE 📲
                </button>
              </div>

              <div className="rounded-xl border border-goa-yellow/15 bg-black/20 p-3 text-center">
                <p className="font-mono-ui text-[11px] leading-relaxed text-goa-white/80">
                  “{SHARE_TEXT}”
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer Section matching Image 2 */}
        <footer className="relative -mx-4 mt-20 pt-6 sm:-mx-8">
          <div className="flex flex-col items-center justify-center pt-8 pb-4 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-goa-yellow/60 bg-[#064e29] px-5 py-2 font-mono-ui text-xs font-bold tracking-[0.18em] text-goa-yellow shadow-lg">
              🌺 · 28–31 OCT 2026 · #FrameInGoa
            </span>
            <p className="mt-3 font-mono-ui text-xs font-bold tracking-[0.15em] text-goa-white">
              Built by Najish Anjum
            </p>
          </div>
          <div className="relative aspect-[1900/34] w-full overflow-hidden opacity-90">
            <img src="/footer-band.png" alt="" className="w-full object-cover" />
          </div>
        </footer>
      </main>
    </>
  );
}

