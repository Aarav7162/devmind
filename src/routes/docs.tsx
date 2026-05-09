import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Menu, X, ChevronRight, Info, AlertTriangle } from "lucide-react";
import { SiteHeader, SiteFooter, SUPPORT_EMAIL } from "@/components/SiteChrome";
import { TerminalWindow } from "@/components/TerminalWindow";

export const Route = createFileRoute("/docs")({
  component: DocsPage,
  head: () => ({
    meta: [
      { title: "Docs — DevMind" },
      {
        name: "description",
        content:
          "Install DevMind, learn the commands, and configure local AI providers like Ollama.",
      },
      { property: "og:title", content: "DevMind Docs" },
      {
        property: "og:description",
        content: "Everything you need to install and use DevMind.",
      },
    ],
  }),
});

/* ---------- primitives ---------- */

function H1({ children }: { children: ReactNode }) {
  return (
    <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl">{children}</h1>
  );
}
function H2({ children }: { children: ReactNode }) {
  return <h2 className="mb-4 mt-12 text-2xl font-semibold tracking-tight">{children}</h2>;
}
function P({ children }: { children: ReactNode }) {
  return <p className="my-4 text-[15px] leading-7 text-foreground/85">{children}</p>;
}
function Mono({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-md border border-[#222] bg-[#161616] px-1.5 py-0.5 font-mono text-[13px] text-[#a89dff]">
      {children}
    </code>
  );
}

function Code({ lang, children }: { lang?: string; children: string }) {
  return (
    <div className="my-5">
      <TerminalWindow title={lang ?? "shell"}>
        <pre className="font-mono text-[13px] leading-7 text-[#d4d4d4]">
          {children.split("\n").map((line, i) => (
            <div key={i}>
              {line.startsWith("#") || line.startsWith("//") ? (
                <span className="text-[#666]">{line}</span>
              ) : line.startsWith("$") || line.startsWith("✓") || line.startsWith("✨") ? (
                <span>
                  <span className="text-[#19c37d]">{line[0]}</span>
                  {line.slice(1)}
                </span>
              ) : (
                line || "\u00A0"
              )}
            </div>
          ))}
        </pre>
      </TerminalWindow>
    </div>
  );
}

function Callout({
  variant = "violet",
  children,
}: {
  variant?: "violet" | "amber" | "info";
  children: ReactNode;
}) {
  const map = {
    violet: { border: "border-l-[#7c6cfc]", Icon: Info, color: "text-[#a89dff]" },
    info: { border: "border-l-[#19c37d]", Icon: Info, color: "text-[#19c37d]" },
    amber: { border: "border-l-[#f5a524]", Icon: AlertTriangle, color: "text-[#f5a524]" },
  }[variant];
  return (
    <div
      className={`my-6 flex gap-3 rounded-r-xl border border-[#222] ${map.border} border-l-2 bg-[#111] p-5`}
    >
      <map.Icon className={`mt-0.5 h-5 w-5 shrink-0 ${map.color}`} strokeWidth={1.6} />
      <div className="text-[15px] leading-7 text-foreground/90">{children}</div>
    </div>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-[#222]">
      <table className="w-full text-sm">
        <thead className="bg-[#0f0f0f] text-left text-muted-foreground">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-[#1a1a1a]">
              {r.map((c, j) => (
                <td key={j} className="px-4 py-3 align-top text-foreground/90">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- nav data ---------- */

type Page = { id: string; title: string; render: () => ReactNode };
type Group = { label: string; pages: Page[] };

function CommandPage({
  name,
  desc,
  usage,
  options,
  examples,
  notes,
}: {
  name: string;
  desc: string;
  usage: string;
  options?: { flag: string; desc: string; def?: string }[];
  examples?: string[];
  notes?: ReactNode;
}) {
  return (
    <>
      <H1>devmind {name}</H1>
      <P>{desc}</P>
      <H2>Usage</H2>
      <Code lang="bash">{usage}</Code>
      {options && options.length > 0 && (
        <>
          <H2>Options</H2>
          <Table
            headers={["Flag", "Description", "Default"]}
            rows={options.map((o) => [<Mono key={o.flag}>{o.flag}</Mono>, o.desc, o.def ?? "—"])}
          />
        </>
      )}
      {examples && examples.length > 0 && (
        <>
          <H2>Examples</H2>
          {examples.map((ex, i) => (
            <Code key={i} lang="bash">{ex}</Code>
          ))}
        </>
      )}
      {notes && (
        <>
          <H2>Notes</H2>
          <Callout variant="info">{notes}</Callout>
        </>
      )}
    </>
  );
}

const commands: Page[] = [
  {
    id: "cmd-init",
    title: "devmind init",
    render: () => (
      <CommandPage
        name="init"
        desc="Initialize DevMind in the current project and start the background daemon."
        usage="devmind init"
        examples={["devmind init\n# creates .devmind/, installs Ollama, starts daemon"]}
        notes="Safe to re-run — it won't duplicate sessions if the daemon is already running."
      />
    ),
  },
  {
    id: "cmd-stop",
    title: "devmind stop",
    render: () => (
      <CommandPage
        name="stop"
        desc="Stop the background daemon for this project."
        usage="devmind stop"
        notes={<>Run <Mono>devmind init</Mono> again to restart.</>}
      />
    ),
  },
  {
    id: "cmd-resume",
    title: "devmind resume",
    render: () => (
      <CommandPage
        name="resume"
        desc="Show the last AI-generated summary of what you were working on."
        usage="devmind resume"
      />
    ),
  },
  {
    id: "cmd-run",
    title: "devmind run",
    render: () => (
      <CommandPage
        name="run <command>"
        desc="Run any shell command and log it to your active session."
        usage="devmind run <command>"
        examples={[`devmind run git commit -m "fix auth"`, "devmind run npm install"]}
      />
    ),
  },
  {
    id: "cmd-status",
    title: "devmind status",
    render: () => (
      <CommandPage
        name="status"
        desc="Show current daemon status, Ollama health, and license tier."
        usage="devmind status"
      />
    ),
  },
  {
    id: "cmd-commit",
    title: "devmind commit",
    render: () => (
      <CommandPage
        name="commit"
        desc="Generate an AI git commit message from session context + git diff."
        usage="devmind commit [--auto]"
        options={[{ flag: "--auto", desc: "Commit immediately without confirmation." }]}
      />
    ),
  },
  {
    id: "cmd-standup",
    title: "devmind standup",
    render: () => (
      <CommandPage
        name="standup"
        desc="Write a standup update (Yesterday / Today / Blockers) from your last session."
        usage="devmind standup"
      />
    ),
  },
  {
    id: "cmd-ask",
    title: "devmind ask",
    render: () => (
      <CommandPage
        name='ask "<question>"'
        desc="Ask anything about your session history."
        usage={`devmind ask "<question>"`}
        examples={[`devmind ask "why did I add the retry logic?"`]}
      />
    ),
  },
  {
    id: "cmd-timeline",
    title: "devmind timeline",
    render: () => (
      <CommandPage
        name="timeline"
        desc="Show a color-coded table of all events in the current session."
        usage="devmind timeline [--limit N]"
        options={[{ flag: "--limit N", desc: "Number of events to show.", def: "50" }]}
      />
    ),
  },
  {
    id: "cmd-diff",
    title: "devmind diff",
    render: () => (
      <CommandPage
        name="diff"
        desc="Explain the current git diff in plain English."
        usage="devmind diff [--cached]"
        options={[{ flag: "--cached", desc: "Explain staged changes only." }]}
      />
    ),
  },
  {
    id: "cmd-focus",
    title: "devmind focus",
    render: () => (
      <CommandPage
        name="focus"
        desc="Get a 0–100 focus score based on recent activity."
        usage="devmind focus [--minutes N]"
        options={[{ flag: "--minutes N", desc: "Lookback window in minutes.", def: "30" }]}
      />
    ),
  },
  {
    id: "cmd-export",
    title: "devmind export",
    render: () => (
      <CommandPage
        name="export"
        desc="Export current session to a Markdown file."
        usage="devmind export [-o path]"
        options={[
          { flag: "-o path", desc: "Output path.", def: ".devmind/exports/session-<id>.md" },
        ]}
      />
    ),
  },
  {
    id: "cmd-ignore",
    title: "devmind ignore",
    render: () => (
      <CommandPage
        name="ignore"
        desc="Manage per-project file watcher ignore patterns."
        usage="devmind ignore [pattern] [--list] [--remove pattern]"
        examples={["devmind ignore tests/", "devmind ignore --list", "devmind ignore --remove tests/"]}
      />
    ),
  },
  {
    id: "cmd-review",
    title: "devmind review",
    render: () => (
      <CommandPage
        name="review"
        desc="AI code review of the N most recently modified files."
        usage="devmind review [--limit N]"
        options={[{ flag: "--limit N", desc: "Number of files to review.", def: "10" }]}
      />
    ),
  },
  {
    id: "cmd-report",
    title: "devmind report",
    render: () => (
      <CommandPage
        name="report"
        desc="Generate a productivity report for the last N days."
        usage="devmind report [--days N] [-o path]"
        options={[
          { flag: "--days N", desc: "Lookback in days.", def: "7" },
          { flag: "-o path", desc: "Output Markdown path.", def: ".devmind/exports/report-*.md" },
        ]}
      />
    ),
  },
  {
    id: "cmd-activate",
    title: "devmind activate",
    render: () => (
      <CommandPage
        name="activate <KEY>"
        desc="Activate a Pro license key to unlock unlimited summaries."
        usage="devmind activate <KEY>"
        examples={["devmind activate DM-xxxxxxxxxxxx-xxxxxxxxxx"]}
      />
    ),
  },
];

const groups: Group[] = [
  {
    label: "Getting Started",
    pages: [
      {
        id: "what",
        title: "What is DevMind?",
        render: () => (
          <>
            <H1>What is DevMind?</H1>
            <P>
              DevMind is a CLI tool that silently watches your project — tracking file changes,
              terminal commands, and git activity — and uses a local AI (Ollama) to synthesize
              what you're working on into human-readable summaries. It gives you your context
              back every morning in one command.
            </P>
            <Callout>
              DevMind is not an AI editor. It doesn't write your code. It remembers{" "}
              <em>why</em> you wrote it.
            </Callout>
            <ul className="my-6 space-y-3 text-[15px] leading-7 text-foreground/85">
              <li className="flex gap-3"><ChevronRight className="mt-1 h-4 w-4 shrink-0 text-[#19c37d]" /> Works with any editor (VS Code, Neovim, Zed…)</li>
              <li className="flex gap-3"><ChevronRight className="mt-1 h-4 w-4 shrink-0 text-[#19c37d]" /> Runs entirely offline using Ollama</li>
              <li className="flex gap-3"><ChevronRight className="mt-1 h-4 w-4 shrink-0 text-[#19c37d]" /> No cloud, no subscriptions, no API keys needed</li>
            </ul>
          </>
        ),
      },
      {
        id: "install",
        title: "Installation",
        render: () => (
          <>
            <H1>Installation</H1>
            <H2>Step 1 — Windows</H2>
            <Code lang="powershell">{`# Right-click install.ps1 → Run with PowerShell
powershell -ExecutionPolicy Bypass -File install.ps1`}</Code>
            <H2>Step 2 — Verify</H2>
            <Code lang="bash">{`devmind --version
# DevMind 0.1.0`}</Code>
            <Callout variant="info">
              <Mono>install.ps1</Mono> copies <Mono>devmind.exe</Mono> to{" "}
              <Mono>~/.devmind/bin/</Mono> and adds it to your user PATH automatically. Restart
              your terminal after install.
            </Callout>
          </>
        ),
      },
      {
        id: "quickstart",
        title: "Quick Start",
        render: () => (
          <>
            <H1>Quick Start</H1>
            <H2>1. Navigate to your project</H2>
            <Code lang="bash">{"cd my-project"}</Code>
            <H2>2. Initialize DevMind</H2>
            <Code lang="bash">{"devmind init"}</Code>
            <P>
              DevMind will automatically install Ollama if it's not found, pull the{" "}
              <Mono>llama3.2</Mono> model (first time only, ~2GB), create a hidden{" "}
              <Mono>.devmind/</Mono> folder, and start the background daemon.
            </P>
            <H2>3. Work normally. DevMind watches silently.</H2>
            <H2>4. Resume next morning</H2>
            <Code lang="bash">{"devmind resume"}</Code>
          </>
        ),
      },
    ],
  },
  {
    label: "Core Concepts",
    pages: [
      {
        id: "how",
        title: "How It Works",
        render: () => (
          <>
            <H1>How It Works</H1>
            <div className="my-8 grid gap-4 sm:grid-cols-2">
              {[
                ["01", "devmind init", "Creates .devmind/, installs Ollama, starts daemon."],
                ["02", "Daemon runs silently", "Tracks file saves, terminal commands, git events."],
                ["03", "AI synthesizes every 5 min", "Ollama writes a 1-paragraph intent summary locally."],
                ["04", "You query anytime", "resume, standup, commit, ask, etc."],
              ].map(([n, t, d]) => (
                <div key={n} className="card-hover rounded-2xl border border-[#222] bg-[#111] p-5">
                  <div className="font-mono text-xs text-[#7c6cfc]">{n}</div>
                  <div className="mt-2 font-semibold">{t}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{d}</div>
                </div>
              ))}
            </div>
          </>
        ),
      },
      {
        id: "folder",
        title: "The .devmind/ Folder",
        render: () => (
          <>
            <H1>The .devmind/ Folder</H1>
            <P>
              Every initialized project gets a <Mono>.devmind/</Mono> hidden folder in its root.
              This is where DevMind stores all local data for that project.
            </P>
            <Code lang="tree">{`.devmind/
├── sessions.db      ← SQLite database of all events and sessions
├── daemon.pid       ← PID of the running background process
├── ignore           ← Custom ignore patterns (like .gitignore)
└── exports/
    ├── session-1.md ← Exported session files
    └── report-2025-05-09.md`}</Code>
            <Callout variant="amber">
              <Mono>.devmind/</Mono> is hidden and contains a{" "}
              <Mono>.gitignore: *</Mono> file inside so it is never committed to git. Never
              delete <Mono>sessions.db</Mono> manually unless you want to reset all session
              history.
            </Callout>
          </>
        ),
      },
      {
        id: "providers",
        title: "AI Providers",
        render: () => (
          <>
            <H1>AI Providers</H1>
            <P>
              DevMind auto-detects the best available AI provider at startup. No configuration
              required.
            </P>
            <Table
              headers={["Priority", "Provider", "Requirement", "Cost"]}
              rows={[
                ["1st", "Ollama (local)", "Ollama installed + running", "Free forever"],
                ["2nd", "Anthropic", <Mono key="a">ANTHROPIC_API_KEY</Mono>, "Pay-per-token"],
                ["3rd", "Google Gemini", <Mono key="g">GEMINI_API_KEY</Mono>, "Free tier available"],
              ]}
            />
            <Callout variant="info">
              We strongly recommend Ollama. It's free, private, runs offline, and your code
              never leaves your machine.
            </Callout>
          </>
        ),
      },
      {
        id: "licensing",
        title: "Freemium & Licensing",
        render: () => (
          <>
            <H1>Freemium & Licensing</H1>
            <P>
              DevMind is free for the first 10 AI summaries. After that, the AI synthesis
              pauses and you'll see a message asking you to activate Pro.
            </P>
            <Table
              headers={["Feature", "Free", "Pro"]}
              rows={[
                ["AI summaries", "10 total", "Unlimited"],
                ["All CLI commands", "✓", "✓"],
                ["File tracking", "✓", "✓"],
                ["Local Ollama", "✓", "✓"],
                ["Price", "₹0", "₹499 one-time"],
              ]}
            />
            <Callout>
              To buy Pro, pay ₹499 via UPI to <Mono>8850783566@fam</Mono>, then email your
              transaction ID to{" "}
              <a href={`mailto:${SUPPORT_EMAIL}`} className="text-[#a89dff] hover:underline">
                {SUPPORT_EMAIL}
              </a>
              . You'll receive your license key within 24 hours. Activate it with{" "}
              <Mono>devmind activate &lt;KEY&gt;</Mono>.
            </Callout>
          </>
        ),
      },
    ],
  },
  { label: "Commands", pages: commands },
  {
    label: "Guides",
    pages: [
      {
        id: "ollama",
        title: "Setting Up Ollama",
        render: () => (
          <>
            <H1>Setting Up Ollama</H1>
            <P>
              DevMind installs Ollama automatically on Windows when you run{" "}
              <Mono>devmind init</Mono>. If you're on macOS/Linux or prefer to install manually:
            </P>
            <ol className="my-6 list-decimal space-y-2 pl-6 text-[15px] leading-7 text-foreground/85">
              <li>Go to <Mono>ollama.com</Mono> and download the installer for your OS.</li>
              <li>Run the installer.</li>
              <li>Pull the model DevMind uses: <Mono>ollama pull llama3.2</Mono>.</li>
              <li>Verify it's running: <Mono>ollama list</Mono>.</li>
            </ol>
            <Callout variant="info">
              You can use a different model by setting{" "}
              <Mono>DEVMIND_OLLAMA_MODEL=llama3.2:1b</Mono> (smaller, faster) in your environment.
            </Callout>
          </>
        ),
      },
      {
        id: "git",
        title: "Using with Git",
        render: () => (
          <>
            <H1>Using with Git</H1>
            <P>
              DevMind tracks every git action in the background — branches, commits, merges —
              and folds them into your session context. Two commands shine when paired with git:
            </P>
            <H2>Smart commits</H2>
            <Code lang="bash">{`devmind commit
# AI proposes a commit message that understands your intent`}</Code>
            <H2>Diff explanations</H2>
            <Code lang="bash">{`devmind diff --cached
# Plain-English explanation of staged changes`}</Code>
          </>
        ),
      },
      {
        id: "buy",
        title: "Buying a Pro License",
        render: () => (
          <>
            <H1>Buying a Pro License</H1>
            <P><strong>Step 1:</strong> Send ₹499 via UPI to <Mono>8850783566@fam</Mono>.</P>
            <P>
              <strong>Step 2:</strong> Email your transaction ID to{" "}
              <a href={`mailto:${SUPPORT_EMAIL}`} className="text-[#a89dff] hover:underline">
                {SUPPORT_EMAIL}
              </a>{" "}
              to get your license key (within 24 hours).
            </P>
            <P><strong>Step 3:</strong></P>
            <Code lang="bash">{`devmind activate DM-xxxxxxxxxxxx-xxxxxxxxxx
✨ DevMind Pro activated! Lifetime license saved.`}</Code>

            <div className="my-8 flex flex-col items-center gap-5 rounded-2xl border border-[#222] bg-white p-6 text-[#0a0a0a] sm:flex-row">
              <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-xl bg-white">
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
              <div>
                <div className="text-xs uppercase tracking-widest text-[#666]">UPI ID</div>
                <div className="mt-1 font-mono text-2xl font-bold">8850783566@fam</div>
                <div className="mt-3 text-sm text-[#444]">
                  Works with GPay, PhonePe, Paytm, any UPI app.
                </div>
              </div>
            </div>
          </>
        ),
      },
    ],
  },
];

const allPages = groups.flatMap((g) => g.pages);

/* ---------- page ---------- */

function DocsPage() {
  const [activeId, setActiveId] = useState<string>(allPages[0].id);
  const [mobileOpen, setMobileOpen] = useState(false);

  // hash-based routing within docs
  useEffect(() => {
    const apply = () => {
      const h = window.location.hash.replace("#", "");
      if (h && allPages.some((p) => p.id === h)) setActiveId(h);
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  const active = useMemo(() => allPages.find((p) => p.id === activeId) ?? allPages[0], [activeId]);

  const select = (id: string) => {
    setActiveId(id);
    setMobileOpen(false);
    if (typeof window !== "undefined") {
      history.replaceState(null, "", `#${id}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="pt-16">
        <div className="mx-auto flex max-w-7xl">
          {/* sidebar */}
          <aside
            className={`fixed inset-y-0 left-0 top-16 z-40 w-[260px] overflow-y-auto border-r border-[#1e1e1e] bg-[#0f0f0f] px-4 py-8 transition-transform md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:translate-x-0 ${
              mobileOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <DocsNav groups={groups} activeId={activeId} onSelect={select} />
          </aside>

          {mobileOpen && (
            <div
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 top-16 z-30 bg-black/60 md:hidden"
              aria-hidden
            />
          )}

          {/* mobile toggle */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[#222] bg-[#1a1a1a] text-foreground shadow-2xl md:hidden"
            aria-label="Toggle docs navigation"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* content */}
          <main className="min-w-0 flex-1 px-6 py-12 sm:px-10">
            <div className="mx-auto max-w-[760px]">
              <div className="mb-8 font-mono text-xs uppercase tracking-widest text-[#19c37d]">
                // docs
              </div>
              {active.render()}
            </div>
          </main>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

function DocsNav({
  groups,
  activeId,
  onSelect,
}: {
  groups: Group[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <nav className="space-y-6">
      {groups.map((g) => {
        const containsActive = g.pages.some((p) => p.id === activeId);
        return (
          <DocsGroup
            key={g.label}
            group={g}
            defaultOpen={containsActive}
            activeId={activeId}
            onSelect={onSelect}
          />
        );
      })}
    </nav>
  );
}

function DocsGroup({
  group,
  defaultOpen,
  activeId,
  onSelect,
}: {
  group: Group;
  defaultOpen: boolean;
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const [open, setOpen] = useState(defaultOpen);
  useEffect(() => {
    if (defaultOpen) setOpen(true);
  }, [defaultOpen]);
  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-2 py-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
      >
        <span>{group.label}</span>
        <ChevronRight
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-90" : ""}`}
          strokeWidth={2}
        />
      </button>
      {open && (
        <ul className="mt-2 space-y-0.5">
          {group.pages.map((p) => {
            const isActive = p.id === activeId;
            return (
              <li key={p.id}>
                <button
                  onClick={() => onSelect(p.id)}
                  className={`block w-full rounded-md border-l-2 px-3 py-1.5 text-left text-sm transition-colors ${
                    isActive
                      ? "border-l-[#7c6cfc] bg-[#7c6cfc]/10 text-[#a89dff]"
                      : "border-l-transparent text-foreground/70 hover:bg-[#161616] hover:text-foreground"
                  }`}
                >
                  {p.title}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
