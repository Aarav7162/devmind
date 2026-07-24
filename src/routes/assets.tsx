import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Building2, Server, Warehouse } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { Card, DemoTag, Eyebrow, KV, SectionHeading } from "@/components/polaris/Primitives";
import { ASSETS, INCIDENTS } from "@/lib/polaris-data";

export const Route = createFileRoute("/assets")({
  component: AssetsPage,
  head: () => ({
    meta: [
      { title: "Assets — EmSearch Polaris" },
      {
        name: "description",
        content:
          "Configured locations Polaris monitors for hazard exposure. Sample assets shown for demonstration.",
      },
      { property: "og:title", content: "Polaris Assets" },
      {
        property: "og:description",
        content: "Locations Polaris monitors for hazard exposure.",
      },
      { property: "og:url", content: "/assets" },
    ],
    links: [{ rel: "canonical", href: "/assets" }],
  }),
});

const ICONS: Record<string, typeof Building2> = {
  "mum-hq": Building2,
  "del-dc": Server,
  "che-wh": Warehouse,
};

function AssetsPage() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-36 sm:px-8">
        <div className="flex items-center gap-3">
          <Eyebrow>Assets</Eyebrow>
          <DemoTag />
        </div>
        <SectionHeading
          title="The locations Polaris watches."
          sub="Each asset carries a criticality tier and coordinates. Hazard events are evaluated against every configured location — distance, exposure and expected impact are computed per-asset."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {ASSETS.map((a) => {
            const Icon = ICONS[a.id] ?? Building2;
            const openIncidents = INCIDENTS.filter((i) => i.assetId === a.id);
            return (
              <Card key={a.id} hover className="flex h-full flex-col p-5">
                <div className="flex items-start justify-between">
                  <Icon className="h-5 w-5 text-[#7c6cfc]" strokeWidth={1.5} />
                  <span
                    className="rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest"
                    style={{
                      color: a.criticality === "Critical" ? "#ef4444" : "#f28c4c",
                      borderColor:
                        a.criticality === "Critical"
                          ? "rgba(239,68,68,0.4)"
                          : "rgba(242,140,76,0.4)",
                    }}
                  >
                    {a.criticality}
                  </span>
                </div>
                <div className="mt-4 text-[15px] font-medium">{a.name}</div>
                <div className="mt-1 flex items-center gap-1.5 text-[12px] text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" /> {a.region}
                </div>

                <div className="mt-5 space-y-0.5">
                  <KV k="Latitude" v={<span className="font-mono">{a.lat.toFixed(4)}</span>} />
                  <KV k="Longitude" v={<span className="font-mono">{a.lon.toFixed(4)}</span>} />
                  <KV k="Type" v="Demonstration asset" />
                  <KV
                    k="Open events"
                    v={
                      <span className="font-mono">
                        {openIncidents.length}
                      </span>
                    }
                  />
                </div>
              </Card>
            );
          })}
        </div>

        <p className="mt-10 max-w-3xl text-[13px] leading-6 text-muted-foreground">
          These sample assets are shown for demonstration only. In production, Polaris will
          reflect assets configured by your organization; criticality tiers influence prioritization
          and expected-impact wording, not detection thresholds.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
