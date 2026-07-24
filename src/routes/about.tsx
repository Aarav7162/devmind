import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Globe, ShieldCheck, Users, Building2 } from "lucide-react";
import { SiteHeader, SiteFooter, SUPPORT_EMAIL, COMPANY } from "@/components/SiteChrome";
import { Card, Eyebrow, SectionHeading } from "@/components/polaris/Primitives";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About EmReach — EmSearch Polaris" },
      {
        name: "description",
        content:
          "EmReach Solutions builds critical-event management and risk-intelligence tools used across more than 180 countries. Polaris is the risk-intelligence layer of that platform.",
      },
      { property: "og:title", content: "About EmReach" },
      {
        property: "og:description",
        content: "Critical-event management and risk intelligence, globally.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

function AboutPage() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 pb-24 pt-36 sm:px-8">
        <Eyebrow>About EmReach</Eyebrow>
        <SectionHeading
          title="Critical-event operations, engineered for evidence."
          sub={`${COMPANY} supports organizations with critical-event management and mass-notification capabilities across more than 180 countries. Polaris is the risk-intelligence layer inside that platform.`}
        />

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            { Icon: Globe, k: "Coverage", v: "180+ countries" },
            { Icon: Users, k: "Focus", v: "Critical-event ops teams" },
            { Icon: ShieldCheck, k: "Discipline", v: "Evidence-first" },
          ].map(({ Icon, k, v }) => (
            <Card key={k} className="p-5">
              <Icon className="h-5 w-5 text-[#7c6cfc]" strokeWidth={1.5} />
              <div className="mt-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {k}
              </div>
              <div className="mt-1 text-[15px]">{v}</div>
            </Card>
          ))}
        </div>

        <div className="mt-14 space-y-6 text-[15px] leading-7 text-foreground/85">
          <p>
            EmReach exists because critical-event teams don't need more raw alerts — they need
            clearer answers. Polaris is our attempt at that: a system that watches authoritative
            feeds, works out what could touch your assets, and surfaces the evidence an operator
            actually needs to make a call.
          </p>
          <p>
            Polaris ships in <b>shadow mode</b>. It presents calibrated probabilities, exposure
            geometry, expected impacts and recommended actions — but it does not autonomously
            fire alerts. Every downstream action is authorised by a human. That is the design.
          </p>
          <p className="text-muted-foreground">
            We work with organizations across data centres, logistics, hospitality, energy and
            public infrastructure. If your operations depend on knowing what a signal <em>means</em>
            {" "}for your specific footprint, Polaris was built for you.
          </p>
        </div>

        <Card className="mt-14 p-6">
          <Eyebrow>Contact</Eyebrow>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="flex items-center gap-3 rounded-xl border border-[#1e1e1e] bg-[#0f0f10] px-4 py-3 text-sm transition-colors hover:border-[#7c6cfc]/70"
            >
              <Mail className="h-4 w-4 text-[#7c6cfc]" />
              <span className="font-mono">{SUPPORT_EMAIL}</span>
            </a>
            <div className="flex items-center gap-3 rounded-xl border border-[#1e1e1e] bg-[#0f0f10] px-4 py-3 text-sm">
              <Building2 className="h-4 w-4 text-[#7c6cfc]" />
              <span className="font-mono text-foreground/85">{COMPANY}</span>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/command-centre"
              className="rounded-full bg-[#7c6cfc] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#9d8ffd]"
            >
              Open Command Centre
            </Link>
            <Link
              to="/product"
              className="rounded-full border border-[#2a2a2a] px-5 py-2.5 text-sm hover:border-[#7c6cfc]/70"
            >
              How Polaris works
            </Link>
          </div>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}
