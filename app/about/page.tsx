import {
  AboutSection,
  PageIntro,
  SiteFooter,
  SiteHeader,
} from "../components/site-sections";

export default function AboutPage() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <PageIntro
        eyebrow="About"
        title="RUNOK is built for companies that care about design precision and technical execution."
        description="We combine brand thinking, product design, and modern frontend engineering into a single editorial-grade delivery process."
      />
      <AboutSection />
      <SiteFooter />
    </main>
  );
}
