import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import {
  SETTLED,
  TASKS,
  WORKERS,
  usd,
  type OpenTask,
} from "@/lib/bounty-data";

function matchWorker(task: OpenTask) {
  const idx = Math.abs(task.id.split("-").reduce((a, p) => a + Number(p), 0)) % WORKERS.length;
  return WORKERS[idx];
}

function clearedPrice(task: OpenTask) {
  return task.budgetUsd * 0.92;
}

/**
 * Live orderbook panel: open tasks (asks) on the left, worker bids on the
 * right, and a settlement feed underneath. Every few seconds the next task
 * matches, flashes, and settles — the settled counter increments. The
 * animation starts only after mount so SSR renders a stable first frame.
 */
export function OrderbookPanel({ className = "" }: { className?: string }) {
  const [cursor, setCursor] = useState<number | null>(null);
  const [settledCount, setSettledCount] = useState(14208);

  useEffect(() => {
    setCursor(0);
    const t = setInterval(() => {
      setCursor((c) => {
        const next = (c ?? 0) + 1;
        setSettledCount((n) => n + 1);
        return next % TASKS.length;
      });
    }, 2600);
    return () => clearInterval(t);
  }, []);

  const settling = cursor === null ? null : TASKS[cursor];
  const settledWorker = settling ? matchWorker(settling) : null;

  return (
    <div
      className={`overflow-hidden rounded-xl border border-[#2a241c] bg-[#0f0d0a] ${className}`}
    >
      {/* header */}
      <div className="flex items-center justify-between border-b border-[#1d1913] px-4 py-3">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2fd48a]" style={{ boxShadow: "0 0 8px #2fd48a" }} />
          Orderbook · live
        </div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Settled · <span className="text-[#2fd48a]">{settledCount.toLocaleString()}</span>
        </div>
      </div>

      {/* asks */}
      <div className="divide-y divide-[#1d1913]">
        {TASKS.map((task, i) => {
          const isMatch = settling?.id === task.id;
          const worker = matchWorker(task);
          const price = clearedPrice(task);
          return (
            <div
              key={task.id}
              className={`relative flex items-center gap-3 px-4 py-2.5 transition-colors ${
                isMatch ? "settle-flash" : ""
              }`}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-[#e8a33d]">{task.id}</span>
                  <span className="truncate text-[12px] text-foreground/90">{task.kind}</span>
                </div>
                <div className="mt-0.5 truncate font-mono text-[10px] text-muted-foreground">
                  {task.agent} · posted {task.postedAgo} ago
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono text-[12px] text-foreground">{usd(task.budgetUsd)}</div>
                {isMatch && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-0.5 flex items-center gap-1 font-mono text-[10px] text-[#2fd48a]"
                  >
                    <CheckCircle2 className="h-3 w-3" />
                    matched {worker.id} · {usd(price)}
                  </motion.div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* bids strip */}
      <div className="border-t border-[#1d1913] bg-[#12100c] px-4 py-2.5">
        <div className="flex flex-wrap gap-1.5">
          {WORKERS.map((wk) => (
            <span
              key={wk.id}
              className="rounded-sm border border-[#262119] bg-[#14110d] px-1.5 py-0.5 font-mono text-[9.5px] text-muted-foreground"
            >
              <span className="text-[#2fd48a]">bid</span> {wk.id} · {wk.specialty.toLowerCase()}
            </span>
          ))}
        </div>
      </div>

      {/* settlement feed */}
      <div className="border-t border-[#1d1913] bg-[#0c0a08]">
        <div className="px-4 pt-2.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Settlement ledger
        </div>
        <div className="mt-1 divide-y divide-[#15120e] pb-2">
          {SETTLED.slice(0, 4).map((s) => (
            <div key={s.id} className="flex items-center justify-between gap-3 px-4 py-1.5">
              <div className="flex min-w-0 items-center gap-2">
                <span className="font-mono text-[10px] text-muted-foreground">{s.id}</span>
                <span className="truncate font-mono text-[10px] text-foreground/80">
                  {usd(s.clearedUsd)} → {s.worker}
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
                <span className="text-[#2fd48a]/80">{s.proofHash}</span>
                <span>{s.settledAgo}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
