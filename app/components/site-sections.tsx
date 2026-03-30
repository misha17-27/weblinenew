import Image from "next/image";
import Link from "next/link";
import {
  aboutImageOne,
  aboutImageTwo,
  heroImage,
  navItems,
  type InsightItem,
  type PageIntroContent,
  type SiteContent,
} from "../lib/site-data";
import { WeblineLogo } from "./webline-logo";

export { SiteHeader } from "./site-header";

export function SiteFooter({
  contactEmail,
  contactPhone,
  contactOffice,
  description,
}: {
  contactEmail: string;
  contactPhone?: string;
  contactOffice?: string;
  description?: string;
}) {
  return (
    <footer className="footer">
      <div className="shell footer-grid">
        <div>
          <Link className="brand footer-brand" href="/">
            <WeblineLogo className="brand-logo brand-logo--footer" footer />
          </Link>
          <p>
            {description ??
              "Azərbaycanda və ondan kənarda müasir məhsullar, veb-saytlar və böyümə yönümlü təcrübələr hazırlayan rəqəmsal agentlik."}
          </p>
          <div className="social-row">
            <a href="https://facebook.com" aria-label="Facebook">
              f
            </a>
            <a href="https://instagram.com" aria-label="Instagram">
              i
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn">
              in
            </a>
            <Link href="/" aria-label="Website">
              x
            </Link>
          </div>
        </div>
        <div className="footer-links">
          <h4>Xidmətlər</h4>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className="footer-links">
          <h4>Əlaqə</h4>
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          {contactPhone ? (
            <a href={`tel:${contactPhone.replace(/\s+/g, "")}`}>{contactPhone}</a>
          ) : null}
          {contactOffice ? <span>{contactOffice}</span> : null}
        </div>
      </div>
      <div className="shell footer-bottom">
        <div>© 2026 Webline. Bütün hüquqlar qorunur.</div>
        <div className="footer-policy">
          <a href="#">Gizlilik siyasəti</a>
          <a href="#">İstifadə şərtləri</a>
        </div>
      </div>
    </footer>
  );
}

export function PageIntro({ eyebrow, title, description }: PageIntroContent) {
  return (
    <section className="page-intro shell">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  );
}

export function HeroSection({ content }: { content: SiteContent["homeHero"] }) {
  return (
    <section className="hero shell">
      <div className="hero-copy">
        <span className="eyebrow">{content.eyebrow}</span>
        <h1>
          {content.title} <br /> <span>{content.highlight}</span>
        </h1>
        <p>{content.description}</p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/contact">
            Start Project
          </Link>
          <Link className="button button-ghost" href="/portfolio">
            Our Portfolio <span className="arrow">-&gt;</span>
          </Link>
        </div>
      </div>

      <div className="hero-visual">
        <div className="watermark">AGENCY</div>
        <div className="hero-card">
          <Image
            src={heroImage}
            alt="Modern abstract UI design showcase on laptop"
            width={720}
            height={900}
            priority
          />
        </div>
      </div>
    </section>
  );
}

export function ServicesSection({
  content,
  eyebrow = "Services",
}: {
  content: SiteContent["services"];
  eyebrow?: string;
}) {
  return (
    <section className="section section-muted">
      <div className="shell">
        <div className="section-heading split">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h2>{content.heading}</h2>
          </div>
          <p>{content.intro}</p>
        </div>
        <div className="service-grid">
          {content.items.map((service) => (
            <article className="service-card" key={service.title}>
              <div className="icon-badge">{service.icon ?? "Item"}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutSection({
  content,
  eyebrow = "About",
}: {
  content: SiteContent["about"];
  eyebrow?: string;
}) {
  return (
    <section className="section">
      <div className="shell about-grid">
        <div className="about-media">
          <div className="about-stack">
            <div className="about-column about-column-offset">
              <Image
                src={aboutImageOne}
                alt="Team collaborating in a modern studio"
                width={420}
                height={500}
              />
              <div className="experience-card">
                <strong>12+</strong>
                <span>Years Experience</span>
              </div>
            </div>
            <div className="about-column">
              <Image
                src={aboutImageTwo}
                alt="Minimalist office workspace architecture"
                width={420}
                height={760}
              />
            </div>
          </div>
        </div>

        <div className="about-copy">
          <span className="eyebrow">{eyebrow}</span>
          <h2>{content.title}</h2>
          <p>{content.description}</p>
          <ul className="check-list">
            {content.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
          <Link className="button button-outline" href="/services">
            Explore Services
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ProcessSection({
  content,
  eyebrow = "Process",
}: {
  content: SiteContent["process"];
  eyebrow?: string;
}) {
  return (
    <section className="section section-process">
      <div className="shell">
        <div className="section-heading centered">
          <span className="eyebrow">{eyebrow}</span>
          <h2>{content.heading}</h2>
        </div>
        <div className="process-grid">
          {content.items.map((step, index) => (
            <article className="process-step" key={`${step.title}-${index}`}>
              <div className={step.highlighted ? "step-badge active" : "step-badge"}>
                {step.number ?? `${index + 1}`.padStart(2, "0")}
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FaqSection({
  content,
  eyebrow = "FAQ",
}: {
  content: SiteContent["faq"];
  eyebrow?: string;
}) {
  return (
    <section className="section">
      <div className="shell faq-shell">
        <div className="section-heading centered">
          <span className="eyebrow">{eyebrow}</span>
          <h2>{content.heading}</h2>
        </div>
        <div className="faq-list">
          {content.items.map((item) => (
            <details className="faq-item" key={item.question} open={item.open}>
              <summary>
                <span>{item.question}</span>
                <span className="faq-symbol" aria-hidden="true" />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function InsightsSection({
  posts,
  heading = "Latest Insights",
}: {
  posts: InsightItem[];
  heading?: string;
}) {
  return (
    <section className="section section-insights">
      <div className="shell">
        <div className="section-heading split">
          <h2>{heading}</h2>
          <Link className="button button-link" href="/portfolio">
            View All Posts <span className="arrow">-&gt;</span>
          </Link>
        </div>
        <div className="insight-grid">
          {posts.map((post) => (
            <article className="insight-card" key={post.title}>
              <div className="insight-image">
                <Image src={post.image} alt={post.alt} width={600} height={360} />
              </div>
              <div className="insight-meta">
                <span>{post.category}</span>
                <span className="dot" />
                <span>{post.date}</span>
              </div>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaStrip({
  eyebrow = "Contact",
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description: string;
}) {
  return (
    <section className="section">
      <div className="shell">
        <div className="cta-strip">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          <div className="button-row">
            <Link className="button button-primary" href="/services">
              Review Services
            </Link>
            <Link className="button button-outline" href="/contact">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
