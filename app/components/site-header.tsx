"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { navItems } from "../lib/site-data";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="topbar">
      <nav className="shell nav" aria-label="Primary">
        <Link className="brand" href="/">
          RUNOK
        </Link>

        <div className="nav-links">
          {navItems.map((item) => (
            <Link
              className={pathname === item.href ? "is-active" : undefined}
              key={item.href}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="nav-actions">
          <Link className="button button-primary button-small nav-cta" href="/contact">
            Get in Touch
          </Link>
          <button
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className={menuOpen ? "nav-toggle is-open" : "nav-toggle"}
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <button
        aria-hidden={!menuOpen}
        className={menuOpen ? "nav-overlay is-open" : "nav-overlay"}
        onClick={() => setMenuOpen(false)}
        tabIndex={menuOpen ? 0 : -1}
        type="button"
      />

      <div
        className={menuOpen ? "nav-panel is-open" : "nav-panel"}
        id="mobile-menu"
      >
        <div className="shell nav-panel__inner">
          <div className="nav-panel__top">
            <p className="nav-panel__eyebrow">Navigation</p>
            <button
              aria-label="Close menu"
              className="nav-close"
              onClick={() => setMenuOpen(false)}
              type="button"
            >
              <span />
              <span />
            </button>
          </div>

          <div className="nav-panel__links">
            {navItems.map((item, index) => (
              <Link
                className={pathname === item.href ? "is-active" : undefined}
                href={item.href}
                key={item.href}
                style={{ ["--item-index" as string]: index } as CSSProperties}
              >
                <span>{item.label}</span>
                <span className="nav-panel__arrow" aria-hidden="true">
                  ↗
                </span>
              </Link>
            ))}
          </div>

          <div className="nav-panel__footer">
            <div className="nav-panel__contact">
              <span>Contact</span>
              <a href="mailto:hello@runok.agency">hello@runok.agency</a>
              <a href="tel:+994505551212">+994 50 555 12 12</a>
            </div>
            <div className="nav-panel__meta">
              Editorial-grade design systems, product execution, and modern
              frontend delivery.
            </div>
          </div>

          <Link className="button button-primary nav-panel__cta" href="/contact">
            Get in Touch
          </Link>
        </div>
      </div>
    </header>
  );
}
