import {
  PageIntro,
  ProcessSection,
  SiteFooter,
  SiteHeader,
} from "../components/site-sections";
import { getSiteContent } from "../lib/wordpress";

export default async function ProcessPage() {
  const siteContent = await getSiteContent();

  return (
    <main className="page-shell">
      <SiteHeader />
      <PageIntro {...siteContent.pageIntros.process} />
      <ProcessSection content={siteContent.process} />
      <SiteFooter contactEmail={siteContent.contact.email} />
    </main>
  );
}
