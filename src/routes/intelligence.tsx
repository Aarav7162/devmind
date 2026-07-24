import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { Eyebrow, SectionHeading } from "@/components/polaris/Primitives";
import { IncidentCard } from "@/components/polaris/IncidentCard";
import { INCIDENTS } from "@/lib/polaris-data";

export const Route = createFileRoute("/intelligence")({
  component: IntelligencePage,
  head: () => ({
    meta: [
      { title: "Intelligence — EmSearch Polaris" },
      {
        name: "description",
        content:
          "Detailed hazard incidents with proximity, arrival windows, expected impacts, recommended actions and source evidence.",
      },
      { property: "og:title", content: "Polaris Intelligence" },
      {
        property: "og:description",
        content: "Every incident, with evidence.",
      },
      { property: "og:url", content: "/intelligence" },
    ],
    links: [{ rel: "canonical", href: "/intelligence" }],
  }),
});

function IntelligencePage() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-36 sm:px-8">
        <Eyebrow>Intelligence</Eyebrow>
        <SectionHeading
          title="Every incident. Fully sourced."
          sub="Each entry answers: what is happening, which asset could be affected, how severe, how close, when — and what an operator should consider doing."
        />

        <div className="mt-10 grid gap-4">
          {INCIDENTS.map((i) => (
            <IncidentCard key={i.id} incident={i} />
          ))}
        </div>

        <p className="mt-10 max-w-3xl text-[13px] leading-6 text-muted-foreground">
          Polaris does not autonomously issue external alerts. Every assessment is presented as
          decision support with the underlying evidence, confidence and limitations attached.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
