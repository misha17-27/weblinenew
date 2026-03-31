import { cookies, headers } from "next/headers";
import {
  defaultLocale,
  isLocale,
  type LocaleCode,
  localeCookieName,
  localeHeaderName,
} from "./locale";

export async function getCurrentLocale(): Promise<LocaleCode> {
  const requestHeaders = await headers();
  const headerLocale = requestHeaders.get(localeHeaderName);

  if (isLocale(headerLocale)) {
    return headerLocale;
  }

  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(localeCookieName)?.value;

  return isLocale(cookieLocale) ? cookieLocale : defaultLocale;
}
