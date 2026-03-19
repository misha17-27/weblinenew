import {
  FaqSection,
  PageIntro,
  SiteFooter,
  SiteHeader,
} from "../components/site-sections";

export default function FaqPage() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <PageIntro
        eyebrow="FAQ"
        title="Common questions, project expectations, and delivery details."
        description="The FAQ now lives on its own route, which makes it easier to expand into a full support or pre-sales knowledge base."
      />
      <FaqSection />
      <SiteFooter />
    </main>
  );
}
