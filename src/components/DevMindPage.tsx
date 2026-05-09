import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NeuralBackground } from "@/components/NeuralBackground";
import { TerminalWindow } from "@/components/TerminalWindow";
import { TerminalTyper } from "@/components/TerminalTyper";

const HEX = (
  <svg width="20" height="22" viewBox="0 0 20 22" fill="none" aria-hidden="true">
    <path d="M10 1l8.66 5v10L10 21l-8.66-5V6L10 1z" stroke="#7c6cfc" strokeWidth="1.5" />
    <path d="M10 6l4.33 2.5v5L10 16l-4.33-2.5v-5L10 6z" fill="#7c6cfc" fillOpacity="0.25" stroke="#7c6cfc" strokeWidth="1" />
  </svg>
);

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled ? "border-b border-[#222] bg-[#0a0a0a]/70 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2.5">
          {HEX}
          <span className="text-lg font-bold tracking-tight text-foreground">DevMind</span>
        </a>
        <div className="flex items-center gap-2 text-sm sm:gap-6">
          <a href="#" className="hidden text-muted-foreground transition-colors hover:text-foreground sm:inline">GitHub</a>
          <a href="#install" className="hidden text-muted-foreground transition-colors hover:text-foreground sm:inline">Docs</a>
          <a
            href="#pricing"
            className="rounded-full bg-[#7c6cfc] px-4 py-2 text-sm font-medium text-white transition-all hover:bg-[#9d8ffd] hover:shadow-[0_0_24px_-4px_#7c6cfc]"
          >
            Buy Pro — ₹499
          </a>
        </div>
      </nav>
    </header>
  );
}

const heroFrames = [
  `$ devmind init
✓ DevMind initialized and running!
  AI engine: Ollama ready
  Watching: /Users/dev/my-project`,
  `$ devmind resume
┌─ DevMind — Session 12 ──────────────────────┐
│ 🧠 Where you left off:                      │
│ You were migrating the auth system to JWT.  │
│ The refresh token logic is incomplete.      │
└─────────────────────────────────────────────┘`,
  `$ devmind standup
**Yesterday:** Refactored auth module, removed cookie sessions.
**Today:** Complete refresh token flow and add tests.
**Blockers:** None.`,
  `$ devmind commit
✓ feat(auth): scaffold JWT refresh rotation
  • adds refresh endpoint
  • removes legacy cookie session middleware`,
];

function Hero() {
  return (
    <section className="relative overflow-hidden pb-24 pt-40">
      <div className="absolute inset-0">
        <NeuralBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]" />
      </div>
      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div {...fade} className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#222] bg-[#111]/80 px-3 py-1 font-mono text-xs text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[#19c37d] shadow-[0_0_8px_#19c37d]" />
            v1.0 — runs 100% locally
          </div>
          <h1 className="text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            Your code has context.
            <br />
            <span className="bg-gradient-to-r from-[#f0f0f0] via-[#a89dff] to-[#7c6cfc] bg-clip-text text-transparent">
              Now so do you.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-muted-foreground sm:text-xl">
            DevMind watches your project silently, understands what you're building, and gives
            you your brain back every morning.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#install"
              className="rounded-full bg-[#7c6cfc] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#9d8ffd] hover:shadow-[0_0_30px_-4px_#7c6cfc]"
            >
              Download Free
            </a>
            <a
              href="#how"
              className="rounded-full border border-[#333] bg-transparent px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-[#7c6cfc] hover:text-[#7c6cfc]"
            >
              See how it works ↓
            </a>
          </div>
        </motion.div>

        <motion.div {...fade} transition={{ duration: 0.7, delay: 0.15 }} className="mx-auto mt-16 max-w-3xl">
          <TerminalWindow title="~/my-project — devmind">
            <TerminalTyper frames={heroFrames} className="min-h-[200px] text-[#d4d4d4]" />
          </TerminalWindow>
        </motion.div>
      </div>
    </section>
  );
}

