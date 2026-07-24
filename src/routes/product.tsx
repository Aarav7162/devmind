import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Radar, Waypoints, Building2, Gauge, Activity, ShieldCheck, ArrowRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { Card, Eyebrow, SectionHeading } from "@/components/polaris/Primitives";
import { MapPreview } from "@/components/polaris/MapPreview";
import { INCIDENTS } from "@/lib/polaris-data";

export const Route = createFileRoute("/product")({
  component: ProductPage,
  head: () => ({
    meta: [
      { title: "How Polaris works — EmSearch Polaris" },
      {
        name: "description",
        content:
          "The Polaris pipeline: authoritative source, event normalization, asset exposure, calibrated risk, expected impact, recommended action, human review.",
      },
      { property: "og:title", content: "How Polaris works" },
      {
        property: "og:description",
        content: "From authoritative source to operator decision — with evidence.",
      },
      { property: "og:url", content: "/product" },
    ],
    links: [{ rel: "canonical", href: "/product" }],
  }),
});

const STEPS = [
  {
    Icon: Radar,
    t: "Authoritative source",
    d: "Polaris streams from providers with a clear chain of trust: USGS for seismicity, tsunami warning centres for coastal bulletins, Open-Meteo for forecast physics, agency bulletins for cyclone tracks.",
  },
  {
    Icon: Waypoints,
    t: "Event normalization",
    d: "Every provider payload is mapped to a common event schema: hazard type, geometry, time, magnitude / intensity, source identifiers, freshness. Nothing about the raw provider is lost.",
  },
  {
    Icon: Building2,
    t: "Asset exposure",
    d: "Polaris computes proximity and geospatial exposure against every configured location. Assets carry a criticality tier that influences prioritization — not detection thresholds.",
  },
  {
    Icon: Gauge,
    t: "Risk & confidence",
    d: "Where trained ML applies, calibrated probability outputs feed monitor / balanced / confirmation thresholds. Where rules apply, the fired rule is shown alongside its parameters.",
  },
  {
    Icon: Activity,
    t: "Expected impact",
    d: "Impacts are written in operational language: staff safety, facility integrity, power stability, logistics, contractor exposure. No safety guarantees — only likely operational consequences.",
  },
  {
    Icon: ShieldCheck,
    t: "Recommended action & review",
    d: "Polaris suggests operator actions with the evidence attached. Every action requires human confirmation. Polaris does not authorise autonomous external alerts.",
  },
];

function ProductPage() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 pb-24 pt-36 sm:px-8">
        <Eyebrow>How it works</Eyebrow>
        <SectionHeading
          title="The Polaris pipeline, end to end."
          sub="A deterministic path from an authoritative signal to an operator decision — with the underlying evidence, method and limitation surfaced at every step."
        />

        <div className="mt-10">
          <MapPreview selectedIncidentId={INCIDENTS[0].id} />
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Card hover className="h-full p-6">
                <s.Icon className="h-5 w-5 text-[#7c6cfc]" strokeWidth={1.5} />
                <div className="mt-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Step {i + 1}
                </div>
                <div className="mt-1 text-[15px] font-medium">{s.t}</div>
                <p className="mt-2 text-[13px] leading-6 text-foreground/80">{s.d}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {[
            ["Not a weather app", "Polaris does not present forecasts as products. Forecasts are inputs; the output is asset-level risk intelligence."],
            ["Not an alerting system", "Polaris does not autonomously notify staff or authorities. Human operators authorise every downstream action."],
            ["Not a black box", "Every event carries source, method, thresholds, confidence and limitations. Operators can defend every decision."],
          ].map(([t, d]) => (
            <Card key={t} className="p-5">
              <div className="font-mono text-[10px] uppercase tracking-widest text-[#a89dff]">{t}</div>
              <p className="mt-2 text-[13px] leading-6 text-foreground/85">{d}</p>
            </Card>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap gap-3">
          <Link
            to="/command-centre"
            className="inline-flex items-center gap-2 rounded-full bg-[#7c6cfc] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#9d8ffd]"
          >
            Open Command Centre <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/capabilities"
            className="inline-flex items-center gap-2 rounded-full border border-[#2a2a2a] px-5 py-2.5 text-sm hover:border-[#7c6cfc]/70"
          >
            Capability matrix
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
