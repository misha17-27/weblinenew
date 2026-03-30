"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import { WeblineLogo } from "./webline-logo";

type LocaleCode = "az" | "en" | "ru" | "de" | "tr";
type ThemeMode = "light" | "dark";

type LocaleOption = {
  code: LocaleCode;
  label: string;
  short: string;
};

const localeOptions: LocaleOption[] = [
  { code: "az", label: "Azərbaycan", short: "AZ" },
  { code: "en", label: "English", short: "EN" },
  { code: "ru", label: "Русский", short: "RU" },
  { code: "de", label: "Deutsch", short: "DE" },
  { code: "tr", label: "Türkçe", short: "TR" },
];

const navByLocale: Record<LocaleCode, Array<{ href: string; label: string }>> = {
  az: [
    { href: "/about", label: "Haqqımızda" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/process", label: "Partnyorlar" },
    { href: "/services", label: "Xidmətlər" },
    { href: "/contact", label: "Əlaqə" },
  ],
  en: [
    { href: "/about", label: "About" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/process", label: "Partners" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ],
  ru: [
    { href: "/about", label: "О нас" },
    { href: "/portfolio", label: "Портфолио" },
    { href: "/process", label: "Партнёры" },
    { href: "/services", label: "Услуги" },
    { href: "/contact", label: "Контакты" },
  ],
  de: [
    { href: "/about", label: "Über uns" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/process", label: "Partner" },
    { href: "/services", label: "Leistungen" },
    { href: "/contact", label: "Kontakt" },
  ],
  tr: [
    { href: "/about", label: "Hakkımızda" },
    { href: "/portfolio", label: "Portföy" },
    { href: "/process", label: "Partnerler" },
    { href: "/services", label: "Hizmetler" },
    { href: "/contact", label: "İletişim" },
  ],
};

const chromeByLocale: Record<
  LocaleCode,
  {
    contactLabel: string;
    meta: string;
    cta: string;
    openMenu: string;
    closeMenu: string;
    language: string;
    themeLight: string;
    themeDark: string;
  }
> = {
  az: {
    contactLabel: "Əlaqə",
    meta: "Veb saytlar, məhsul dizaynı və performans yönümlü rəqəmsal təcrübələr.",
    cta: "Layihəyə Başla",
    openMenu: "Menyunu aç",
    closeMenu: "Menyunu bağla",
    language: "Dil seçimi",
    themeLight: "Qaranlıq rejimi aktiv et",
    themeDark: "İşıqlı rejimi aktiv et",
  },
  en: {
    contactLabel: "Contact",
    meta: "Websites, product design, and performance-first digital experiences.",
    cta: "Start Project",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language selector",
    themeLight: "Switch to dark mode",
    themeDark: "Switch to light mode",
  },
  ru: {
    contactLabel: "Контакты",
    meta: "Сайты, продуктовый дизайн и цифровые решения с упором на результат.",
    cta: "Начать проект",
    openMenu: "Открыть меню",
    closeMenu: "Закрыть меню",
    language: "Выбор языка",
    themeLight: "Включить тёмную тему",
    themeDark: "Включить светлую тему",
  },
  de: {
    contactLabel: "Kontakt",
    meta: "Websites, Produktdesign und leistungsorientierte digitale Erlebnisse.",
    cta: "Projekt starten",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen",
    language: "Sprachauswahl",
    themeLight: "Dunkelmodus aktivieren",
    themeDark: "Hellmodus aktivieren",
  },
  tr: {
    contactLabel: "İletişim",
    meta: "Web siteleri, ürün tasarımı ve performans odaklı dijital deneyimler.",
    cta: "Projeye Başla",
    openMenu: "Menüyü aç",
    closeMenu: "Menüyü kapat",
    language: "Dil seçici",
    themeLight: "Karanlık moda geç",
    themeDark: "Aydınlık moda geç",
  },
};

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [localeOpen, setLocaleOpen] = useState(false);
  const [locale, setLocale] = useState<LocaleCode>("az");
  const [theme, setTheme] = useState<ThemeMode>("light");

  const navItems = useMemo(() => navByLocale[locale], [locale]);
  const chromeLabels = chromeByLocale[locale];
  const activeLocale =
    localeOptions.find((option) => option.code === locale) ?? localeOptions[0];

  useEffect(() => {
    const savedLocale = window.localStorage.getItem("webline-locale") as LocaleCode | null;
    const savedTheme = window.localStorage.getItem("webline-theme") as ThemeMode | null;

    if (savedLocale && savedLocale in navByLocale) {
      setLocale(savedLocale);
    }

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
    window.localStorage.setItem("webline-locale", locale);
  }, [locale]);

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

  return (
    <header className="topbar">
      <nav className="shell nav" aria-label="Primary">
        <Link className="brand" href="/">
          <WeblineLogo className="brand-logo" />
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
          <div className="nav-locale">
            <button
              type="button"
              className={localeOpen ? "nav-locale__trigger is-open" : "nav-locale__trigger"}
              aria-expanded={localeOpen}
              aria-label={chromeLabels.language}
              onClick={() => setLocaleOpen((open) => !open)}
            >
              <span className="nav-locale__globe" aria-hidden="true" />
              <span>{activeLocale.short}</span>
              <span className="nav-locale__caret" aria-hidden="true" />
            </button>

            <div className={localeOpen ? "nav-locale__menu is-open" : "nav-locale__menu"}>
              {localeOptions.map((option) => {
                const isActive = option.code === locale;

                return (
                  <button
                    key={option.code}
                    type="button"
                    className={isActive ? "nav-locale__option is-active" : "nav-locale__option"}
                    onClick={() => {
                      setLocale(option.code);
                      setLocaleOpen(false);
                    }}
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
            aria-label={theme === "light" ? chromeLabels.themeLight : chromeLabels.themeDark}
            onClick={() => setTheme((current) => (current === "light" ? "dark" : "light"))}
          >
            <span className={theme === "dark" ? "theme-toggle__icon is-sun" : "theme-toggle__icon is-moon"} />
          </button>

          <button
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? chromeLabels.closeMenu : chromeLabels.openMenu}
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
            <WeblineLogo className="brand-logo" />
            <button
              aria-label={chromeLabels.closeMenu}
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
                  -&gt;
                </span>
              </Link>
            ))}
          </div>

          <div className="nav-panel__tools">
            <button
              type="button"
              className="theme-toggle nav-panel__theme-toggle"
              aria-label={theme === "light" ? chromeLabels.themeLight : chromeLabels.themeDark}
              onClick={() => setTheme((current) => (current === "light" ? "dark" : "light"))}
            >
              <span className={theme === "dark" ? "theme-toggle__icon is-sun" : "theme-toggle__icon is-moon"} />
              <span>{theme === "light" ? chromeLabels.themeLight : chromeLabels.themeDark}</span>
            </button>

            <div className="nav-panel__languages">
              {localeOptions.map((option) => (
                <button
                  key={option.code}
                  type="button"
                  className={option.code === locale ? "nav-panel__language is-active" : "nav-panel__language"}
                  onClick={() => setLocale(option.code)}
                >
                  <span>{option.label}</span>
                  <strong>{option.short}</strong>
                </button>
              ))}
            </div>
          </div>

          <div className="nav-panel__footer">
            <div className="nav-panel__contact">
              <span>{chromeLabels.contactLabel}</span>
              <a href="mailto:info@webline.az">info@webline.az</a>
              <a href="tel:+994505551212">+994 50 555 12 12</a>
            </div>
            <div className="nav-panel__meta">{chromeLabels.meta}</div>
          </div>

          <Link className="button button-primary nav-panel__cta" href="/contact">
            {chromeLabels.cta}
          </Link>
        </div>
      </div>
    </header>
  );
}
