import Link from "next/link";
import {
  PageIntro,
  SiteFooter,
  SiteHeader,
} from "../components/site-sections";
import { getSiteContent } from "../lib/wordpress";

export default async function ContactPage() {
  const siteContent = await getSiteContent();
  const contactDetails = [
    {
      label: "Email",
      value: siteContent.contact.email,
      href: `mailto:${siteContent.contact.email}`,
    },
    {
      label: "Phone",
      value: siteContent.contact.phone,
      href: `tel:${siteContent.contact.phone.replace(/\s+/g, "")}`,
    },
    {
      label: "Office",
      value: siteContent.contact.office,
      href: siteContent.contact.mapUrl,
    },
  ];

  return (
    <main className="page-shell">
      <SiteHeader />
      <PageIntro {...siteContent.pageIntros.contact} />

      <section className="section">
        <div className="shell contact-layout">
          <div className="contact-panel">
            <span className="eyebrow">Contact details</span>
            <h2>{siteContent.contact.panelTitle}</h2>
            <p>{siteContent.contact.panelDescription}</p>

            <div className="contact-list">
              {contactDetails.map((item) => (
                <div className="contact-item" key={item.label}>
                  <span>{item.label}</span>
                  <a href={item.href}>{item.value}</a>
                </div>
              ))}
            </div>

            <div className="contact-note">
              <strong>{siteContent.contact.responseTitle}</strong>
              <p>{siteContent.contact.responseText}</p>
            </div>
          </div>

          <form className="contact-form">
            <div className="contact-form-body">
              <div className="form-grid">
                <label className="field">
                  <span>Name</span>
                  <input type="text" placeholder="Your name" />
                </label>
                <label className="field">
                  <span>Email</span>
                  <input type="email" placeholder="name@company.com" />
                </label>
              </div>

              <div className="form-grid">
                <label className="field">
                  <span>Company</span>
                  <input type="text" placeholder="Company name" />
                </label>
                <label className="field">
                  <span>Budget</span>
                  <select defaultValue="Select range">
                    <option disabled>Select range</option>
                    <option>$5k - $15k</option>
                    <option>$15k - $40k</option>
                    <option>$40k+</option>
                  </select>
                </label>
              </div>

              <label className="field field-grow">
                <span>Project brief</span>
                <textarea
                  rows={7}
                  placeholder="Describe the problem, goals, timeline, and what you need from RUNOK."
                />
              </label>
            </div>

            <div className="contact-actions">
              <button className="button button-primary" type="submit">
                Send Inquiry
              </button>
              <Link className="button button-outline" href="/services">
                Review Services
              </Link>
            </div>
          </form>
        </div>
      </section>

      <section className="section section-muted">
        <div className="shell">
          <div className="map-card">
            <div className="map-card__header">
              <div>
                <span className="eyebrow">Office map</span>
                <h2>{siteContent.contact.mapHeading}</h2>
              </div>
              <a
                className="button button-outline"
                href={siteContent.contact.mapUrl}
                rel="noreferrer"
                target="_blank"
              >
                Open in Maps
              </a>
            </div>

            <div className="map-frame">
              <iframe
                title="RUNOK office map"
                src={siteContent.contact.embedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter contactEmail={siteContent.contact.email} />
    </main>
  );
}
