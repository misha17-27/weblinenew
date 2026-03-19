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

export default function Home() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <ProcessSection />
      <FaqSection />
      <InsightsSection />
      <CtaStrip />
      <SiteFooter />
    </main>
  );
}
