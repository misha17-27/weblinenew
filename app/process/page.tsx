import {
  PageIntro,
  ProcessSection,
  SiteFooter,
  SiteHeader,
} from "../components/site-sections";

export default function ProcessPage() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <PageIntro
        eyebrow="Process"
        title="A production workflow designed to keep strategy, design, and delivery aligned."
        description="Every stage reduces ambiguity: discovery, iteration, refinement, and launch are treated as one continuous system."
      />
      <ProcessSection />
      <SiteFooter />
    </main>
  );
}
