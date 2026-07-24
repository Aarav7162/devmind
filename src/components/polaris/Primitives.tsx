import type { ReactNode } from "react";
import { RISK_TOKEN, STATUS_TOKEN, type RiskLevel } from "@/lib/polaris-data";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#a89dff]">
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

export function RiskBadge({ level }: { level: RiskLevel }) {
  const t = RISK_TOKEN[level];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-widest"
      style={{ color: t.fg, borderColor: t.ring, background: `${t.fg}12` }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: t.fg, boxShadow: `0 0 8px ${t.fg}` }}
      />
      {t.label}
    </span>
  );
}

export function StatusPill({ status }: { status: string }) {
  const t = STATUS_TOKEN[status] ?? STATUS_TOKEN["Unsupported"];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest"
      style={{ color: t.fg, background: t.bg }}
    >
      <span className="h-1 w-1 rounded-full" style={{ background: t.fg }} />
      {status}
    </span>
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
      className={`rounded-xl border border-[#1e1e1e] bg-[#0f0f0f] ${
        hover ? "card-hover" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function KV({ k, v }: { k: string; v: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-[#181818] py-2 last:border-b-0">
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
      className="pointer-events-none absolute inset-0 opacity-[0.18]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(124,108,252,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(124,108,252,0.14) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
        maskImage:
          "radial-gradient(ellipse at center, black 40%, transparent 78%)",
      }}
    />
  );
}

export function DemoTag() {
  return (
    <span className="rounded-sm border border-[#333] bg-black/60 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
      Demonstration data
    </span>
  );
}
