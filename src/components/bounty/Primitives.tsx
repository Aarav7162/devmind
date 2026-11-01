import type { ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#e8a33d]">
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  center,
}: {
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {sub && <p className="mt-4 text-[15px] leading-7 text-muted-foreground">{sub}</p>}
    </div>
  );
}

export function Card({
  children,
  className = "",
  hover = false,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border border-[#262119] bg-[#14110d] ${
        hover ? "card-hover" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function KV({ k, v }: { k: string; v: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-[#1d1913] py-2 last:border-b-0">
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {k}
      </span>
      <span className="text-right text-[13px] text-foreground/90">{v}</span>
    </div>
  );
}

export function GridBg() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.16]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(232,163,61,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(232,163,61,0.14) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
        maskImage:
          "radial-gradient(ellipse at center, black 40%, transparent 78%)",
      }}
    />
  );
}

export function VerifiedBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#2fd48a]/30 bg-[#2fd48a]/10 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-widest text-[#2fd48a]">
      <span
        className="h-1.5 w-1.5 rounded-full bg-[#2fd48a]"
        style={{ boxShadow: "0 0 8px #2fd48a" }}
      />
      Verified
    </span>
  );
}

export function DemoTag() {
  return (
    <span className="rounded-sm border border-[#3a322a] bg-black/60 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
      Demonstration data
    </span>
  );
}
