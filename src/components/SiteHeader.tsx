"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Hver rad får sin egen pixel-glyf (celler i et 3×3-rutenett). Varierer per
// element, lamalama-stil.
const navItems: { href: string; label: string; glyph: number[][] }[] = [
  { href: "/tjenester", label: "Tjenester", glyph: [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2]] }, // pluss
  { href: "/arkiv", label: "Arkiv", glyph: [[0, 0], [1, 1], [2, 2]] }, // diagonal ↘
  { href: "/ressurser", label: "Ressurser", glyph: [[0, 0], [2, 0], [0, 2], [2, 2]] }, // hjørner
  { href: "/steder", label: "Steder", glyph: [[2, 0], [1, 1], [0, 2]] }, // diagonal ↗
  { href: "/om-oss", label: "Om oss", glyph: [[0, 0], [2, 0], [1, 1], [0, 2], [2, 2]] }, // kryss
];

const TAGLINE = "BYGD FOR Å BLI VALGT";

// Samme dekoder-vokabular som Bygger-registeret (HomeMotion) — mono-glyfer.
const GLYPH = "ABCDEFGHIJKLMNOPQR#%&/()=+*0123456789";

// Hover-scramble: dekoder [data-scramble]-teksten i et element én gang.
// Respekterer reduced motion. Deler én rAF på tvers av triggere.
function useScramble() {
  const rafRef = useRef(0);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  return (event: { currentTarget: HTMLElement }) => {
    const el = event.currentTarget.querySelector<HTMLElement>("[data-scramble]");
    if (!el) {
      return;
    }
    const final = el.dataset.text ?? el.textContent ?? "";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = final;
      return;
    }

    cancelAnimationFrame(rafRef.current);
    const chars = final.split("");
    let startT = 0;
    const frame = (now: number) => {
      if (!startT) startT = now;
      const p = Math.min(1, (now - startT) / 420);
      const locked = Math.floor(p * chars.length);
      el.textContent = chars
        .map((c, i) => (c === " " || i < locked ? c : GLYPH[Math.floor(Math.random() * GLYPH.length)]))
        .join("");
      if (p < 1) {
        rafRef.current = requestAnimationFrame(frame);
      } else {
        el.textContent = final;
      }
    };
    rafRef.current = requestAnimationFrame(frame);
  };
}

// Datadrevet pixel-glyf (lamalama-stil): fyller celler [kol, rad] i et 3×3-
// rutenett (steg 5px). currentColor så den temes lyst.
function PixelGlyph({ cells, className }: { cells: number[][]; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false">
      {cells.map((cell, i) => (
        <rect key={i} x={1.5 + cell[0] * 5} y={1.5 + cell[1] * 5} width="3" height="3" />
      ))}
    </svg>
  );
}

function BrandMark({ className = "brand__mark" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="747.1 284.03 425.8 511.94"
      aria-hidden="true"
      focusable="false"
    >
      <polygon points="1172.9 284.03 999.42 284.03 999.39 284.06 999.39 375.03 873.54 284.06 873.54 284.03 747.1 284.03 747.1 409.91 999.08 409.91 936.48 455.19 873.54 500.66 873.54 750.47 936.48 795.97 999.39 750.47 999.39 409.91 1172.9 409.91 1172.9 284.03" />
    </svg>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scramble = useScramble();

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="site-header" data-menu-open={menuOpen}>
      <div className="site-header__bar">
        <Link className="brand" href="/" aria-label="Tigon Studio" onClick={closeMenu}>
          <BrandMark />
          <span className="brand__name">TIGON STUDIO</span>
        </Link>

        <span className="site-header__tag" aria-hidden="true">
          {TAGLINE}
        </span>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Lukk meny" : "Åpne meny"}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>

      <div className="site-header__aside">
        <Link
          className="aside-pill aside-pill--primary"
          href="/kontakt"
          onClick={closeMenu}
          onMouseEnter={scramble}
          onFocus={scramble}
        >
          <span className="aside-pill__mark">
            <BrandMark className="aside-pill__mark-svg" />
          </span>
          <span data-scramble data-text="Ta kontakt">Ta kontakt</span>
        </Link>
        <Link
          className="aside-pill aside-pill--ghost"
          href="/om-oss"
          onClick={closeMenu}
          onMouseEnter={scramble}
          onFocus={scramble}
        >
          <span data-scramble data-text="Dette er oss">Dette er oss</span>
          <span className="aside-pill__plus" aria-hidden="true">( + )</span>
        </Link>
        <Link
          className="aside-pill aside-pill--ghost"
          href="/arkiv"
          onClick={closeMenu}
          onMouseEnter={scramble}
          onFocus={scramble}
        >
          <span data-scramble data-text="Arkiv">Arkiv</span>
          <span className="aside-pill__plus" aria-hidden="true">( + )</span>
        </Link>
      </div>

      <div
        className="site-menu"
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Meny"
        hidden={!menuOpen}
      >
        <div className="site-menu__panel">
          <nav className="site-menu__list" aria-label="Hovedmeny">
            {navItems.map((item) => (
              <Link key={item.href} className="site-menu__row" href={item.href} onClick={closeMenu}>
                <span className="site-menu__label">{item.label}</span>
                <PixelGlyph cells={item.glyph} className="site-menu__glyph" />
              </Link>
            ))}
          </nav>

          <div className="site-menu__cta">
            <Link
              className="site-menu__pitch"
              href="/arkiv"
              onClick={closeMenu}
              onMouseEnter={scramble}
              onFocus={scramble}
            >
              <span data-scramble data-text="Se arbeidet">Se arbeidet</span>
            </Link>
            <div className="site-menu__cta-pair">
              <Link
                className="site-menu__btn"
                href="/kontakt"
                onClick={closeMenu}
                onMouseEnter={scramble}
                onFocus={scramble}
              >
                <span data-scramble data-text="Book en prat">Book en prat</span>
              </Link>
              <Link
                className="site-menu__btn"
                href="/kontakt"
                onClick={closeMenu}
                onMouseEnter={scramble}
                onFocus={scramble}
              >
                <span data-scramble data-text="Start et prosjekt">Start et prosjekt</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="site-menu__status" aria-label="Studio status">
          <span>OSLO, NORWAY</span>
          <span>TILGJENGELIG FOR PROSJEKTER</span>
          <span>© 2026</span>
        </div>
      </div>
    </header>
  );
}
