"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const navItems: { href: string; label: string }[] = [
  { href: "/tjenester", label: "Tjenester" },
  { href: "/arkiv", label: "Arkiv" },
  { href: "/ressurser", label: "Ressurser" },
  { href: "/steder", label: "Steder" },
  { href: "/om-oss", label: "Om oss" },
];

const TAGLINE = "BYGD FOR Å BLI VALGT";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const focusTimer = window.setTimeout(() => firstLinkRef.current?.focus(), 520);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = Array.from(
        headerRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        ) ?? [],
      ).filter((element) => element.offsetParent !== null);
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  return (
    <header
      ref={headerRef}
      className="site-header"
      data-twostep-nav=""
      data-nav-status={menuOpen ? "active" : "not-active"}
      data-menu-open={menuOpen}
    >
      <button
        className="site-header__scrim"
        type="button"
        aria-label="Lukk meny"
        tabIndex={menuOpen ? 0 : -1}
        data-nav-toggle="close"
        onClick={closeMenu}
      />

      <div className="site-header__wrap">
        <div className="site-header__width">
          <div className="site-header__bar">
            <div className="site-header__background" aria-hidden="true" />

            <div className="site-header__top">
              <Link className="brand" href="/" aria-label="Tigon Studio" onClick={closeMenu}>
                <span className="brand__lockup" aria-hidden="true" />
              </Link>

              <span className="site-header__tag" aria-hidden="true">
                {TAGLINE}
              </span>

              <div className="site-header__controls">
                <Link className="site-header__contact" href="/kontakt" onClick={closeMenu}>
                  Kontakt
                  <span className="tgn-action__arrow" aria-hidden="true" />
                </Link>
                <button
                  ref={toggleRef}
                  className="menu-toggle"
                  type="button"
                  aria-label={menuOpen ? "Lukk meny" : "Åpne meny"}
                  aria-expanded={menuOpen}
                  aria-controls="site-menu"
                  data-nav-toggle="toggle"
                  onClick={() => setMenuOpen((open) => !open)}
                >
                  <span className="menu-toggle__label" aria-hidden="true">
                    {menuOpen ? "Lukk" : "Meny"}
                  </span>
                  <span className="menu-toggle__icon" aria-hidden="true">
                    <i />
                    <i />
                  </span>
                </button>
              </div>
            </div>

            <div
              className="site-header__bottom"
              id="site-menu"
              aria-hidden={!menuOpen}
            >
              <div className="site-header__bottom-overflow">
                <div className="site-header__bottom-inner">
                  <nav className="site-menu__list" aria-label="Hovedmeny">
                    {navItems.map((item, index) => (
                      <Link
                        key={item.href}
                        ref={index === 0 ? firstLinkRef : undefined}
                        className="site-menu__row"
                        href={item.href}
                        tabIndex={menuOpen ? 0 : -1}
                        onClick={closeMenu}
                      >
                        <span className="site-menu__index" aria-hidden="true">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="site-menu__label">{item.label}</span>
                        <span className="site-menu__row-arrow" aria-hidden="true" />
                      </Link>
                    ))}
                  </nav>

                  <aside className="site-menu__side">
                    <figure className="site-menu__visual">
                      <Image
                        src="/services/tgn-nettsider-editorial.webp"
                        alt="Konseptflate for en Tigon-bygget nettside"
                        fill
                        sizes="(max-width: 760px) calc(100vw - 52px), 360px"
                      />
                      <figcaption className="site-menu__visual-caption">
                        <span>Konsept / Nettside</span>
                        <strong>Bygd for å bli valgt.</strong>
                      </figcaption>
                    </figure>

                    <div className="site-menu__meta" aria-label="Studio status">
                      <span>Oslo / Norway</span>
                      <span>Tilgjengelig for prosjekter</span>
                    </div>

                    <div className="site-menu__actions">
                      <Link
                        className="tgn-action tgn-action--secondary"
                        href="/arkiv"
                        tabIndex={menuOpen ? 0 : -1}
                        onClick={closeMenu}
                      >
                        Se arkivet
                        <span className="tgn-action__arrow" aria-hidden="true" />
                      </Link>
                      <Link
                        className="tgn-action tgn-action--primary"
                        href="/kontakt"
                        tabIndex={menuOpen ? 0 : -1}
                        onClick={closeMenu}
                      >
                        Start et prosjekt
                        <span className="tgn-action__arrow" aria-hidden="true" />
                      </Link>
                    </div>
                  </aside>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <noscript>
        <nav className="site-header__noscript" aria-label="Hovedmeny uten JavaScript">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
          <a href="/kontakt">Kontakt</a>
        </nav>
      </noscript>
    </header>
  );
}
