import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaStrip, SiteFooter, SiteHeader } from "../../../components/site-sections";
import { localizeHref } from "../../../lib/locale";
import { getCurrentLocale } from "../../../lib/request-locale";
import { getServiceItem, getServicePaths } from "../../../lib/services-data";
import { getSiteContent } from "../../../lib/wordpress";

type ServiceDetailPageProps = {
  params: Promise<{
    group: string;
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getServicePaths();
}

export async function generateMetadata({ params }: ServiceDetailPageProps) {
  const { group, slug } = await params;
  const service = getServiceItem(group, slug);

  if (!service) {
    return {};
  }

  return {
    title: `${service.item.title} | Webline`,
    description: service.item.description,
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const [{ group, slug }, locale] = await Promise.all([params, getCurrentLocale()]);
  const service = getServiceItem(group, slug);

  if (!service) {
    notFound();
  }

  const siteContent = await getSiteContent(locale);
  const otherServices = service.group.items.filter((item) => item.slug !== service.item.slug);

  return (
    <main className="page-shell">
      <SiteHeader />

      <section className="service-detail-hero shell">
        <nav className="service-detail-breadcrumb" aria-label="Breadcrumb">
          <Link href={localizeHref("/services", locale)}>Services</Link>
          <span>/</span>
          <Link href={localizeHref(`/services#${service.group.slug}`, locale)}>
            {service.group.title}
          </Link>
          <span>/</span>
          <span>{service.item.title}</span>
        </nav>

        <span className="eyebrow">{service.group.title}</span>
        <h1>{service.item.title}</h1>
        <p>{service.item.description}</p>
        <Link className="button button-accent" href={localizeHref("/contact", locale)}>
          Get a Quote
        </Link>
      </section>

      <section className="section">
        <div className="shell service-detail-layout">
          <article className="service-detail-overview">
            <span className="eyebrow">OVERVİEW</span>
            <h2>What we deliver</h2>
            {service.item.overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            {service.item.highlights?.length ? (
              <div className="service-detail-highlights" aria-label="Highlights">
                {service.item.highlights.map((highlight) => (
                  <span key={highlight}>{highlight}</span>
                ))}
              </div>
            ) : null}
          </article>

          <aside className="service-detail-sidebar">
            <h3>Other {service.group.title} services</h3>
            <div className="service-detail-links">
              {otherServices.map((item) => (
                <Link
                  href={localizeHref(`/services/${service.group.slug}/${item.slug}`, locale)}
                  key={item.slug}
                >
                  <span>{item.title}</span>
                  <span aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
          </aside>
        </div>
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

export const dynamicParams = false;
