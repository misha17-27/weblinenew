import Image from "next/image";
import Link from "next/link";
import {
  CtaStrip,
  SiteFooter,
  SiteHeader,
} from "../components/site-sections";
import {
  fallbackPortfolioProjects,
  getPortfolioCategories,
  getPortfolioPageCopy,
} from "../lib/portfolio-data";
import { localizeHref } from "../lib/locale";
import { getCurrentLocale } from "../lib/request-locale";
import {
  getPortfolioCategoriesFromCms,
  getPortfolioProjects,
  getSiteContent,
} from "../lib/wordpress";

export default async function PortfolioPage() {
  const locale = await getCurrentLocale();
  const [siteContent, cmsProjects, cmsCategories] = await Promise.all([
    getSiteContent(locale),
    getPortfolioProjects(locale),
    getPortfolioCategoriesFromCms(locale),
  ]);
  const pageCopy = getPortfolioPageCopy(locale);
  const portfolioProjects = cmsProjects.length ? cmsProjects : fallbackPortfolioProjects;
  const categories = getPortfolioCategories(
    locale,
    cmsCategories.length ? cmsCategories : siteContent.portfolioCategories,
    portfolioProjects
  );

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
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              href={localizeHref(`/portfolio/${category.slug}`, locale)}
              className="portfolio-category-card"
            >
              <div className="portfolio-category-card__preview">
                <Image
                  src={category.image}
                  alt={category.alt}
                  width={700}
                  height={520}
                  sizes="(max-width: 760px) 100vw, (max-width: 1080px) 50vw, 25vw"
                />
                <div className="portfolio-category-card__icon" aria-hidden="true">
                  {(index + 1).toString().padStart(2, "0")}
                </div>
              </div>
              <div className="portfolio-category-card__body">
                <h2>{category.title}</h2>
                <p>{category.description}</p>
                <small>{category.featuredTitle}</small>
              </div>
              <div className="portfolio-category-card__footer">
                <span>{category.shortLabel}</span>
                <span className="portfolio-category-card__arrow" aria-hidden="true">
                  -&gt;
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
