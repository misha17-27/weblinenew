import {
  CtaStrip,
  InsightsSection,
  PageIntro,
  SiteFooter,
  SiteHeader,
} from "../components/site-sections";

export default function PortfolioPage() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <PageIntro
        eyebrow="Portfolio"
        title="Selected insights and case-study style content for a premium agency presentation."
        description="This page can later be replaced with CMS-backed projects, but it is already split into its own route and ready for expansion."
      />
      <InsightsSection />
      <CtaStrip />
      <SiteFooter />
    </main>
  );
}
