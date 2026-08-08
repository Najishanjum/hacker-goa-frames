import { motion } from "motion/react";
import palms from "@/assets/palms.jpg";

export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden bg-goa-green">
      <motion.img
        src={palms}
        alt=""
        width={1536}
        height={1024}
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-24 top-0 h-full w-auto max-w-none opacity-25 mix-blend-luminosity sm:opacity-30"
      />
      <motion.img
        src={palms}
        alt=""
        width={1536}
        height={1024}
        animate={{ y: [0, 22, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-24 top-0 h-full w-auto max-w-none -scale-x-100 opacity-25 mix-blend-luminosity sm:opacity-30"
      />
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(color-mix(in oklab, var(--goa-yellow) 55%, transparent) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.09]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,color-mix(in_oklab,var(--goa-green-deep)_85%,transparent)_100%)]" />
    </div>
  );
}
