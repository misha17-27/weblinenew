import { ContactOfficeTabs } from "../components/contact-office-tabs";
import { SiteFooter, SiteHeader } from "../components/site-sections";
import { getMessages } from "../lib/messages";
import { getCurrentLocale } from "../lib/request-locale";
import { getSiteContent } from "../lib/wordpress";

export default async function ContactPage() {
  const locale = await getCurrentLocale();
  const t = getMessages(locale);
  const siteContent = await getSiteContent(locale);
  const offices = siteContent.offices;
  const primaryOffice = offices[0];

  const officesHeading =
    locale === "en"
      ? "Our offices"
      : locale === "ru"
        ? "Наши офисы"
        : locale === "de"
          ? "Unsere Standorte"
          : locale === "tr"
            ? "Ofislerimiz"
            : "Ofislərimiz";

  const mapEyebrow =
    locale === "en"
      ? "Office map"
      : locale === "ru"
        ? "Карта офиса"
        : locale === "de"
          ? "Karte des Standorts"
          : locale === "tr"
            ? "Ofis haritası"
            : "Ofis xəritəsi";

  const openMapLabel =
    locale === "en"
      ? "Open in maps"
      : locale === "ru"
        ? "Открыть на карте"
        : locale === "de"
          ? "In Karten öffnen"
          : locale === "tr"
            ? "Haritada aç"
            : "Xəritədə aç";

  return (
    <main className="page-shell">
      <SiteHeader />

      <section className="contact-hero shell">
        <span className="eyebrow">{siteContent.pageIntros.contact.eyebrow || "Contact"}</span>
        <h1>{t.contact.heroTitle}</h1>
        <p>{t.contact.heroDescription}</p>
      </section>

      <ContactOfficeTabs
        offices={offices}
        heading={officesHeading}
        mapEyebrow={mapEyebrow}
        openMapLabel={openMapLabel}
      />

      <section className="section contact-form-section">
        <div className="shell contact-story-layout">
          <div className="contact-story">
            <h2>
              {t.contact.storyTitleStart}
              <br />
              <em>{t.contact.storyTitleAccent}</em>
            </h2>
            <p>{t.contact.storyDescription}</p>

            <div className="contact-story-list">
              <div className="contact-story-item">
                <div className="contact-story-item__icon" aria-hidden="true">
                  <span />
                </div>
                <div>
                  <small>{t.contact.email}</small>
                  <a href={`mailto:${siteContent.contact.email}`}>{siteContent.contact.email}</a>
                </div>
              </div>

              <div className="contact-story-item">
                <div className="contact-story-item__icon" aria-hidden="true">
                  <span />
                </div>
                <div>
                  <small>{t.contact.phone}</small>
                  <a href={`tel:${siteContent.contact.phone.replace(/\s+/g, "")}`}>
                    {siteContent.contact.phone}
                  </a>
                </div>
              </div>

              <div className="contact-story-item">
                <div className="contact-story-item__icon" aria-hidden="true">
                  <span />
                </div>
                <div>
                  <small>{t.contact.address}</small>
                  <strong>{primaryOffice?.address || siteContent.contact.office}</strong>
                  <span>
                    {primaryOffice
                      ? `${primaryOffice.city}, ${primaryOffice.country}`
                      : siteContent.contact.office}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <form className="contact-modern-form">
            <label className="field">
              <span>{t.contact.fullName}</span>
              <input type="text" placeholder={t.contact.fullNamePlaceholder} />
            </label>

            <label className="field">
              <span>{t.contact.email}</span>
              <input type="email" placeholder="email@example.com" />
            </label>

            <label className="field">
              <span>{t.contact.phone}</span>
              <input type="tel" placeholder={t.contact.phonePlaceholder} />
            </label>

            <label className="field field-textarea">
              <span>{t.contact.message}</span>
              <textarea rows={8} placeholder={t.contact.messagePlaceholder} />
            </label>

            <div className="contact-modern-form__actions">
              <button className="button button-accent" type="submit">
                {t.contact.send} <span className="arrow">-&gt;</span>
              </button>
            </div>
          </form>
        </div>
      </section>

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
