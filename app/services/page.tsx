import Link from "next/link";
import { CtaStrip, SiteFooter, SiteHeader } from "../components/site-sections";
import { localizeHref } from "../lib/locale";
import { getCurrentLocale } from "../lib/request-locale";
import { serviceGroups } from "../lib/services-data";
import { getSiteContent } from "../lib/wordpress";

export default async function ServicesPage() {
  const locale = await getCurrentLocale();
  const siteContent = await getSiteContent(locale);

  return (
    <main className="page-shell">
      <SiteHeader />

      <section className="services-reference-hero shell">
        <span className="eyebrow">SERVİCES</span>
        <h1>Nə edirik</h1>
        <p>Konseptdən istifadəyə və sonrasına qədər uçdan-uca rəqəmsal xidmətlər.</p>

        <div className="services-reference-tabs" aria-label="Service groups">
          {serviceGroups.map((group) => (
            <a key={group.slug} href={`#${group.slug}`}>
              {group.title}
            </a>
          ))}
        </div>
      </section>

      <section className="services-reference-groups shell" aria-label="Services list">
        {serviceGroups.map((group, groupIndex) => (
          <div className="services-reference-group" id={group.slug} key={group.slug}>
            <div className="services-reference-group__intro">
              <span className="eyebrow">{String(groupIndex + 1).padStart(2, "0")}</span>
              <h2>{group.title}</h2>
              <p>{group.description}</p>
            </div>

            <div className="services-reference-card-grid">
              {group.items.map((item, itemIndex) => (
                <Link
                  className="services-reference-card"
                  href={localizeHref(`/services/${group.slug}/${item.slug}`, locale)}
                  key={item.slug}
                >
                  <span className="services-reference-card__icon" aria-hidden="true">
                    {itemIndex + 1}
                  </span>
                  <span className="services-reference-card__body">
                    <strong>{item.title}</strong>
                    <small>{item.description}</small>
                  </span>
                  <span className="services-reference-card__arrow" aria-hidden="true">
                    ↗
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      <CtaStrip
        locale={locale}
        eyebrow="Contact"
        title="Əla bir şey qurmağa hazırsınız?"
        description="Layihənizi müzakirə edək və rəqəmsal məqsədlərinizə necə çata biləcəyinizi araşdıraq."
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
