import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function IntroLoader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const id = window.setInterval(() => {
      const p = Math.min(100, ((Date.now() - start) / 2200) * 100);
      setProgress(p);
      if (p >= 100) {
        window.clearInterval(id);
        window.setTimeout(onDone, 260);
      }
    }, 40);
    return () => window.clearInterval(id);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-goa-green px-6"
    >
      <div className="relative grid h-52 w-52 place-items-center">
        <motion.svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="50" cy="50" r="45" fill="none" stroke="var(--goa-white)" strokeOpacity="0.18" strokeWidth="3" />
          <circle
            cx="50" cy="50" r="45" fill="none" stroke="var(--goa-yellow)" strokeWidth="3"
            strokeLinecap="round" strokeDasharray="70 213" strokeDashoffset="0"
          />
          <circle
            cx="50" cy="50" r="45" fill="none" stroke="var(--goa-pink)" strokeWidth="3"
            strokeLinecap="round" strokeDasharray="55 228" strokeDashoffset="-150"
          />
        </motion.svg>
        <div className="grid h-40 w-40 place-items-center rounded-full bg-goa-green-deep/60 text-center">
          <div>
            <p className="font-display text-2xl text-goa-yellow">Hacker House</p>
            <p className="font-deva text-2xl leading-none text-goa-yellow">गोवा</p>
          </div>
        </div>
      </div>

      <p className="font-mono-ui text-xl font-bold tracking-tight text-goa-yellow">
        2:47<span className="text-sm">PM</span> STUDIO
      </p>

      <div className="h-[3px] w-64 overflow-hidden rounded-full bg-goa-white/20">
        <div className="h-full bg-goa-pink transition-[width] duration-100" style={{ width: `${progress}%` }} />
      </div>

      <p className="font-mono-ui text-xs tracking-[0.45em] text-goa-yellow">WARMING UP THE BEACH…</p>
    </motion.div>
  );
}
