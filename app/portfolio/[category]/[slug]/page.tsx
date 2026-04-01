import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CtaStrip,
  SiteFooter,
  SiteHeader,
} from "../../../components/site-sections";
import {
  fallbackPortfolioProjects,
  getPortfolioCategory,
  getPortfolioPageCopy,
} from "../../../lib/portfolio-data";
import { localizeHref } from "../../../lib/locale";
import { getCurrentLocale } from "../../../lib/request-locale";
import {
  getPortfolioCategoriesFromCms,
  getPortfolioProjects,
  getSiteContent,
} from "../../../lib/wordpress";

function buildProjectParagraphs(description: string) {
  const trimmed = description.trim();

  if (!trimmed) {
    return [];
  }

  return [
    trimmed,
    `${trimmed} This project was shaped around clarity, pacing, and a cleaner browsing flow so the product story stays easy to follow.`,
    `${trimmed} We focused on visual hierarchy, a deliberate content rhythm, and a presentation that feels polished across desktop and mobile.`,
  ];
}

export default async function PortfolioProjectPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const locale = await getCurrentLocale();

  const [siteContent, cmsProjects, cmsCategories] = await Promise.all([
    getSiteContent(locale),
    getPortfolioProjects(locale),
    getPortfolioCategoriesFromCms(locale),
  ]);

  const categorySource =
    cmsCategories.length ? cmsCategories : siteContent.portfolioCategories;
  const categoryExists = categorySource.some((item) => item.slug === category);

  if (!categoryExists) {
    notFound();
  }

  const portfolioProjects = cmsProjects.length ? cmsProjects : fallbackPortfolioProjects;
  const project = portfolioProjects.find(
    (item) => item.category === category && item.slug === slug
  );

  if (!project) {
    notFound();
  }

  const pageCopy = getPortfolioPageCopy(locale);
  const categoryCopy = getPortfolioCategory(locale, category, categorySource);
  const detailParagraphs = buildProjectParagraphs(project.description);
  const galleryImages = [
    { src: project.image, alt: project.alt },
    ...(project.gallery ?? []),
  ];

  return (
    <main className="page-shell">
      <SiteHeader />

      <section className="portfolio-project-page shell">
        <nav className="portfolio-breadcrumb" aria-label="Breadcrumb">
          <Link href={localizeHref("/portfolio", locale)}>{pageCopy.breadcrumbRoot}</Link>
          <span aria-hidden="true">&gt;</span>
          <Link href={localizeHref(`/portfolio/${category}`, locale)}>{categoryCopy.title}</Link>
          <span aria-hidden="true">&gt;</span>
          <span>{project.title}</span>
        </nav>

        <div className="portfolio-project-hero">
          <span className="eyebrow">{project.badge}</span>
          <h1>{project.title}</h1>
          <div className="portfolio-project-hero__copy">
            {detailParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="portfolio-project-gallery">
          <div className="portfolio-project-gallery__main">
            <Image
              src={galleryImages[0].src}
              alt={galleryImages[0].alt}
              width={1440}
              height={940}
              sizes="(max-width: 760px) 100vw, 100vw"
              priority
            />
          </div>

          {galleryImages.length > 1 ? (
            <div className="portfolio-project-gallery__thumbs">
              {galleryImages.slice(1).map((image, index) => (
                <div className="portfolio-project-gallery__thumb" key={`${image.alt}-${index}`}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={720}
                    height={520}
                    sizes="(max-width: 760px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          ) : null}
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
