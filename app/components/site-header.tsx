"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import {
  defaultLocale,
  isLocale,
  localeCookieName,
  locales,
  localizeHref,
} from "../lib/locale";
import { WeblineLogo } from "./webline-logo";

type ThemeMode = "light" | "dark";

function GlobeIcon() {
  return (
    <svg
      aria-hidden="true"
      className="header-icon header-icon--globe"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      aria-hidden="true"
      className="header-icon header-icon--caret"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      aria-hidden="true"
      className="header-icon header-icon--theme"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 3a6.36 6.36 0 0 0 9 9A9 9 0 1 1 12 3Z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      aria-hidden="true"
      className="header-icon header-icon--theme"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();
  const [menuOpen, setMenuOpen] = useState(false);
  const [localeOpen, setLocaleOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>("light");

  const resolvedLocale = isLocale(locale) ? locale : defaultLocale;
  const localeOptions = locales.map((code) => ({
    code,
    label: t(`locales.${code}.label`),
    short: t(`locales.${code}.short`),
  }));
  const navItems = [
    { href: "/about", label: t("header.nav.about") },
    { href: "/portfolio", label: t("header.nav.portfolio") },
    { href: "/process", label: t("header.nav.partners") },
    { href: "/services", label: t("header.nav.services") },
    { href: "/contact", label: t("header.nav.contact") },
  ];
  const activeLocale =
    localeOptions.find((option) => option.code === resolvedLocale) ?? localeOptions[0];

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("webline-theme") as ThemeMode | null;

    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
      document.documentElement.dataset.theme = savedTheme;
    } else {
      document.documentElement.dataset.theme = "light";
    }
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setLocaleOpen(false);
  }, [pathname]);

  useEffect(() => {
    window.localStorage.setItem("webline-theme", theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setLocaleOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const setLocaleCookie = (nextLocale: string) => {
    document.cookie = `${localeCookieName}=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
    setLocaleOpen(false);
    setMenuOpen(false);

    if (typeof window !== "undefined") {
      const targetHref = `${localizeHref(window.location.pathname, nextLocale as typeof resolvedLocale)}${window.location.search}${window.location.hash}`;
      router.push(targetHref);
      return;
    }

    router.refresh();
  };

  return (
    <header className="topbar">
      <nav className="shell nav" aria-label="Primary">
        <Link className="brand" href={localizeHref("/", resolvedLocale)}>
          <WeblineLogo className="brand-logo" />
        </Link>

        <div className="nav-links">
          {navItems.map((item) => (
            <Link
              className={pathname === item.href ? "is-active" : undefined}
              key={item.href}
              href={localizeHref(item.href, resolvedLocale)}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="nav-actions">
          <div className="nav-locale">
            <button
              type="button"
              className={localeOpen ? "nav-locale__trigger is-open" : "nav-locale__trigger"}
              aria-expanded={localeOpen}
              aria-label={t("header.language")}
              onClick={() => setLocaleOpen((open) => !open)}
            >
              <GlobeIcon />
              <span>{activeLocale.short}</span>
              <ChevronDownIcon />
            </button>

            <div className={localeOpen ? "nav-locale__menu is-open" : "nav-locale__menu"}>
              {localeOptions.map((option) => {
                const isActive = option.code === resolvedLocale;

                return (
                  <button
                    key={option.code}
                    type="button"
                    className={isActive ? "nav-locale__option is-active" : "nav-locale__option"}
                    onClick={() => setLocaleCookie(option.code)}
                  >
                    <span>{option.label}</span>
                    <strong>{option.short}</strong>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            className="theme-toggle"
            aria-label={theme === "light" ? t("header.themeLight") : t("header.themeDark")}
            onClick={() => setTheme((current) => (current === "light" ? "dark" : "light"))}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t("header.closeMenu") : t("header.openMenu")}
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

      <div className={menuOpen ? "nav-panel is-open" : "nav-panel"} id="mobile-menu">
        <div className="shell nav-panel__inner">
          <div className="nav-panel__top">
            <WeblineLogo className="brand-logo" />
            <button
              aria-label={t("header.closeMenu")}
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
                href={localizeHref(item.href, resolvedLocale)}
                key={item.href}
                style={{ ["--item-index" as string]: index } as CSSProperties}
              >
                <span>{item.label}</span>
                <span className="nav-panel__arrow" aria-hidden="true">
                  -&gt;
                </span>
              </Link>
            ))}
          </div>

          <div className="nav-panel__tools">
            <button
              type="button"
              className="theme-toggle nav-panel__theme-toggle"
              aria-label={theme === "light" ? t("header.themeLight") : t("header.themeDark")}
              onClick={() => setTheme((current) => (current === "light" ? "dark" : "light"))}
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
              <span>{theme === "light" ? t("header.themeLight") : t("header.themeDark")}</span>
            </button>

            <div className="nav-panel__languages">
              {localeOptions.map((option) => (
                <button
                  key={option.code}
                  type="button"
                  className={
                    option.code === resolvedLocale
                      ? "nav-panel__language is-active"
                      : "nav-panel__language"
                  }
                  onClick={() => setLocaleCookie(option.code)}
                >
                  <span>{option.label}</span>
                  <strong>{option.short}</strong>
                </button>
              ))}
            </div>
          </div>

          <div className="nav-panel__footer">
            <div className="nav-panel__contact">
              <span>{t("header.contactLabel")}</span>
              <a href="mailto:info@webline.az">info@webline.az</a>
              <a href="tel:+994505551212">+994 50 555 12 12</a>
            </div>
            <div className="nav-panel__meta">{t("header.meta")}</div>
          </div>

          <Link
            className="button button-primary nav-panel__cta"
            href={localizeHref("/contact", resolvedLocale)}
          >
            {t("header.cta")}
          </Link>
        </div>
      </div>
    </header>
  );
}
