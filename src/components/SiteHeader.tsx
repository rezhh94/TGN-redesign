"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/tjenester", label: "Tjenester" },
  { href: "/arkiv", label: "Arkiv" },
  { href: "/ressurser", label: "Ressurser" },
  { href: "/steder", label: "Steder" },
  { href: "/om-oss", label: "Om oss" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header" data-menu-open={menuOpen}>
      <div className="site-header__inner">
        <Link className="brand" href="/" aria-label="Tigon Studio">
          <span className="brand__mark" aria-hidden="true">
            T
          </span>
          <span className="brand__name">Tigon Studio</span>
        </Link>

        <nav className="nav-links" aria-label="Hovedmeny">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-header__actions">
          <Link className="nav-contact" href="/kontakt">
            Kontakt
          </Link>
          <button
            className="menu-button"
            type="button"
            aria-label={menuOpen ? "Lukk meny" : "Apne meny"}
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

      <div className="mobile-menu" id="mobile-navigation" hidden={!menuOpen}>
        <nav aria-label="Mobilmeny">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </Link>
          ))}
          <Link href="/kontakt" onClick={closeMenu}>
            Kontakt
          </Link>
        </nav>
      </div>
    </header>
  );
}
