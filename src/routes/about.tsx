import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Mail, Github, Cake, MapPin, Code2 } from "lucide-react";
import { SiteHeader, SiteFooter, GITHUB_URL, SUPPORT_EMAIL } from "@/components/SiteChrome";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — DevMind" },
      {
        name: "description",
        content:
          "DevMind is built by Aarav Kapasi, a 14-year-old solo developer building tools that give programmers their context back.",
      },
      { property: "og:title", content: "About — DevMind" },
      {
        property: "og:description",
        content: "Made by a 14-year-old solo developer. One mind, one CLI.",
      },
    ],
  }),
});

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

function AboutPage() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-40">
        <motion.div {...fade}>
          <div className="font-mono text-xs uppercase tracking-widest text-[#19c37d]">// about</div>
          <h1 className="mt-3 text-balance text-5xl font-bold leading-tight tracking-tight sm:text-6xl">
            Made by one developer.
            <br />
            <span className="bg-gradient-to-r from-[#f0f0f0] via-[#a89dff] to-[#7c6cfc] bg-clip-text text-transparent">
              For developers like him.
            </span>
          </h1>
        </motion.div>

        <motion.div {...fade} transition={{ duration: 0.6, delay: 0.1 }} className="mt-12 space-y-6 text-lg leading-relaxed text-foreground/85">
          <p>
            Hi — I'm <span className="font-semibold text-foreground">Aarav Kapasi</span>, the
            14-year-old solo developer behind DevMind.
          </p>
          <p>
            I built DevMind because I kept losing context. I'd close my laptop in the middle of
            a refactor, come back the next day, and spend the first thirty minutes just trying
            to remember what I was doing and why. AI editors could write code, but none of them
            could remember <em>why</em> I wrote it.
          </p>
          <p>
            So I made the tool I wished existed: a quiet, local AI that watches your project,
            understands your intent, and hands your context back to you in a single command.
          </p>
          <p className="text-muted-foreground">
            DevMind is built in the open, runs entirely on your machine, and will stay free for
            anyone who wants to try it. If you find it useful, the ₹499 Pro license keeps the
            project alive — and lets a 14-year-old keep building.
          </p>
        </motion.div>

        <motion.div {...fade} transition={{ duration: 0.6, delay: 0.2 }} className="mt-14 grid gap-4 sm:grid-cols-3">
          {[
            { Icon: Cake, label: "Age", value: "14" },
            { Icon: MapPin, label: "Role", value: "Solo developer" },
            { Icon: Code2, label: "Stack", value: "Go · Ollama · TS" },
          ].map((item) => (
            <div key={item.label} className="card-hover rounded-2xl border border-[#222] bg-[#111] p-5">
              <item.Icon className="h-5 w-5 text-[#7c6cfc]" strokeWidth={1.5} />
              <div className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">
                {item.label}
              </div>
              <div className="mt-1 font-mono text-sm">{item.value}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          {...fade}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 rounded-2xl border border-[#222] bg-[#0d0d0d] p-6"
        >
          <div className="font-mono text-xs uppercase tracking-widest text-[#a89dff]">
            // get in touch
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="flex items-center gap-3 rounded-xl border border-[#222] bg-[#111] px-4 py-3 text-sm transition-colors hover:border-[#7c6cfc]"
            >
              <Mail className="h-4 w-4 text-[#7c6cfc]" />
              <span className="font-mono">{SUPPORT_EMAIL}</span>
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-xl border border-[#222] bg-[#111] px-4 py-3 text-sm transition-colors hover:border-[#7c6cfc]"
            >
              <Github className="h-4 w-4 text-[#7c6cfc]" />
              <span className="font-mono">github.com/Aarav7162/devmind</span>
            </a>
          </div>
        </motion.div>

        <motion.div {...fade} transition={{ duration: 0.6, delay: 0.4 }} className="mt-12 flex flex-wrap gap-3">
          <Link
            to="/docs"
            className="rounded-full bg-[#7c6cfc] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#9d8ffd] hover:shadow-[0_0_30px_-4px_#7c6cfc]"
          >
            Read the docs
          </Link>
          <Link
            to="/"
            hash="install"
            className="rounded-full border border-[#333] px-6 py-3 text-sm font-medium transition-colors hover:border-[#7c6cfc] hover:text-[#7c6cfc]"
          >
            Install DevMind
          </Link>
        </motion.div>
      </main>
      <SiteFooter />
    </div>
  );
}
