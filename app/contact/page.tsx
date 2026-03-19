import Link from "next/link";
import {
  PageIntro,
  SiteFooter,
  SiteHeader,
} from "../components/site-sections";

const contactDetails = [
  {
    label: "Email",
    value: "hello@runok.agency",
    href: "mailto:hello@runok.agency",
  },
  {
    label: "Phone",
    value: "+994 50 555 12 12",
    href: "tel:+994505551212",
  },
  {
    label: "Office",
    value: "Baku, Azerbaijan",
    href: "https://maps.google.com/?q=Baku,Azerbaijan",
  },
];

export default function ContactPage() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <PageIntro
        eyebrow="Contact"
        title="Let us discuss the next digital system your brand actually needs."
        description="Use the contact page for project requests, partnerships, and strategic conversations. The form is ready for backend wiring when you decide where submissions should go."
      />

      <section className="section">
        <div className="shell contact-layout">
          <div className="contact-panel">
            <span className="eyebrow">Contact details</span>
            <h2>Direct lines for project inquiries and planning.</h2>
            <p>
              If the scope is still rough, that is fine. Send the business goal,
              timeline, and what needs to change. We can structure the project
              from there.
            </p>

            <div className="contact-list">
              {contactDetails.map((item) => (
                <div className="contact-item" key={item.label}>
                  <span>{item.label}</span>
                  <a href={item.href}>{item.value}</a>
                </div>
              ))}
            </div>

            <div className="contact-note">
              <strong>Response window</strong>
              <p>Most inquiries get a reply within one business day.</p>
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
                <h2>Find the studio in Baku.</h2>
              </div>
              <a
                className="button button-outline"
                href="https://maps.google.com/?q=Baku,Azerbaijan"
                rel="noreferrer"
                target="_blank"
              >
                Open in Maps
              </a>
            </div>

            <div className="map-frame">
              <iframe
                title="RUNOK office map"
                src="https://www.google.com/maps?q=Baku,Azerbaijan&z=13&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
