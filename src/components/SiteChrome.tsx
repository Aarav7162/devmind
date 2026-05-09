import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

export const HEX_ICON = (
  <svg width="20" height="22" viewBox="0 0 20 22" fill="none" aria-hidden="true">
    <path d="M10 1l8.66 5v10L10 21l-8.66-5V6L10 1z" stroke="#7c6cfc" strokeWidth="1.5" />
    <path d="M10 6l4.33 2.5v5L10 16l-4.33-2.5v-5L10 6z" fill="#7c6cfc" fillOpacity="0.25" stroke="#7c6cfc" strokeWidth="1" />
  </svg>
);

export const GITHUB_URL = "https://github.com/Aarav7162/devmind";
export const SUPPORT_EMAIL = "devmind.support@gmail.com";

export function SiteHeader() {
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
        <Link to="/" className="flex items-center gap-2.5">
          {HEX_ICON}
          <span className="text-lg font-bold tracking-tight">DevMind</span>
        </Link>
        <div className="flex items-center gap-2 text-sm sm:gap-6">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden text-muted-foreground transition-colors hover:text-foreground sm:inline"
          >
            GitHub
          </a>
          <Link to="/docs" className="hidden text-muted-foreground transition-colors hover:text-foreground sm:inline">
            Docs
          </Link>
          <Link to="/about" className="hidden text-muted-foreground transition-colors hover:text-foreground sm:inline">
            About
          </Link>
          <Link
            to="/"
            hash="pricing"
            className="rounded-full bg-[#7c6cfc] px-4 py-2 text-sm font-medium text-white transition-all hover:bg-[#9d8ffd] hover:shadow-[0_0_24px_-4px_#7c6cfc]"
          >
            Buy Pro — ₹499
          </Link>
        </div>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-[#222] py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 md:grid-cols-3 md:items-center">
          <div className="flex items-center gap-2.5">
            {HEX_ICON}
            <div>
              <div className="font-bold">DevMind</div>
              <div className="text-xs text-muted-foreground">
                Project consciousness for solo developers.
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground md:justify-center">
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="hover:text-foreground">
              GitHub
            </a>
            <Link to="/docs" className="hover:text-foreground">Docs</Link>
            <Link to="/about" className="hover:text-foreground">About</Link>
            <Link to="/" hash="pricing" className="hover:text-foreground">Buy Pro</Link>
            <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-foreground">{SUPPORT_EMAIL}</a>
          </div>
          <div className="text-sm text-muted-foreground md:text-right">
            Built by Aarav Kapasi. Powered by Ollama + Claude.
          </div>
        </div>
        <div className="mt-10 border-t border-[#1a1a1a] pt-6 text-center text-xs text-[#444]">
          © 2025 DevMind
        </div>
      </div>
    </footer>
  );
}
