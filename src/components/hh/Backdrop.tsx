import { motion } from "motion/react";
import beach from "@/assets/goa-beach.png.asset.json";

export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden bg-goa-green">
      <motion.img
        src={beach.url}
        alt=""
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-25 blur-[6px]"
      />
      <div className="absolute inset-0 bg-goa-green-deep/70" />
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "radial-gradient(color-mix(in oklab, var(--goa-yellow) 55%, transparent) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,color-mix(in_oklab,var(--goa-green-ink)_88%,transparent)_100%)]" />
    </div>
  );
}
