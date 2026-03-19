import {
  PageIntro,
  ServicesSection,
  SiteFooter,
  SiteHeader,
} from "../components/site-sections";
import { getSiteContent } from "../lib/wordpress";

export default async function ServicesPage() {
  const siteContent = await getSiteContent();

  return (
    <main className="page-shell">
      <SiteHeader />
      <PageIntro {...siteContent.pageIntros.services} />
      <ServicesSection content={siteContent.services} />
      <SiteFooter contactEmail={siteContent.contact.email} />
    </main>
  );
}