function Problem() {
  const pains = [
    { icon: "🧠", text: "You open your laptop and forget where you left off." },
    { icon: "🔄", text: "Your AI assistant has no memory between sessions." },
    { icon: "📋", text: "Writing standup updates wastes 10 minutes every morning." },
  ];
  return (
    <section className="border-t border-[#161616] py-28">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 md:grid-cols-2 md:gap-12">
        <motion.h2 {...fade} className="text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          AI IDEs write your code. <span className="text-muted-foreground">None of them remember why you wrote it.</span>
        </motion.h2>
        <div className="space-y-4">
          {pains.map((p, i) => (
            <motion.div
              key={p.text}
              {...fade}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-hover flex items-start gap-4 rounded-2xl border border-[#222] bg-[#111] p-6"
            >
              <span className="text-2xl">{p.icon}</span>
              <p className="text-lg text-foreground/90">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", title: "devmind init", desc: "Installs Ollama and creates .devmind/ in your project." },
    { n: "02", title: "Watches silently", desc: "Tracks every file save, terminal command, and git action." },
    { n: "03", title: "AI synthesizes", desc: "Every 5 minutes, local Ollama writes a summary of your intent." },
    { n: "04", title: "You stay in flow", desc: "Wake up, type devmind resume — instant context recovery." },
  ];
  return (
    <section id="how" className="border-t border-[#161616] py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fade} className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">How DevMind works</h2>
          <p className="mt-4 text-lg text-muted-foreground">A quiet companion, always thinking alongside you.</p>
        </motion.div>
        <div className="relative grid gap-6 md:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              {...fade}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="card-hover relative rounded-2xl border border-[#222] bg-[#111] p-6"
            >
              <div className="font-mono text-xs text-[#7c6cfc]">{s.n}</div>
              <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              {i < steps.length - 1 && (
                <div className="absolute right-[-14px] top-1/2 hidden -translate-y-1/2 text-[#333] md:block">
                  →
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    ["🧠", "devmind resume", "Know exactly where you left off, every morning."],
    ["📋", "devmind standup", "Auto-generate your daily standup in one command."],
    ["💬", "devmind commit", "AI commit messages that understand your intent, not just the diff."],
    ["🔍", "devmind diff", "Explain any git diff in plain English instantly."],
    ["🎯", "devmind focus", "Get a focus score and detect context-switching."],
    ["🔬", "devmind review", "AI code review of files you actually changed this session."],
    ["❓", "devmind ask", "Query your own session history like a search engine."],
    ["📊", "devmind report", "Weekly productivity report saved as Markdown."],
    ["📁", "devmind export", "Export any session as a clean Markdown file."],
    ["🚫", "devmind ignore", "Per-project ignore patterns, like .gitignore."],
    ["🕒", "devmind timeline", "See everything you touched, in order, in a table."],
    ["🔑", "devmind activate", "Unlock unlimited summaries with a license key."],
  ];
  return (
    <section className="border-t border-[#161616] py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fade} className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Everything your future self needs</h2>
          <p className="mt-4 text-lg text-muted-foreground">Twelve commands. One persistent mind.</p>
        </motion.div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(([icon, name, desc], i) => (
            <motion.div
              key={name}
              {...fade}
              transition={{ duration: 0.45, delay: (i % 6) * 0.05 }}
              className="card-hover rounded-2xl border border-[#222] bg-[#1a1a1a] p-6"
            >
              <div className="text-2xl">{icon}</div>
              <div className="mt-4 font-mono text-sm font-semibold text-[#a89dff]">{name}</div>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Privacy() {
  const items = [
    ["🔒", "Local AI (Ollama)"],
    ["🚫", "No data sent to cloud"],
    ["⚡", "Works offline"],
    ["🆓", "Free AI, forever"],
  ];
  return (
    <section className="border-t border-[#161616] py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          {...fade}
          className="overflow-hidden rounded-3xl border border-[#222] bg-gradient-to-br from-[#111] to-[#0d0d0d] p-10 sm:p-14"
        >
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-[#19c37d]">// privacy</div>
              <h2 className="mt-3 text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                Runs locally. <br />
                <span className="text-muted-foreground">Free forever.</span>
              </h2>
              <p className="mt-5 max-w-md text-lg text-muted-foreground">
                No cloud. No subscriptions. No API keys required. DevMind uses Ollama to run AI
                entirely on your machine. Your code never leaves your computer.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {items.map(([i, t]) => (
                <div key={t} className="rounded-2xl border border-[#222] bg-[#0a0a0a] p-5">
                  <div className="text-2xl">{i}</div>
                  <div className="mt-3 text-sm font-medium text-foreground">{t}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="border-t border-[#161616] py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fade} className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Start free. Upgrade when you're hooked.</h2>
          <p className="mt-4 text-lg text-muted-foreground">One-time payment. Lifetime license.</p>
        </motion.div>

        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          <motion.div {...fade} className="rounded-3xl border border-[#222] bg-[#111] p-8">
            <div className="text-sm font-medium text-muted-foreground">Free</div>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-5xl font-bold">₹0</span>
              <span className="text-muted-foreground">/forever</span>
            </div>
            <ul className="mt-8 space-y-3 text-sm text-foreground/85">
              <li>• Up to 10 AI summaries</li>
              <li>• All CLI commands</li>
              <li>• Local Ollama AI</li>
              <li>• File + terminal tracking</li>
            </ul>
            <a
              href="#install"
              className="mt-10 block rounded-full border border-[#333] py-3 text-center text-sm font-medium transition-colors hover:border-[#7c6cfc] hover:text-[#7c6cfc]"
            >
              Download Free
            </a>
          </motion.div>

          <motion.div
            {...fade}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="shimmer-pulse relative rounded-3xl border border-[#7c6cfc] bg-gradient-to-b from-[#1a1530] to-[#111] p-8"
          >
            <div className="absolute -top-3 left-8 rounded-full bg-[#7c6cfc] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
              Pro
            </div>
            <div className="text-sm font-medium text-[#a89dff]">Pro</div>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-5xl font-bold">₹499</span>
              <span className="text-muted-foreground">one-time</span>
            </div>
            <ul className="mt-8 space-y-3 text-sm text-foreground/90">
              <li>✓ Unlimited AI summaries</li>
              <li>✓ Everything in Free</li>
              <li>✓ Priority support</li>
              <li>✓ All future updates</li>
            </ul>
            <a
              href="#pay"
              className="mt-10 block rounded-full bg-[#7c6cfc] py-3 text-center text-sm font-medium text-white transition-all hover:bg-[#9d8ffd]"
            >
              Buy with UPI — ₹499
            </a>
          </motion.div>
        </div>

        <motion.div {...fade} id="pay" className="mx-auto mt-10 flex max-w-4xl flex-col items-center gap-5 rounded-2xl border border-[#222] bg-[#0d0d0d] p-6 sm:flex-row">
          <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-xl bg-white p-2">
            <svg viewBox="0 0 100 100" className="h-full w-full">
              {Array.from({ length: 100 }).map((_, i) => {
                const x = i % 10;
                const y = Math.floor(i / 10);
                const filled = (x * 7 + y * 13 + ((x + y) % 3)) % 3 !== 0;
                return filled ? <rect key={i} x={x * 10} y={y * 10} width="10" height="10" fill="#0a0a0a" /> : null;
              })}
              <rect x="0" y="0" width="30" height="30" fill="white" stroke="#0a0a0a" strokeWidth="4" />
              <rect x="10" y="10" width="10" height="10" fill="#0a0a0a" />
              <rect x="70" y="0" width="30" height="30" fill="white" stroke="#0a0a0a" strokeWidth="4" />
              <rect x="80" y="10" width="10" height="10" fill="#0a0a0a" />
              <rect x="0" y="70" width="30" height="30" fill="white" stroke="#0a0a0a" strokeWidth="4" />
              <rect x="10" y="80" width="10" height="10" fill="#0a0a0a" />
            </svg>
          </div>
          <div className="text-center text-sm text-muted-foreground sm:text-left">
            <div className="font-mono text-foreground">UPI: 8850783566@fam</div>
            <p className="mt-2">
              Send ₹499, then email your transaction ID to get your license key within 24 hours.
            </p>
            <p className="mt-1 text-xs text-[#444]">Scan to pay →</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Install() {
  return (
    <section id="install" className="border-t border-[#161616] py-28">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div {...fade} className="mb-12 text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">One command to rule them all.</h2>
          <p className="mt-4 text-lg text-muted-foreground">Install once. Works in every project.</p>
        </motion.div>
        <motion.div {...fade}>
          <TerminalWindow title="install.sh">
            <pre className="font-mono text-[13px] leading-7 text-[#d4d4d4]">
              <span className="text-[#666]"># Windows — run as PowerShell</span>{"\n"}
              <span className="text-[#19c37d]">powershell</span> -ExecutionPolicy Bypass -File install.ps1{"\n\n"}
              <span className="text-[#666]"># Then in any project:</span>{"\n"}
              <span className="text-[#19c37d]">devmind</span> init
            </pre>
          </TerminalWindow>
        </motion.div>
        <motion.div {...fade} className="mt-10 flex items-center justify-center gap-10 text-muted-foreground">
          <PlatformIcon label="Windows">
            <path d="M0 3.5L9.5 2v9H0V3.5zM10.5 1.85L24 0v11h-13.5V1.85zM0 12h9.5v9L0 19.5V12zm10.5 0H24v11l-13.5-1.85V12z" />
          </PlatformIcon>
          <PlatformIcon label="macOS">
            <path d="M16.7 12.7c0-2.6 2.1-3.9 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.3 2.5 1.3-.1 1.8-.9 3.4-.9s2 .9 3.4.8c1.4 0 2.3-1.2 3.1-2.5.7-1 1.3-2.2 1.7-3.4-.1 0-3.2-1.3-3.2-3.4zM14 4.6c.7-.9 1.2-2.1 1.1-3.4-1.1.1-2.4.7-3.1 1.6-.7.8-1.3 2-1.1 3.2 1.2.1 2.4-.6 3.1-1.4z" />
          </PlatformIcon>
          <PlatformIcon label="Linux">
            <path d="M12.5 2c-2 0-3.7 1.7-3.7 3.7 0 1.4.5 2.4.5 3.4 0 .9-1.5 2.6-2.6 4.6-1 1.9-1.6 3.7-1.6 5.3 0 .5.1 1 .3 1.4.4-.7 1-1 1.5-1 .3 0 .5.1.7.2-.1-.3-.1-.6-.1-1 0-1.6 1.3-3.5 2.4-5.1.9-1.3 1.6-2.4 1.6-3.4 0-.4-.2-.7-.4-1 .3.1.5.1.8.1 1.7 0 3-1.3 3-3 0-1.7-1.3-3-3-3-.4-.7-1-1.2-1.4-1.2zm-1.4 4.3c-.4 0-.7-.4-.7-.9s.3-.9.7-.9c.4 0 .7.4.7.9s-.3.9-.7.9zm2.8 0c-.4 0-.7-.4-.7-.9s.3-.9.7-.9c.4 0 .7.4.7.9s-.3.9-.7.9z" />
          </PlatformIcon>
        </motion.div>
        <p className="mt-6 text-center text-sm text-muted-foreground">Cross-platform</p>
      </div>
    </section>
  );
}

function PlatformIcon({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-[#888] transition-colors hover:text-[#7c6cfc]">
        {children}
      </svg>
      <span className="text-xs">{label}</span>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#222] py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 md:grid-cols-3 md:items-center">
          <div className="flex items-center gap-2.5">
            {HEX}
            <div>
              <div className="font-bold">DevMind</div>
              <div className="text-xs text-muted-foreground">Project consciousness for solo developers.</div>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground md:justify-center">
            <a href="#" className="hover:text-foreground">GitHub</a>
            <a href="#install" className="hover:text-foreground">Docs</a>
            <a href="#pricing" className="hover:text-foreground">Buy Pro</a>
          </div>
          <div className="text-sm text-muted-foreground md:text-right">
            Built by a solo developer. Powered by Ollama + Claude.
          </div>
        </div>
        <div className="mt-10 border-t border-[#1a1a1a] pt-6 text-center text-xs text-[#444]">
          © 2025 DevMind
        </div>
      </div>
    </footer>
  );
}

export function DevMindPage() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <Features />
        <Privacy />
        <Pricing />
        <Install />
      </main>
      <Footer />
    </div>
  );
}
