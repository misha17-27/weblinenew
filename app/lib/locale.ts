export const localeCookieName = "NEXT_LOCALE";
export const defaultLocale = "az";
export const locales = ["az", "en", "ru", "de", "tr"] as const;
export const localeHeaderName = "x-webline-locale";

export type LocaleCode = (typeof locales)[number];

export function isLocale(value: string | null | undefined): value is LocaleCode {
  return Boolean(value && locales.includes(value as LocaleCode));
}

export function stripLocalePrefix(pathname: string) {
  const cleanPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const segments = cleanPath.split("/");
  const possibleLocale = segments[1];

  if (isLocale(possibleLocale)) {
    const rest = `/${segments.slice(2).join("/")}`.replace(/\/+/g, "/");
    return rest === "/" ? "/" : rest.replace(/\/$/, "") || "/";
  }

  return cleanPath === "/" ? "/" : cleanPath.replace(/\/$/, "");
}

export function localizeHref(href: string, locale: LocaleCode) {
  if (!href.startsWith("/")) {
    return href;
  }

  const barePath = stripLocalePrefix(href) || "/";

  if (locale === defaultLocale) {
    return barePath === "" ? "/" : barePath;
  }

  return barePath === "/" ? `/${locale}` : `/${locale}${barePath}`;
}
