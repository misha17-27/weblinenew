import {
  AboutSection,
  CtaStrip,
  FaqSection,
  HeroSection,
  InsightsSection,
  ProcessSection,
  ServicesSection,
  SiteFooter,
  SiteHeader,
} from "./components/site-sections";
import { getInsights, getSiteContent } from "./lib/wordpress";

export default async function Home() {
  const [siteContent, insights] = await Promise.all([
    getSiteContent(),
    getInsights(),
  ]);

  return (
    <main className="page-shell">
      <SiteHeader />
      <HeroSection content={siteContent.homeHero} />
      <ServicesSection content={siteContent.services} />
      <AboutSection content={siteContent.about} />
      <ProcessSection content={siteContent.process} />
      <FaqSection content={siteContent.faq} />
      <InsightsSection posts={insights} />
      <CtaStrip />
      <SiteFooter contactEmail={siteContent.contact.email} />
    </main>
  );
}
