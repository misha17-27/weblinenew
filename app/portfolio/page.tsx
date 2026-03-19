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
      <InsightsSection posts={insights} />
      <CtaStrip />
      <SiteFooter contactEmail={siteContent.contact.email} />
    </main>
  );
}
