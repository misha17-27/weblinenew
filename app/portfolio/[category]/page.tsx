import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CtaStrip,
  SiteFooter,
  SiteHeader,
} from "../../components/site-sections";
import {
  getPortfolioCategories,
  getPortfolioCategory,
  getPortfolioPageCopy,
  getPortfolioProjects,
  portfolioCategorySlugs,
  type PortfolioCategorySlug,
} from "../../lib/portfolio-data";
import { localizeHref } from "../../lib/locale";
import { getCurrentLocale } from "../../lib/request-locale";
import { getSiteContent } from "../../lib/wordpress";

function isPortfolioCategory(value: string): value is PortfolioCategorySlug {
  return portfolioCategorySlugs.includes(value as PortfolioCategorySlug);
}

export function generateStaticParams() {
  return portfolioCategorySlugs.map((category) => ({ category }));
}

export default async function PortfolioCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  if (!isPortfolioCategory(category)) {
    notFound();
  }

  const locale = await getCurrentLocale();
  const [siteContent] = await Promise.all([getSiteContent(locale)]);
  const pageCopy = getPortfolioPageCopy(locale);
  const categoryCopy = getPortfolioCategory(locale, category);
  const categories = getPortfolioCategories(locale);
  const projects = getPortfolioProjects(locale).filter(
    (project) => project.category === category
  );

  return (
    <main className="page-shell">
      <SiteHeader />

      <section className="portfolio-category-page shell">
        <nav className="portfolio-breadcrumb" aria-label="Breadcrumb">
          <Link href={localizeHref("/portfolio", locale)}>{pageCopy.breadcrumbRoot}</Link>
          <span aria-hidden="true">›</span>
          <span>{categoryCopy.title}</span>
        </nav>

        <div className="portfolio-category-hero">
          <div className="portfolio-category-hero__icon" aria-hidden="true">
            ↗
          </div>
          <div className="portfolio-category-hero__copy">
            <h1>{categoryCopy.title}</h1>
            <p>{categoryCopy.description}</p>
          </div>
        </div>

        <div className="portfolio-category-tabs" aria-label={pageCopy.categoriesLabel}>
          {categories.map((item) => {
            const href = localizeHref(`/portfolio/${item.slug}`, locale);

            return (
              <Link
                key={item.slug}
                href={href}
                className={
                  item.slug === category
                    ? "portfolio-category-tabs__item is-active"
                    : "portfolio-category-tabs__item"
                }
              >
                {item.title}
              </Link>
            );
          })}
        </div>

        {projects.length ? (
          <div className="portfolio-project-grid">
            {projects.map((project) => (
              <article className="portfolio-project-card" key={project.slug}>
                <div className="portfolio-project-card__image">
                  <Image
                    src={project.image}
                    alt={project.alt}
                    width={900}
                    height={640}
                    sizes="(max-width: 760px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="portfolio-project-card__copy">
                  <span className="portfolio-project-card__badge">{project.badge}</span>
                  <h2>{project.title}</h2>
                  <p>{project.description}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="portfolio-empty-state">
            <h2>{pageCopy.emptyTitle}</h2>
            <p>{pageCopy.emptyDescription}</p>
          </div>
        )}
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
