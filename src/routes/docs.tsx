import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { SiteHeader, SiteFooter, SUPPORT_EMAIL } from "@/components/SiteChrome";
import { Card, Eyebrow, SectionHeading, StatusPill } from "@/components/polaris/Primitives";
import { CAPABILITIES } from "@/lib/polaris-data";

export const Route = createFileRoute("/docs")({
  component: DocsPage,
  head: () => ({
    meta: [
      { title: "Docs — EmSearch Polaris" },
      {
        name: "description",
        content:
          "Concepts, hazard scope, event schema and operational guidance for the Polaris risk-intelligence platform.",
      },
      { property: "og:title", content: "Polaris Docs" },
      {
        property: "og:description",
        content: "Concepts, scope, schema and operational guidance.",
      },
      { property: "og:url", content: "/docs" },
    ],
    links: [{ rel: "canonical", href: "/docs" }],
  }),
});

function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="mb-4 mt-14 scroll-mt-32 text-2xl font-semibold tracking-tight">
      {children}
    </h2>
  );
}
function P({ children }: { children: ReactNode }) {
  return <p className="my-3 text-[14.5px] leading-7 text-foreground/85">{children}</p>;
}
function Mono({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-md border border-[#222] bg-[#141416] px-1.5 py-0.5 font-mono text-[12.5px] text-[#a89dff]">
      {children}
    </code>
  );
}

const TOC: { id: string; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "concepts", label: "Core concepts" },
  { id: "event-schema", label: "Event schema" },
  { id: "risk-model", label: "Risk & confidence" },
  { id: "earthquake", label: "Earthquake ML" },
  { id: "multi-hazard", label: "Multi-hazard scope" },
  { id: "review", label: "Human review" },
  { id: "faq", label: "FAQ" },
];

