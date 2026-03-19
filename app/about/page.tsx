import {
  AboutSection,
  PageIntro,
  SiteFooter,
  SiteHeader,
} from "../components/site-sections";
import { getSiteContent } from "../lib/wordpress";

export default async function AboutPage() {
  const siteContent = await getSiteContent();

  return (
    <main className="page-shell">
      <SiteHeader />
      <PageIntro {...siteContent.pageIntros.about} />
      <AboutSection content={siteContent.about} />
      <SiteFooter contactEmail={siteContent.contact.email} />
    </main>
  );
}
