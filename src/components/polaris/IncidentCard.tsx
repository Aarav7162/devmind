import type { Incident } from "@/lib/polaris-data";
import { ASSETS } from "@/lib/polaris-data";
import { Card, KV, RiskBadge, StatusPill } from "./Primitives";

export function IncidentCard({
  incident,
  compact = false,
  onSelect,
  active = false,
}: {
  incident: Incident;
  compact?: boolean;
  onSelect?: () => void;
  active?: boolean;
}) {
  const asset = ASSETS.find((a) => a.id === incident.assetId);
  return (
    <Card
      className={`p-4 transition-colors ${
        active ? "border-[#7c6cfc]/60 shadow-[0_0_0_1px_#7c6cfc55]" : ""
      } ${onSelect ? "cursor-pointer hover:border-[#333]" : ""}`}
    >
      <div onClick={onSelect}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <RiskBadge level={incident.risk} />
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {incident.id}
              </span>
            </div>
            <h3 className="mt-2 truncate text-[14px] font-medium text-foreground">
              {incident.headline}
            </h3>
            <div className="mt-1 font-mono text-[11px] text-muted-foreground">
              {incident.hazard} · {asset?.name} · {incident.detectedAt}
            </div>
          </div>
          <StatusPill status={incident.method} />
        </div>

        {!compact && (
          <>
            <div className="mt-4 grid grid-cols-2 gap-x-6">
              <div>
                <KV k="Distance" v={`${incident.distanceKm} km`} />
                <KV
                  k="Confidence"
                  v={`${(incident.confidence * 100).toFixed(0)}%`}
                />
                <KV k="Arrival" v={incident.arrival} />
              </div>
              <div>
                <KV k="Source" v={incident.source} />
                <KV k="Method" v={incident.method} />
                <KV k="Review" v="Human review required" />
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Expected impacts
                </div>
                <ul className="space-y-1.5 text-[13px] text-foreground/85">
                  {incident.impacts.map((i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 flex-none rounded-full bg-[#f28c4c]" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Recommended actions
                </div>
                <ul className="space-y-1.5 text-[13px] text-foreground/85">
                  {incident.actions.map((i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 flex-none rounded-full bg-[#7c6cfc]" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}
