import {
  PageIntro,
  ServicesSection,
  SiteFooter,
  SiteHeader,
} from "../components/site-sections";

export default function ServicesPage() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <PageIntro
        eyebrow="Services"
        title="Specialized services for brands that want a sharper digital presence."
        description="Design, engineering, and UX are handled as one system so the final product stays visually bold and operationally reliable."
      />
      <ServicesSection />
      <SiteFooter />
    </main>
  );
}
