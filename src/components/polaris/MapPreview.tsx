import { ASSETS, INCIDENTS } from "@/lib/polaris-data";
import { DemoTag, RiskBadge } from "./Primitives";

/** Compact simulated command-centre map. Purely visual — labelled as demo data. */
export function MapPreview({
  selectedIncidentId,
  className = "",
}: {
  selectedIncidentId?: string;
  className?: string;
}) {
  const selected =
    INCIDENTS.find((i) => i.id === selectedIncidentId) ?? INCIDENTS[0];

  // Very rough geo-normalization for the demo pins (India bounding box)
  const project = (lat: number, lon: number) => {
    const x = ((lon - 68) / (98 - 68)) * 100;
    const y = ((37 - lat) / (37 - 6)) * 100;
    return { x: Math.min(96, Math.max(4, x)), y: Math.min(94, Math.max(6, y)) };
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-[#1e1e1e] bg-[#0b0b0e] ${className}`}
    >
      {/* header strip */}
      <div className="flex items-center justify-between border-b border-[#181818] bg-[#0d0d10]/80 px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#19c37d] shadow-[0_0_10px_#19c37d]" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Polaris · Live geospatial view
          </span>
        </div>
        <DemoTag />
      </div>

      <div className="relative aspect-[16/10]">
        {/* grid */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(124,108,252,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(124,108,252,0.10) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* soft country blob */}
        <div
          aria-hidden
          className="absolute inset-[8%] rounded-[40%_60%_55%_45%/45%_55%_45%_55%] border border-[#1a1a25] bg-gradient-to-br from-[#111226] via-[#0d0d18] to-[#0a0a12] opacity-80"
        />

        {/* assets */}
        {ASSETS.map((a) => {
          const p = project(a.lat, a.lon);
          const isTarget = selected.assetId === a.id;
          return (
            <div
              key={a.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <div className="relative flex flex-col items-center">
                {isTarget && (
                  <span className="absolute -inset-4 animate-ping rounded-full border border-[#7c6cfc]/50" />
                )}
                <span
                  className={`h-2.5 w-2.5 rotate-45 border ${
                    isTarget
                      ? "border-[#a89dff] bg-[#7c6cfc]"
                      : "border-[#3a3a55] bg-[#1a1a2a]"
                  }`}
                />
                <div className="mt-1.5 whitespace-nowrap rounded-sm bg-black/70 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-foreground/80">
                  {a.name.split(" ")[0]}
                </div>
              </div>
            </div>
          );
        })}

        {/* incident marker + range ring for selected */}
        {(() => {
          const targetAsset = ASSETS.find((a) => a.id === selected.assetId);
          if (!targetAsset) return null;
          const p = project(targetAsset.lat, targetAsset.lon);
          return (
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <div className="absolute -inset-10 rounded-full border border-[#ef4444]/30" />
              <div className="absolute -inset-6 rounded-full border border-[#f28c4c]/40" />
              <div className="absolute -inset-3 rounded-full border border-[#f2c94c]/60" />
            </div>
          );
        })()}
      </div>

      {/* footer / evidence bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#181818] bg-[#0d0d10]/70 px-4 py-2.5">
        <div className="flex items-center gap-3">
          <RiskBadge level={selected.risk} />
          <span className="font-mono text-[11px] text-muted-foreground">
            {selected.hazard} · {selected.distanceKm} km · confidence{" "}
            {(selected.confidence * 100).toFixed(0)}%
          </span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#666]">
          Source · {selected.source}
        </span>
      </div>
    </div>
  );
}
