import Link from "next/link";
import {
  CtaStrip,
  SiteFooter,
  SiteHeader,
} from "../components/site-sections";
import {
  getPortfolioCategories,
  getPortfolioPageCopy,
} from "../lib/portfolio-data";
import { localizeHref } from "../lib/locale";
import { getCurrentLocale } from "../lib/request-locale";
import { getSiteContent } from "../lib/wordpress";

export default async function PortfolioPage() {
  const locale = await getCurrentLocale();
  const [siteContent] = await Promise.all([getSiteContent(locale)]);
  const pageCopy = getPortfolioPageCopy(locale);
  const categories = getPortfolioCategories(locale);

  return (
    <main className="page-shell">
      <SiteHeader />

      <section className="portfolio-hub shell">
        <div className="portfolio-hub__intro">
          <span className="eyebrow">{pageCopy.eyebrow}</span>
          <h1>{pageCopy.title}</h1>
          <p>{pageCopy.description}</p>
        </div>

        <div className="portfolio-category-grid" aria-label={pageCopy.categoriesLabel}>
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={localizeHref(`/portfolio/${category.slug}`, locale)}
              className="portfolio-category-card"
            >
              <div className="portfolio-category-card__icon" aria-hidden="true">
                ↗
              </div>
              <div className="portfolio-category-card__body">
                <h2>{category.title}</h2>
                <p>{category.description}</p>
              </div>
              <div className="portfolio-category-card__footer">
                <span>{category.shortLabel}</span>
                <span className="portfolio-category-card__arrow" aria-hidden="true">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CtaStrip
        locale={locale}
        eyebrow={siteContent.pageIntros.contact.eyebrow}
        title={siteContent.contact.panelTitle}
        description={siteContent.contact.panelDescription}
      />

      <SiteFooter
        locale={locale}
        contactEmail={siteContent.contact.email}
        contactPhone={siteContent.contact.phone}
        contactOffice={siteContent.contact.office}
        description={siteContent.pageIntros.about.description}
      />
    </main>
  );
}
