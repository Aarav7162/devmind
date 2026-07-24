import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

export const SUPPORT_EMAIL = "polaris@emreach.com";
export const COMPANY = "EmReach Solutions Pvt. Ltd.";

export const POLARIS_MARK = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 2 L13.6 10.4 L22 12 L13.6 13.6 L12 22 L10.4 13.6 L2 12 L10.4 10.4 Z"
      fill="url(#pg)" stroke="#7c6cfc" strokeWidth="0.6" strokeLinejoin="round" />
    <defs>
      <linearGradient id="pg" x1="0" y1="0" x2="24" y2="24">
        <stop offset="0" stopColor="#a89dff" />
        <stop offset="1" stopColor="#7c6cfc" />
      </linearGradient>
    </defs>
  </svg>
);

const NAV: { to: string; label: string }[] = [
  { to: "/product", label: "Product" },
  { to: "/command-centre", label: "Command Centre" },
  { to: "/intelligence", label: "Intelligence" },
  { to: "/assets", label: "Assets" },
  { to: "/capabilities", label: "Capabilities" },
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
        scrolled ? "border-b border-[#1c1c1c] bg-[#0a0a0a]/80 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          {POLARIS_MARK}
          <div className="leading-tight">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              EmReach
            </div>
            <div className="-mt-0.5 text-[15px] font-semibold tracking-tight">Polaris</div>
          </div>
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
          <Link
            to="/command-centre"
            className="hidden rounded-full bg-[#7c6cfc] px-4 py-2 text-[13px] font-medium text-white transition-all hover:bg-[#9d8ffd] hover:shadow-[0_0_24px_-4px_#7c6cfc] sm:inline-flex"
          >
            Open Command Centre
          </Link>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            className="rounded-md border border-[#222] p-2 lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-[#1c1c1c] bg-[#0a0a0a]/95 backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:bg-[#141414] hover:text-foreground"
                activeProps={{ className: "rounded-md px-3 py-2.5 text-sm text-foreground bg-[#141414]" }}
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/command-centre"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-[#7c6cfc] px-4 py-2.5 text-center text-sm font-medium text-white"
            >
              Open Command Centre
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-[#1c1c1c] py-14">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              {POLARIS_MARK}
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  EmReach
                </div>
                <div className="-mt-0.5 font-semibold">Polaris</div>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              Real-time risk intelligence for every location that matters. Detect threats.
              Understand impact. Act earlier.
            </p>
            <div className="mt-5 font-mono text-[11px] uppercase tracking-widest text-[#666]">
              Human review required · Automatic alerting: disabled
            </div>
          </div>

          <div>
            <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Product
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <Link to="/product" className="text-muted-foreground hover:text-foreground">How it works</Link>
              <Link to="/command-centre" className="text-muted-foreground hover:text-foreground">Command Centre</Link>
              <Link to="/capabilities" className="text-muted-foreground hover:text-foreground">Capabilities</Link>
              <Link to="/docs" className="text-muted-foreground hover:text-foreground">Docs</Link>
            </div>
          </div>

          <div>
            <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Company
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <Link to="/about" className="text-muted-foreground hover:text-foreground">About EmReach</Link>
              <a href={`mailto:${SUPPORT_EMAIL}`} className="text-muted-foreground hover:text-foreground">
                {SUPPORT_EMAIL}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-[#151515] pt-6 text-xs text-[#555] sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} {COMPANY}</div>
          <div className="font-mono uppercase tracking-widest">
            v0.9 · shadow-mode · decision support only
          </div>
        </div>
      </div>
    </footer>
  );
}
