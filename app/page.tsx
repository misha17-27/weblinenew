import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "./components/site-sections";
import { aboutImageOne, aboutImageTwo, heroImage } from "./lib/site-data";
import { getMessages } from "./lib/messages";
import { localizeHref } from "./lib/locale";
import { getCurrentLocale } from "./lib/request-locale";
import { getInsights, getSiteContent } from "./lib/wordpress";

const partnerLogos = ["SOCAR", "Azercell", "PASHA Bank", "Kapital Bank"];

export default async function Home() {
  const locale = await getCurrentLocale();
  const t = getMessages(locale);
  const content = await getSiteContent(locale);
  const insights = await getInsights(locale);

  const mosaicImages = [
    { src: heroImage, alt: "Laptop interface", tall: true },
    { src: aboutImageTwo, alt: "Interior", tall: true },
    { src: insights[2]?.image ?? heroImage, alt: insights[2]?.alt ?? "Workspace", tall: true },
    { src: insights[0]?.image ?? aboutImageOne, alt: insights[0]?.alt ?? "Team" },
    { src: insights[1]?.image ?? aboutImageTwo, alt: insights[1]?.alt ?? "Charts" },
    { src: aboutImageOne, alt: "Studio" },
    { src: insights[2]?.image ?? heroImage, alt: "Display" },
    { src: heroImage, alt: "Product" },
  ];

  return (
    <main className="page-shell webline-page">
      <SiteHeader />

      <section className="webline-hero shell">
        <div className="webline-hero__copy">
          <span className="eyebrow">{content.homeHero.eyebrow}</span>
          <h1>
            {content.homeHero.title}
            <br />
            <em>{content.homeHero.highlight}</em>
          </h1>
          <p>{content.homeHero.description}</p>
          <div className="hero-actions">
            <Link className="button button-accent" href={localizeHref("/contact", locale)}>
              {t.home.startProject} →
            </Link>
            <Link className="button button-outline" href={localizeHref("/portfolio", locale)}>
              {t.home.ourWorks}
            </Link>
          </div>
        </div>

        <div className="webline-mosaic">
          {mosaicImages.map((image, index) => (
            <div
              className={image.tall ? "mosaic-card mosaic-card--tall" : "mosaic-card"}
              key={`${image.alt}-${index}`}
            >
              <Image
                alt={image.alt}
                height={image.tall ? 320 : 220}
                priority={index < 3}
                src={image.src}
                width={220}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="webline-partners">
        <div className="shell webline-partners__row">
          <span>{t.home.trustedBy}</span>
          {partnerLogos.map((partner) => (
            <strong key={partner}>{partner}</strong>
          ))}
        </div>
      </section>

      <section className="section webline-capabilities">
        <div className="shell section-heading split">
          <div>
            <span className="eyebrow">{content.pageIntros.services.eyebrow}</span>
            <h2>{content.services.heading}</h2>
          </div>
          <p>{content.services.intro}</p>
        </div>
      </section>

      <section className="section webline-projects">
        <div className="shell">
          <div className="section-heading split">
            <div>
              <span className="eyebrow">{content.pageIntros.portfolio.eyebrow}</span>
              <h2>{content.pageIntros.portfolio.title}</h2>
            </div>
            <Link className="button button-outline" href={localizeHref("/portfolio", locale)}>
              {t.home.allProjects} →
            </Link>
          </div>

          <div className="webline-project-grid">
            {insights.slice(0, 3).map((project, index) => (
              <article
                className={
                  index === 0
                    ? "project-card project-card--large project-card--dark"
                    : "project-card project-card--dark"
                }
                key={project.title}
              >
                <div className="project-browser">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="project-meta">
                  <span>{project.category}</span>
                  <h3>{project.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section webline-about">
        <div className="shell webline-about__grid">
          <div className="webline-about__copy">
            <span className="eyebrow">{content.pageIntros.about.eyebrow}</span>
            <h2>{content.about.title}</h2>
            <p>{content.about.description}</p>

            <ul className="webline-list">
              {content.about.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="webline-stat-card">
            <strong>8+</strong>
            <span>{t.home.statText}</span>
          </div>
        </div>
      </section>

      <section className="webline-cta shell">
        <h2>{content.contact.panelTitle}</h2>
        <p>{content.contact.panelDescription}</p>
        <Link className="button button-accent" href={localizeHref("/contact", locale)}>
          {t.home.reserveConsultation} →
        </Link>
      </section>

      <SiteFooter
        locale={locale}
        contactEmail={content.contact.email}
        contactPhone={content.contact.phone}
        contactOffice={content.contact.office}
        description={content.pageIntros.about.description}
      />
    </main>
  );
}
