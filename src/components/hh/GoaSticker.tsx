export function GoaSticker({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-goa-pink px-[0.55em] pb-[0.18em] pt-[0.05em] font-deva leading-none text-goa-yellow shadow-[0_6px_0_0_color-mix(in_oklab,var(--goa-green-ink)_55%,transparent)] ring-[0.09em] ring-goa-yellow ${className}`}
      style={{ WebkitTextStroke: "0.02em var(--goa-pink)" }}
    >
      गोवा
    </span>
  );
}
