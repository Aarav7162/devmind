import { motion } from "framer-motion";
import {
  Brain,
  RefreshCw,
  ClipboardList,
  Lock,
  CloudOff,
  Zap,
  Gift,
  MessageSquare,
  Search,
  Target,
  Microscope,
  HelpCircle,
  BarChart3,
  FolderDown,
  Ban,
  Clock,
  KeyRound,
  Apple,
  MonitorSmartphone,
  TerminalSquare,
} from "lucide-react";
import { NeuralBackground } from "@/components/NeuralBackground";
import { TerminalWindow } from "@/components/TerminalWindow";
import { TerminalTyper } from "@/components/TerminalTyper";
import { SiteHeader, SiteFooter, GITHUB_URL, SUPPORT_EMAIL } from "@/components/SiteChrome";

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

const heroFrames = [
  `$ devmind init
✓ DevMind initialized and running!
  AI engine: Ollama ready
  Watching: /Users/dev/my-project`,
  `$ devmind resume
┌─ DevMind — Session 12 ──────────────────────┐
│ Where you left off:                         │
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
    { Icon: Brain, text: "You open your laptop and forget where you left off." },
    { Icon: RefreshCw, text: "Your AI assistant has no memory between sessions." },
    { Icon: ClipboardList, text: "Writing standup updates wastes 10 minutes every morning." },
  ];
  return (
    <section className="border-t border-[#161616] py-28">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 md:grid-cols-2 md:gap-12">
        <motion.h2 {...fade} className="text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          AI IDEs write your code.{" "}
          <span className="text-muted-foreground">None of them remember why you wrote it.</span>
        </motion.h2>
        <div className="space-y-4">
          {pains.map((p, i) => (
            <motion.div
              key={p.text}
              {...fade}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-hover flex items-start gap-4 rounded-2xl border border-[#222] bg-[#111] p-6"
            >
              <p.Icon className="mt-0.5 h-6 w-6 shrink-0 text-[#7c6cfc]" strokeWidth={1.5} />
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
  const features: Array<[React.ComponentType<{ className?: string; strokeWidth?: number }>, string, string]> = [
    [Brain, "devmind resume", "Know exactly where you left off, every morning."],
    [ClipboardList, "devmind standup", "Auto-generate your daily standup in one command."],
    [MessageSquare, "devmind commit", "AI commit messages that understand your intent, not just the diff."],
    [Search, "devmind diff", "Explain any git diff in plain English instantly."],
    [Target, "devmind focus", "Get a focus score and detect context-switching."],
    [Microscope, "devmind review", "AI code review of files you actually changed this session."],
    [HelpCircle, "devmind ask", "Query your own session history like a search engine."],
    [BarChart3, "devmind report", "Weekly productivity report saved as Markdown."],
    [FolderDown, "devmind export", "Export any session as a clean Markdown file."],
    [Ban, "devmind ignore", "Per-project ignore patterns, like .gitignore."],
    [Clock, "devmind timeline", "See everything you touched, in order, in a table."],
    [KeyRound, "devmind activate", "Unlock unlimited summaries with a license key."],
  ];
  return (
    <section className="border-t border-[#161616] py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fade} className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Everything your future self needs</h2>
          <p className="mt-4 text-lg text-muted-foreground">Twelve commands. One persistent mind.</p>
        </motion.div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(([Icon, name, desc], i) => (
            <motion.div
              key={name}
              {...fade}
              transition={{ duration: 0.45, delay: (i % 6) * 0.05 }}
              className="card-hover rounded-2xl border border-[#222] bg-[#1a1a1a] p-6"
            >
              <Icon className="h-5 w-5 text-[#7c6cfc]" strokeWidth={1.5} />
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
  const items: Array<[React.ComponentType<{ className?: string; strokeWidth?: number }>, string]> = [
    [Lock, "Local AI (Ollama)"],
    [CloudOff, "No data sent to cloud"],
    [Zap, "Works offline"],
    [Gift, "Free AI, forever"],
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
              {items.map(([Icon, t]) => (
                <div key={t} className="rounded-2xl border border-[#222] bg-[#0a0a0a] p-5">
                  <Icon className="h-6 w-6 text-[#7c6cfc]" strokeWidth={1.5} />
                  <div className="mt-3 text-sm font-medium">{t}</div>
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
              <li>— Up to 10 AI summaries</li>
              <li>— All CLI commands</li>
              <li>— Local Ollama AI</li>
              <li>— File + terminal tracking</li>
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

        <motion.div
          {...fade}
          id="pay"
          className="mx-auto mt-10 flex max-w-4xl flex-col items-center gap-5 rounded-2xl border border-[#222] bg-[#0d0d0d] p-6 sm:flex-row"
        >
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
              Send ₹499, then email your transaction ID to{" "}
              <a href={`mailto:${SUPPORT_EMAIL}`} className="text-[#a89dff] hover:underline">
                {SUPPORT_EMAIL}
              </a>{" "}
              to get your license key within 24 hours.
            </p>
            <p className="mt-1 text-xs text-[#444]">Scan to pay →</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Install() {
  const platforms: Array<[React.ComponentType<{ className?: string; strokeWidth?: number }>, string]> = [
    [MonitorSmartphone, "Windows"],
    [Apple, "macOS"],
    [TerminalSquare, "Linux"],
  ];
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
              <span className="text-[#19c37d]">powershell</span> -ExecutionPolicy Bypass -File install.ps1
              {"\n\n"}
              <span className="text-[#666]"># Then in any project:</span>{"\n"}
              <span className="text-[#19c37d]">devmind</span> init
            </pre>
          </TerminalWindow>
        </motion.div>
        <motion.div {...fade} className="mt-10 flex items-center justify-center gap-12 text-muted-foreground">
          {platforms.map(([Icon, label]) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <Icon className="h-8 w-8 text-[#888] transition-colors hover:text-[#7c6cfc]" strokeWidth={1.4} />
              <span className="text-xs">{label}</span>
            </div>
          ))}
        </motion.div>
        <p className="mt-6 text-center text-sm text-muted-foreground">Cross-platform</p>
        <p className="mt-2 text-center text-xs text-[#444]">
          Need help? Email{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-foreground">
            {SUPPORT_EMAIL}
          </a>{" "}
          or visit{" "}
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="hover:text-foreground">
            GitHub
          </a>
          .
        </p>
      </div>
    </section>
  );
}

export function DevMindPage() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <Features />
        <Privacy />
        <Pricing />
        <Install />
      </main>
      <SiteFooter />
    </div>
  );
}
