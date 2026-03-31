import { getRequestConfig } from "next-intl/server";
import { getMessages } from "../app/lib/messages";
import { getCurrentLocale } from "../app/lib/request-locale";

export default getRequestConfig(async () => {
  const locale = await getCurrentLocale();

  return {
    locale,
    messages: getMessages(locale),
  };
});
