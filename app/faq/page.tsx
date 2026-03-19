import {
  FaqSection,
  PageIntro,
  SiteFooter,
  SiteHeader,
} from "../components/site-sections";
import { getSiteContent } from "../lib/wordpress";

export default async function FaqPage() {
  const siteContent = await getSiteContent();

  return (
    <main className="page-shell">
      <SiteHeader />
      <PageIntro {...siteContent.pageIntros.faq} />
      <FaqSection content={siteContent.faq} />
      <SiteFooter contactEmail={siteContent.contact.email} />
    </main>
  );
}
