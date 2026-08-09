import { motion } from "motion/react";

export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden bg-[#07361f]">
      {/* Background Beach Illustration */}
      <motion.img
        src="/goa-beach.png"
        alt=""
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 h-full w-full scale-105 object-cover opacity-50 blur-[2px] brightness-90"
      />
      {/* Subtle overlay gradient to ensure high legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#052817]/70 via-[#07361f]/50 to-[#031d10]/80" />
      {/* Dot grid texture */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(color-mix(in oklab, var(--goa-yellow) 60%, transparent) 1.2px, transparent 1.2px)",
          backgroundSize: "24px 24px",
        }}
      />
    </div>
  );
}

