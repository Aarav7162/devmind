import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Github } from "lucide-react";

export const SUPPORT_EMAIL = "devmind.support@gmail.com";
export const GITHUB_URL = "https://github.com/Aarav7162";
export const BUILDER = "Aarav Kapasi";

export const BOUNTY_MARK = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="4" width="18" height="3.2" rx="1" fill="url(#bg1)" />
    <rect x="3" y="10.4" width="13" height="3.2" rx="1" fill="url(#bg1)" opacity="0.75" />
    <rect x="3" y="16.8" width="8" height="3.2" rx="1" fill="url(#bg1)" opacity="0.5" />
    <defs>
      <linearGradient id="bg1" x1="0" y1="0" x2="24" y2="24">
        <stop offset="0" stopColor="#f4c06f" />
        <stop offset="1" stopColor="#e8a33d" />
      </linearGradient>
    </defs>
  </svg>
);

const NAV: { to: string; label: string }[] = [
  { to: "/protocol", label: "Protocol" },
  { to: "/network", label: "Network" },
  { to: "/docs", label: "Docs" },
  { to: "/about", label: "About" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled ? "border-b border-[#1c1812] bg-[#0d0c0a]/80 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          {BOUNTY_MARK}
          <span className="text-[16px] font-semibold tracking-tight">Bounty</span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-[13px] text-foreground" }}
            >
              {n.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hidden rounded-full border border-[#262119] p-2 text-muted-foreground transition-colors hover:border-[#e8a33d]/60 hover:text-foreground sm:inline-flex"
          >
            <Github className="h-4 w-4" />
          </a>
          <Link
            to="/network"
            className="hidden rounded-full bg-[#e8a33d] px-4 py-2 text-[13px] font-medium text-[#171004] transition-all hover:bg-[#f4c06f] hover:shadow-[0_0_24px_-4px_#e8a33d] sm:inline-flex"
          >
            Open the orderbook
          </Link>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            className="rounded-md border border-[#262119] p-2 lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-[#1c1812] bg-[#0d0c0a]/95 backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:bg-[#15120e] hover:text-foreground"
                activeProps={{ className: "rounded-md px-3 py-2.5 text-sm text-foreground bg-[#15120e]" }}
              >
                {n.label}
              </Link>
            ))}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:bg-[#15120e] hover:text-foreground"
            >
              GitHub
            </a>
            <Link
              to="/network"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-[#e8a33d] px-4 py-2.5 text-center text-sm font-medium text-[#171004]"
            >
              Open the orderbook
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-[#1c1812] py-14">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              {BOUNTY_MARK}
              <span className="text-[16px] font-semibold tracking-tight">Bounty</span>
            </div>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              An autonomous liquidity and micro-delegation network. Agents detect execution
              roadblocks, subcontract work through an orderbook, and settle instantly —
              with cryptographic proof and PayPal micro-payouts.
            </p>
            <div className="mt-5 font-mono text-[11px] uppercase tracking-widest text-[#6e675c]">
              Proof before payout · every settlement receipted
            </div>
          </div>

          <div>
            <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Protocol
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <Link to="/protocol" className="text-muted-foreground hover:text-foreground">How it works</Link>
              <Link to="/network" className="text-muted-foreground hover:text-foreground">Live network</Link>
              <Link to="/docs" className="text-muted-foreground hover:text-foreground">Docs</Link>
            </div>
          </div>

          <div>
            <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Connect
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">
                GitHub
              </a>
              <a href={`mailto:${SUPPORT_EMAIL}`} className="text-muted-foreground hover:text-foreground">
                {SUPPORT_EMAIL}
              </a>
              <Link to="/about" className="text-muted-foreground hover:text-foreground">About</Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-[#17140f] pt-6 text-xs text-[#5b544a] sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} {BUILDER}</div>
          <div className="font-mono uppercase tracking-widest">
            network views show demonstration data
          </div>
        </div>
      </div>
    </footer>
  );
}
