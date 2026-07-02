"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/tjenester", label: "Tjenester" },
  { href: "/arkiv", label: "Arkiv" },
  { href: "/ressurser", label: "Ressurser" },
  { href: "/steder", label: "Steder" },
  { href: "/om-oss", label: "Om oss" },
];

function DotEnvelope() {
  return (
    <svg className="dot-envelope" viewBox="0 0 84 60" aria-hidden="true" focusable="false">
      <circle cx="6" cy="6" r="5" />
      <circle cx="18" cy="6" r="5" />
      <circle cx="30" cy="6" r="5" />
      <circle cx="42" cy="6" r="5" />
      <circle cx="54" cy="6" r="5" />
      <circle cx="66" cy="6" r="5" />
      <circle cx="78" cy="6" r="5" />
      <circle cx="18" cy="18" r="5" />
      <circle cx="30" cy="24" r="5" />
      <circle cx="42" cy="30" r="5" />
      <circle cx="54" cy="24" r="5" />
      <circle cx="66" cy="18" r="5" />
      <circle cx="6" cy="18" r="5" />
      <circle cx="6" cy="30" r="5" />
      <circle cx="6" cy="42" r="5" />
      <circle cx="78" cy="18" r="5" />
      <circle cx="78" cy="30" r="5" />
      <circle cx="78" cy="42" r="5" />
      <circle cx="6" cy="54" r="5" />
      <circle cx="18" cy="54" r="5" />
      <circle cx="30" cy="54" r="5" />
      <circle cx="42" cy="54" r="5" />
      <circle cx="54" cy="54" r="5" />
      <circle cx="66" cy="54" r="5" />
      <circle cx="78" cy="54" r="5" />
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
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="site-header" data-menu-open={menuOpen}>
      <div className="site-header__inner">
        <Link className="brand" href="/" aria-label="Tigon Studio">
          <span className="brand__mark" aria-hidden="true">
            T
          </span>
          <span className="brand__name">TIGON STUDIO</span>
        </Link>

        <nav className="nav-links" aria-label="Hovedmeny">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-header__actions">
          <Link className="nav-mail" href="/kontakt" aria-label="Kontakt oss">
            <DotEnvelope />
          </Link>

          <button
            className="menu-button"
            type="button"
            aria-label={menuOpen ? "Lukk meny" : "Åpne meny"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="mobile-menu" id="mobile-navigation" role="dialog" aria-modal="true" hidden={!menuOpen}>
        <div className="mobile-menu__top">
          <Link className="mobile-menu__brand" href="/" aria-label="Tigon Studio" onClick={closeMenu}>
            <span className="brand__mark" aria-hidden="true">
              T
            </span>
            <span className="brand__name">TIGON STUDIO</span>
          </Link>

          <div className="mobile-menu__actions">
            <Link className="mobile-menu__mail" href="/kontakt" aria-label="Kontakt oss" onClick={closeMenu}>
              <DotEnvelope />
            </Link>

            <button className="mobile-menu__close" type="button" aria-label="Lukk meny" onClick={closeMenu}>
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>
          </div>
        </div>

        <nav className="mobile-menu__links" aria-label="Mobilmeny">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </Link>
          ))}
          <Link href="/kontakt" onClick={closeMenu}>
            Kontakt
          </Link>
        </nav>

        <div className="mobile-menu__foot" aria-label="Studio status">
          <span>OSLO, NORWAY</span>
          <span>AVAILABLE_FOR_PROJECTS</span>
          <span>© 2026</span>
        </div>
      </div>
    </header>
  );
}
