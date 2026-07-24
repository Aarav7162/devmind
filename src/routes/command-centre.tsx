import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Filter, Radio, ShieldAlert } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { Card, Eyebrow, KV, RiskBadge, StatusPill } from "@/components/polaris/Primitives";
import { MapPreview } from "@/components/polaris/MapPreview";
import { IncidentCard } from "@/components/polaris/IncidentCard";
import { ASSETS, CAPABILITIES, INCIDENTS, type RiskLevel } from "@/lib/polaris-data";

export const Route = createFileRoute("/command-centre")({
  component: CommandCentre,
  head: () => ({
    meta: [
      { title: "Command Centre — EmSearch Polaris" },
      {
        name: "description",
        content:
          "Live geospatial view, ranked incident queue and per-asset context. Human-reviewed decision support with authoritative-source evidence.",
      },
      { property: "og:title", content: "Polaris Command Centre" },
      {
        property: "og:description",
        content: "Detect · Assess · Prioritize · Review · Act.",
      },
      { property: "og:url", content: "/command-centre" },
    ],
    links: [{ rel: "canonical", href: "/command-centre" }],
  }),
});

const RISKS: RiskLevel[] = ["Monitor", "Elevated", "High", "Severe"];

function CommandCentre() {
  const [selected, setSelected] = useState(INCIDENTS[0].id);
  const [assetFilter, setAssetFilter] = useState<string | "all">("all");

  const filtered = useMemo(
    () =>
      assetFilter === "all"
        ? INCIDENTS
        : INCIDENTS.filter((i) => i.assetId === assetFilter),
    [assetFilter],
  );
  const current = INCIDENTS.find((i) => i.id === selected) ?? INCIDENTS[0];

  const opsCaps = CAPABILITIES.filter((c) => c.status === "Operational");

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-5 pb-24 pt-32 sm:px-8">
        {/* status strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#1e1e1e] bg-[#0d0d10] px-5 py-4"
        >
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#19c37d] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#19c37d]" />
            </span>
            <Eyebrow>Command Centre · Online</Eyebrow>
            <span className="hidden font-mono text-[11px] text-muted-foreground sm:inline">
              Ingestion streaming · shadow-mode inference · human review required
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest">
            <span className="rounded-sm border border-[#2a2a2a] bg-black/60 px-1.5 py-0.5 text-[#f2c94c]">
              Human review required
            </span>
            <span className="rounded-sm border border-[#2a2a2a] bg-black/60 px-1.5 py-0.5 text-[#ef4444]">
              Auto alerting: disabled
            </span>
          </div>
        </motion.div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* main column */}
          <div className="space-y-6">
            <MapPreview selectedIncidentId={current.id} />
            <IncidentCard incident={current} />

            <div>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  <Radio className="h-3.5 w-3.5" /> Incident queue · {filtered.length}
                </div>
                <div className="flex items-center gap-2 text-[11px]">
                  <Filter className="h-3.5 w-3.5 text-muted-foreground" />
                  <select
                    className="rounded-md border border-[#222] bg-[#0f0f10] px-2 py-1 font-mono text-[11px]"
                    value={assetFilter}
                    onChange={(e) => setAssetFilter(e.target.value)}
                  >
                    <option value="all">All assets</option>
                    {ASSETS.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid gap-3">
                {filtered.map((i) => (
                  <IncidentCard
                    key={i.id}
                    incident={i}
                    compact
                    active={i.id === selected}
                    onSelect={() => setSelected(i.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* right rail */}
          <aside className="space-y-6">
            <Card className="p-5">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-[#7c6cfc]" />
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Risk distribution
                </div>
              </div>
              <div className="mt-4 space-y-3">
                {RISKS.map((r) => {
                  const n = INCIDENTS.filter((i) => i.risk === r).length;
                  return (
                    <div key={r} className="flex items-center justify-between">
                      <RiskBadge level={r} />
                      <div className="font-mono text-[13px] tabular-nums">{n}</div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="p-5">
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Selected event
              </div>
              <div className="mt-3">
                <KV k="Event" v={current.id} />
                <KV k="Hazard" v={current.hazard} />
                <KV k="Risk" v={<RiskBadge level={current.risk} />} />
                <KV
                  k="Confidence"
                  v={`${(current.confidence * 100).toFixed(0)}%`}
                />
                <KV k="Distance" v={`${current.distanceKm} km`} />
                <KV k="Arrival" v={current.arrival} />
                <KV k="Source" v={current.source} />
                <KV k="Method" v={<StatusPill status={current.method} />} />
              </div>
              <button className="mt-4 w-full rounded-md border border-[#2a2a2a] bg-[#141420] py-2 font-mono text-[11px] uppercase tracking-widest text-[#a89dff] transition-colors hover:border-[#7c6cfc]/70">
                Send for human review
              </button>
            </Card>

            <Card className="p-5">
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Source freshness
              </div>
              <div className="mt-3 space-y-2 text-[12.5px]">
                {opsCaps.slice(0, 6).map((c) => (
                  <div key={c.id} className="flex items-center justify-between">
                    <span className="text-foreground/85">{c.name}</span>
                    <span className="font-mono text-[11px] text-[#19c37d]">
                      streaming · &lt; 60s
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