function DocsPage() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 pb-24 pt-36 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <Eyebrow>Docs</Eyebrow>
            <nav className="mt-4 flex flex-col gap-1">
              {TOC.map((t) => (
                <a
                  key={t.id}
                  href={`#${t.id}`}
                  className="rounded-md border-l-2 border-transparent px-3 py-1.5 text-[13px] text-muted-foreground transition-colors hover:border-[#7c6cfc] hover:text-foreground"
                >
                  {t.label}
                </a>
              ))}
            </nav>
          </aside>

          <article>
            <SectionHeading
              title="Polaris documentation"
              sub="Everything an operator or integrator needs to understand what Polaris is, what it infers, what it does not, and how to read a Polaris event."
            />

            <H2 id="overview">Overview</H2>
            <P>
              <b>EmSearch Polaris</b> is a risk-intelligence and decision-support platform. It ingests
              authoritative hazard feeds, resolves their impact against your configured assets, and
              presents evidence-backed operational intelligence. Polaris is not a weather app, map
              viewer or autonomous alerting system.
            </P>
            <P>
              Polaris always answers: <em>What is happening? Which asset could be affected? How
              severe? How close? When could it arrive (where valid)? What impacts are expected?
              What should an operator consider doing? Which evidence supports the assessment?</em>
            </P>

            <H2 id="concepts">Core concepts</H2>
            <div className="grid gap-3 md:grid-cols-2">
              {[
                ["Event", "A normalized hazard occurrence from a provider — earthquake, gust window, rain band, etc."],
                ["Asset", "A configured location Polaris evaluates events against. Carries a criticality tier."],
                ["Exposure", "Geospatial proximity and susceptibility of an asset to a given event."],
                ["Risk level", "Monitor · Elevated · High · Severe — derived from calibrated probability or a fired rule."],
                ["Confidence", "Model probability, or rule strength, expressed as a percentage."],
                ["Evidence", "The full trail: source, method, threshold, and any known limitation."],
              ].map(([k, v]) => (
                <Card key={k} className="p-4">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-[#a89dff]">{k}</div>
                  <div className="mt-1.5 text-[13px] leading-6 text-foreground/85">{v}</div>
                </Card>
              ))}
            </div>

            <H2 id="event-schema">Event schema</H2>
            <P>
              Every Polaris event, regardless of provider, carries at least these fields:
            </P>
            <Card className="p-5">
              <pre className="overflow-x-auto font-mono text-[12.5px] leading-6 text-foreground/85">
{`{
  "id":         "INC-2411",
  "hazard":     "Earthquake",
  "source":     "USGS",
  "method":     "Trained ML",
  "risk":       "Elevated",
  "confidence": 0.78,
  "asset_id":   "che-wh",
  "distance_km": 84,
  "arrival":    null,          // null when not scientifically valid
  "detected_at":"2026-07-24T09:41:02Z",
  "impacts":    ["..."],
  "actions":    ["..."],
  "review":     "required"
}`}
              </pre>
            </Card>
            <P>
              <Mono>arrival</Mono> is <Mono>null</Mono> whenever the upstream provider does not
              publish an arrival estimate. Polaris will not synthesize one.
            </P>

            <H2 id="risk-model">Risk & confidence</H2>
            <P>
              Polaris uses four risk levels — <b>Monitor</b>, <b>Elevated</b>, <b>High</b>,{" "}
              <b>Severe</b> — assigned by (a) a calibrated model probability crossing a configured
              threshold, or (b) a deterministic rule firing over provider signals. Both paths carry
              the underlying evidence into the event record.
            </P>

            <H2 id="earthquake">Earthquake ML</H2>
            <P>
              Polaris ships an ensemble of expert models:
            </P>
            <ul className="my-3 list-disc space-y-1.5 pl-6 text-[14px] text-foreground/85">
              <li>4 Earthquake Damage v1 expert heads</li>
              <li>3 Earthquake Consequence v2 expert heads with population-exposure features</li>
              <li>Calibrated probability outputs with Monitor / Balanced / Confirmation thresholds</li>
              <li>Shadow-mode inference — human confirmation required</li>
            </ul>
            <P>
              Held-out ROC AUC (Consequence v2): moderate ~0.963, strong ~0.971, major/extreme ~0.968.
              These are evaluation metrics, not accuracy guarantees on future events.
            </P>

            <H2 id="multi-hazard">Multi-hazard scope</H2>
            <div className="mt-2 grid gap-3 md:grid-cols-2">
              {CAPABILITIES.slice(0, 8).map((c) => (
                <Card key={c.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-[13.5px] font-medium">{c.name}</div>
                    <StatusPill status={c.status} />
                  </div>
                  <div className="mt-2 font-mono text-[11px] text-muted-foreground">
                    {c.source} · {c.method}
                  </div>
                  <div className="mt-2 text-[12.5px] leading-6 text-[#8a8a8a]">{c.limitation}</div>
                </Card>
              ))}
            </div>

            <H2 id="review">Human review</H2>
            <P>
              Polaris does not autonomously issue external alerts. Every high-risk event is
              routed for human confirmation before any outbound action is taken. This is a
              deliberate design choice: decision support, not decision replacement.
            </P>

            <H2 id="faq">FAQ</H2>
            <div className="grid gap-3">
              {[
                ["Does Polaris predict disasters?", "No. Polaris turns authoritative signals into asset-level intelligence. It never claims to prevent events, and never replaces official warning authorities."],
                ["Can Polaris automatically page my staff?", "Not today. Polaris is deployed in shadow mode. Human operators authorise any downstream notification via EmReach's critical-event management surface."],
                ["Where do arrival estimates come from?", "For tsunamis and cyclones, from the issuing agency's bulletin. For wind and rain, from Open-Meteo forecast windows. Polaris will show 'Not available' when no valid source exists."],
                ["How do I contact the team?", <>Email <a className="text-[#a89dff] underline underline-offset-4" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.</>],
              ].map(([q, a], i) => (
                <Card key={i} className="p-5">
                  <div className="text-[14px] font-medium">{q}</div>
                  <div className="mt-2 text-[13.5px] leading-6 text-foreground/85">{a}</div>
                </Card>
              ))}
            </div>

            <div className="mt-14 flex flex-wrap gap-3">
              <Link
                to="/command-centre"
                className="rounded-full bg-[#7c6cfc] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#9d8ffd]"
              >
                Open Command Centre
              </Link>
              <Link
                to="/capabilities"
                className="rounded-full border border-[#2a2a2a] px-5 py-2.5 text-sm hover:border-[#7c6cfc]/70"
              >
                Capability matrix
              </Link>
            </div>
          </article>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
