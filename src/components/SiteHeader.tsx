"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navItems: { href: string; label: string }[] = [
  { href: "/tjenester", label: "Tjenester" },
  { href: "/arkiv", label: "Arkiv" },
  { href: "/ressurser", label: "Ressurser" },
  { href: "/steder", label: "Steder" },
  { href: "/om-oss", label: "Om oss" },
];

const TAGLINE = "BYGD FOR Å BLI VALGT";

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
        >
          <span className="aside-pill__mark">
            <BrandMark className="aside-pill__mark-svg" />
          </span>
          <span>Ta kontakt</span>
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
            {navItems.map((item, index) => (
              <Link key={item.href} className="site-menu__row" href={item.href} onClick={closeMenu}>
                <span className="site-menu__label">{item.label}</span>
                <span className="site-menu__index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </Link>
            ))}
          </nav>

          <div className="site-menu__cta">
            <Link className="site-menu__pitch" href="/arkiv" onClick={closeMenu}>
              Se arbeidet
            </Link>
            <Link className="site-menu__btn" href="/kontakt" onClick={closeMenu}>
              Start et prosjekt
            </Link>
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
