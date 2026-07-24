import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { Card, Eyebrow, SectionHeading, StatusPill } from "@/components/polaris/Primitives";
import { CAPABILITIES } from "@/lib/polaris-data";

export const Route = createFileRoute("/capabilities")({
  component: CapabilitiesPage,
  head: () => ({
    meta: [
      { title: "Capabilities — EmSearch Polaris" },
      {
        name: "description",
        content:
          "The full Polaris capability matrix: hazard, status, source, method (trained ML vs. deterministic rules vs. ingestion), arrival modelling and limitations.",
      },
      { property: "og:title", content: "Polaris Capabilities" },
      {
        property: "og:description",
        content: "Trained ML, deterministic rules, ingestion — clearly distinguished.",
      },
      { property: "og:url", content: "/capabilities" },
    ],
    links: [{ rel: "canonical", href: "/capabilities" }],
  }),
});

function CapabilitiesPage() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 pb-24 pt-36 sm:px-8">
        <Eyebrow>Capabilities matrix</Eyebrow>
        <SectionHeading
          title="What Polaris can do — honestly."
          sub="Polaris labels every hazard with an operational status, upstream provider, and inference method. Trained ML, deterministic rules, raw ingestion and unavailable providers are always distinguished."
        />

        <div className="mt-10 grid gap-3">
          {/* header row */}
          <div className="hidden grid-cols-[1.6fr_1fr_1.4fr_1fr_1fr_1.8fr] gap-3 px-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground md:grid">
            <div>Hazard</div>
            <div>Status</div>
            <div>Source</div>
            <div>Arrival</div>
            <div>Method</div>
            <div>Limitation</div>
          </div>

          {CAPABILITIES.map((c) => (
            <Card key={c.id} className="p-4">
              <div className="grid gap-2 md:grid-cols-[1.6fr_1fr_1.4fr_1fr_1fr_1.8fr] md:gap-3">
                <div className="text-[14px] font-medium">{c.name}</div>
                <div><StatusPill status={c.status} /></div>
                <div className="text-[12.5px] text-foreground/85">{c.source}</div>
                <div className="font-mono text-[11.5px] text-foreground/80">{c.arrival}</div>
                <div className="font-mono text-[11.5px] text-foreground/80">{c.method}</div>
                <div className="text-[12.5px] leading-6 text-[#8a8a8a]">{c.limitation}</div>
              </div>
              <div className="mt-2 text-[12px] leading-6 text-muted-foreground md:hidden">
                {c.evaluates}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <Card className="p-5">
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#a89dff]">
              Method legend
            </div>
            <ul className="mt-3 space-y-2 text-[13px] leading-6 text-foreground/85">
              <li><b>Trained ML</b> — calibrated models with held-out evaluation.</li>
              <li><b>Deterministic rules</b> — configured thresholds over provider signals.</li>
              <li><b>Rule + heuristics</b> — deterministic rules combined with geospatial layers.</li>
              <li><b>Ingestion</b> — provider payload normalized and displayed without inference.</li>
              <li><b>Manual review</b> — analyst-curated entries; no automated pipeline yet.</li>
            </ul>
          </Card>
          <Card className="p-5">
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#a89dff]">
              Status legend
            </div>
            <ul className="mt-3 space-y-2 text-[13px] leading-6 text-foreground/85">
              <li><b>Operational</b> — pipeline live, inference produced per event.</li>
              <li><b>Beta</b> — pipeline exists, coverage or calibration incomplete.</li>
              <li><b>Ingestion only</b> — data flows in, no impact classification yet.</li>
              <li><b>Configured but unavailable</b> — pipeline wired, provider access pending.</li>
              <li><b>Unsupported</b> — not offered by Polaris.</li>
            </ul>
          </Card>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
