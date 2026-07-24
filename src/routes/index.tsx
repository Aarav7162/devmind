import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Activity,
  Radar,
  Waypoints,
  Gauge,
  BookOpen,
  Cpu,
  Building2,
} from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { NeuralBackground } from "@/components/NeuralBackground";
import { Card, Eyebrow, GridBg, SectionHeading, StatusPill } from "@/components/polaris/Primitives";
import { MapPreview } from "@/components/polaris/MapPreview";
import { IncidentCard } from "@/components/polaris/IncidentCard";
import { CAPABILITIES, INCIDENTS } from "@/lib/polaris-data";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "EmSearch Polaris — Risk intelligence for every location" },
      {
        name: "description",
        content:
          "Polaris transforms live hazard feeds, forecasts and calibrated earthquake models into asset-level intelligence — proximity, arrival windows, impacts, actions, evidence.",
      },
      { property: "og:title", content: "EmSearch Polaris" },
      {
        property: "og:description",
        content: "Detect threats. Understand impact. Act earlier.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

function Landing() {
  const featured = INCIDENTS[0];
  const coreCaps = CAPABILITIES.filter((c) =>
    ["eq", "wind", "rain", "fire", "cyclone", "tsunami", "flood", "aqi"].includes(c.id),
  );

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden pt-36 pb-24 sm:pt-44 sm:pb-32">
        <div className="absolute inset-0 -z-10">
          <NeuralBackground />
        </div>
        <GridBg />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_1.15fr] lg:items-center">
            <motion.div {...fade}>
              <Eyebrow>EmReach Risk Intelligence</Eyebrow>
              <h1 className="mt-4 text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
                Know what is happening
                <span className="block bg-gradient-to-r from-[#f0f0f0] via-[#c9c2ff] to-[#7c6cfc] bg-clip-text text-transparent">
                  — and what it means for your operations.
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-[15px] leading-7 text-muted-foreground">
                Polaris monitors authoritative hazard and disruption sources, determines which
                events may affect your people and assets, estimates proximity and arrival windows
                where scientifically valid, and turns fragmented data into evidence-backed
                operational intelligence.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/command-centre"
                  className="inline-flex items-center gap-2 rounded-full bg-[#7c6cfc] px-5 py-2.5 text-sm font-medium text-white shadow-[0_0_36px_-8px_#7c6cfc] transition-all hover:bg-[#9d8ffd]"
                >
                  Open Command Centre <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/capabilities"
                  className="inline-flex items-center gap-2 rounded-full border border-[#2a2a2a] px-5 py-2.5 text-sm text-foreground/90 transition-colors hover:border-[#7c6cfc]/70 hover:text-[#a89dff]"
                >
                  Explore Capabilities
                </Link>
              </div>

              <div className="mt-10 grid max-w-xl grid-cols-2 gap-x-6 gap-y-3 text-[12px] text-muted-foreground sm:grid-cols-4">
                {[
                  { Icon: ShieldCheck, label: "Authoritative-source evidence" },
                  { Icon: Radar, label: "Asset-level impact analysis" },
                  { Icon: Activity, label: "Human-reviewed decisions" },
                  { Icon: Gauge, label: "Autonomous alerts disabled" },
                ].map(({ Icon, label }) => (
                  <div key={label} className="flex items-center gap-2">
                    <Icon className="h-3.5 w-3.5 text-[#7c6cfc]" strokeWidth={1.5} />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fade} transition={{ duration: 0.7, delay: 0.1 }}>
              <div className="relative">
                <div className="absolute -inset-6 -z-10 rounded-3xl bg-[#7c6cfc]/10 blur-3xl" />
                <MapPreview selectedIncidentId={featured.id} />
                <div className="mt-4">
                  <IncidentCard incident={featured} />
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#666]">
                  <span className="rounded-sm border border-[#2a2a2a] px-1.5 py-0.5 text-[#f2c94c]">
                    Human review required
                  </span>
                  <span className="rounded-sm border border-[#2a2a2a] px-1.5 py-0.5 text-[#ef4444]">
                    Automatic alerting: disabled
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PIPELINE */}
      <section className="relative border-t border-[#141414] py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="Operational intelligence"
            title="From fragmented signals to operational context."
            sub="Polaris runs a deterministic pipeline over every hazard event: what happened, who it touches, how severe, how close, when — and what to do about it."
          />

          <div className="mt-14 grid gap-3 lg:grid-cols-6">
            {[
              { t: "Authoritative source", d: "USGS, PTWC, Open-Meteo, agency bulletins.", Icon: Radar },
              { t: "Normalized event", d: "Provider payload → common event schema.", Icon: Waypoints },
              { t: "Asset exposure", d: "Geospatial proximity to your locations.", Icon: Building2 },
              { t: "Risk & confidence", d: "Calibrated probabilities, not black-box labels.", Icon: Gauge },
              { t: "Expected impact", d: "Business-relevant consequences per asset.", Icon: Activity },
              { t: "Recommended action", d: "Suggested operator response, human-reviewed.", Icon: ShieldCheck },
            ].map((s, i) => (
              <motion.div
                key={s.t}
                {...fade}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <Card hover className="h-full p-5">
                  <s.Icon className="h-5 w-5 text-[#7c6cfc]" strokeWidth={1.5} />
                  <div className="mt-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Step {i + 1}
                  </div>
                  <div className="mt-1 text-[14px] font-medium">{s.t}</div>
                  <div className="mt-1.5 text-[12.5px] leading-6 text-muted-foreground">{s.d}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="relative border-t border-[#141414] py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Core capabilities"
              title="A calibrated set of hazards — with clear scope."
              sub="Polaris shows what is trained ML, what is deterministic rules, what is ingestion-only, and what is not yet available. No category is falsely marketed as operational."
            />
            <Link
              to="/capabilities"
              className="inline-flex items-center gap-2 rounded-full border border-[#2a2a2a] px-4 py-2 text-sm hover:border-[#7c6cfc]/70 hover:text-[#a89dff]"
            >
              Full capability matrix <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {coreCaps.map((c) => (
              <Card key={c.id} hover className="flex h-full flex-col p-5">
                <div className="flex items-center justify-between">
                  <div className="text-[14px] font-medium">{c.name}</div>
                  <StatusPill status={c.status} />
                </div>
                <div className="mt-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Source · {c.source}
                </div>
                <p className="mt-2 text-[12.5px] leading-6 text-foreground/80">{c.evaluates}</p>
                <div className="mt-4 space-y-1.5 border-t border-[#181818] pt-3 font-mono text-[10.5px] uppercase tracking-widest text-muted-foreground">
                  <div>Arrival · <span className="text-foreground/80">{c.arrival}</span></div>
                  <div>Method · <span className="text-foreground/80">{c.method}</span></div>
                </div>
                <p className="mt-3 text-[11.5px] leading-5 text-[#8a8a8a]">{c.limitation}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* EARTHQUAKE ML */}
      <section className="relative border-t border-[#141414] py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Earthquake ML"
                title="Calibrated earthquake intelligence — not a black-box severity label."
                sub="Polaris runs an ensemble of expert models with probability calibration, exposure-aware features and explicit thresholds. Every inference runs in shadow mode with human confirmation."
              />
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  ["Damage v1", "4 expert heads"],
                  ["Consequence v2", "3 expert heads"],
                  ["Population-aware", "Exposure features"],
                  ["Thresholds", "Monitor · Balanced · Confirm"],
                ].map(([k, v]) => (
                  <Card key={k} className="p-4">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-[#a89dff]">
                      {k}
                    </div>
                    <div className="mt-1 text-[14px]">{v}</div>
                  </Card>
                ))}
              </div>
              <p className="mt-6 text-[13px] text-muted-foreground">
                Deployment: shadow-mode inference · human confirmation required · no automatic
                external alert authorization.
              </p>
            </div>

            <Card className="p-6">
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Consequence v2 · model evaluation (ROC AUC)
              </div>
              <div className="mt-4 space-y-4">
                {[
                  { k: "Moderate expert", v: 0.963 },
                  { k: "Strong expert", v: 0.971 },
                  { k: "Major / extreme expert", v: 0.968 },
                ].map((r) => (
                  <div key={r.k}>
                    <div className="flex items-baseline justify-between">
                      <div className="text-[13px]">{r.k}</div>
                      <div className="font-mono text-[13px] text-[#a89dff]">
                        {r.v.toFixed(3)}
                      </div>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#141420]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#7c6cfc] to-[#a89dff]"
                        style={{ width: `${r.v * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-[11.5px] leading-5 text-[#8a8a8a]">
                Metrics reflect model evaluation on held-out data — not a guarantee of real-world
                accuracy. Polaris presents probabilities and evidence; humans authorise action.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* MULTI-HAZARD LIMITATIONS */}
      <section className="relative border-t border-[#141414] py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="Multi-hazard scope"
            title="What Polaris will — and will not — infer."
            sub="Polaris never invents an ETA when the source does not support one. We show the raw signal, the rule that fired, and the honest limitation."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              ["Rainfall", "Produces flood potential, not a confirmed flood inundation forecast."],
              ["Wildfire proximity", "Distance to active fire — spread is not predicted."],
              ["Tsunami arrival", "Estimates come from authoritative bulletins only."],
              ["Lightning risk", "Forecast risk indicator, not observed strike data."],
              ["Landslide", "Susceptibility × recent rain — not an exact prediction."],
              ["Air quality", "Raw PM / ozone values — no impact classification yet."],
            ].map(([t, d]) => (
              <Card key={t} className="p-5">
                <div className="font-mono text-[10px] uppercase tracking-widest text-[#a89dff]">
                  {t}
                </div>
                <p className="mt-2 text-[13px] leading-6 text-foreground/85">{d}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* COMMAND CENTRE SHOWCASE */}
      <section className="relative border-t border-[#141414] py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="Command Centre"
            title="Detect · Assess · Prioritize · Review · Act."
            sub="A single operator surface: live geospatial view, ranked incident queue, per-asset context, evidence trail, and human-authorised actions."
            center
          />
          <div className="mt-12">
            <MapPreview selectedIncidentId={INCIDENTS[1].id} className="mx-auto max-w-5xl" />
          </div>
          <div className="mx-auto mt-6 grid max-w-5xl gap-4 md:grid-cols-3">
            {INCIDENTS.map((i) => (
              <IncidentCard key={i.id} incident={i} compact />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/command-centre"
              className="inline-flex items-center gap-2 rounded-full bg-[#7c6cfc] px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#9d8ffd] hover:shadow-[0_0_30px_-6px_#7c6cfc]"
            >
              Open Command Centre <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* EMREACH */}
      <section className="relative border-t border-[#141414] py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <SectionHeading
              eyebrow="EmReach"
              title="Built for critical-event operations."
              sub="EmReach supports organizations with critical-event management and mass-notification capabilities across more than 180 countries. Polaris is the risk-intelligence layer that decides what deserves an operator's attention."
            />
            <Card className="p-6">
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { Icon: Cpu, k: "Deployment", v: "Shadow mode" },
                  { Icon: BookOpen, k: "Evidence", v: "Every event, sourced" },
                  { Icon: ShieldCheck, k: "Control", v: "Human authorised" },
                ].map(({ Icon, k, v }) => (
                  <div key={k} className="rounded-lg border border-[#1e1e1e] bg-[#0d0d10] p-4">
                    <Icon className="h-4 w-4 text-[#7c6cfc]" strokeWidth={1.5} />
                    <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {k}
                    </div>
                    <div className="mt-1 text-[13px]">{v}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/about"
                  className="rounded-full border border-[#2a2a2a] px-4 py-2 text-sm hover:border-[#7c6cfc]/70"
                >
                  About EmReach
                </Link>
                <Link
                  to="/product"
                  className="rounded-full border border-[#2a2a2a] px-4 py-2 text-sm hover:border-[#7c6cfc]/70"
                >
                  How Polaris works
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
