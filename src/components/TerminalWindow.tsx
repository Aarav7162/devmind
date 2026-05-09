import type { ReactNode } from "react";

export function TerminalWindow({ title = "devmind", children, className = "" }: { title?: string; children: ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-[#222] bg-[#111] shadow-2xl shadow-black/40 ${className}`}>
      <div className="flex items-center gap-2 border-b border-[#222] bg-[#0d0d0d] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-[#666]">{title}</span>
      </div>
      <div className="px-5 py-5">{children}</div>
    </div>
  );
}
