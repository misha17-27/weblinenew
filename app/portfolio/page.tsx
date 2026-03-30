import {
  CtaStrip,
  InsightsSection,
  PageIntro,
  SiteFooter,
  SiteHeader,
} from "../components/site-sections";
import { getInsights, getSiteContent } from "../lib/wordpress";

export default async function PortfolioPage() {
  const [siteContent, insights] = await Promise.all([
    getSiteContent(),
    getInsights(),
  ]);

  return (
    <main className="page-shell">
      <SiteHeader />
      <PageIntro {...siteContent.pageIntros.portfolio} />
      <InsightsSection posts={insights} heading={siteContent.pageIntros.portfolio.title} />
      <CtaStrip
        eyebrow={siteContent.pageIntros.contact.eyebrow}
        title={siteContent.contact.panelTitle}
        description={siteContent.contact.panelDescription}
      />
      <SiteFooter
        contactEmail={siteContent.contact.email}
        contactPhone={siteContent.contact.phone}
        contactOffice={siteContent.contact.office}
        description={siteContent.pageIntros.about.description}
      />
    </main>
  );
}
