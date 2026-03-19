import Image from "next/image";
import Link from "next/link";
import {
  aboutBullets,
  aboutImageOne,
  aboutImageTwo,
  faqItems,
  heroImage,
  insights,
  navItems,
  processSteps,
  services,
} from "../lib/site-data";

export function SiteHeader() {
  return (
    <header className="topbar">
      <nav className="shell nav">
        <Link className="brand" href="/">
          RUNOK
        </Link>
        <div className="nav-links">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        <Link className="button button-primary button-small" href="/contact">
          Get in Touch
        </Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="shell footer-grid">
        <div>
          <Link className="brand footer-brand" href="/">
            RUNOK
          </Link>
          <p>
            A high-end design agency focusing on premium digital experiences and
            editorial precision.
          </p>
          <div className="social-row">
            <a href="mailto:hello@runok.agency" aria-label="Email">
              @
            </a>
            <Link href="/" aria-label="Website">
              O
            </Link>
          </div>
        </div>
        <div className="footer-links">
          <h4>Explore</h4>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className="footer-newsletter">
          <h4>Newsletter</h4>
          <p>Subscribe to our weekly editorial digest.</p>
          <div className="newsletter-row">
            <input type="email" placeholder="Email Address" />
            <button type="button">Join</button>
          </div>
        </div>
      </div>
      <div className="shell footer-bottom">
        <div>Copyright 2024 RUNOK Agency. All rights reserved.</div>
        <div className="footer-policy">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="page-intro shell">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  );
}

export function HeroSection() {
  return (
    <section className="hero shell">
      <div className="hero-copy">
        <span className="eyebrow">Premium Web Agency</span>
        <h1>
          Transforming <br /> Visions into <br /> <span>Digital Reality</span>
        </h1>
        <p>
          We create high-end editorial digital experiences that redefine how
          brands connect with their audience. Precise, bold, and unapologetically
          modern.
        </p>
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

export function ServicesSection() {
  return (
    <section className="section section-muted">
      <div className="shell">
        <div className="section-heading split">
          <div>
            <span className="eyebrow">Expertise</span>
            <h2>Our Core Services</h2>
          </div>
          <p>
            Tailored solutions that merge technical excellence with visual
            storytelling.
          </p>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <div className="icon-badge">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutSection() {
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
          <span className="eyebrow">Who we are</span>
          <h2>We are a team of curators, designers, and developers.</h2>
          <p>
            Founded on the principle of editorial excellence, Runok helps
            visionary companies create digital assets that stand the test of time.
            We do not just build websites; we curate digital ecosystems.
          </p>
          <ul className="check-list">
            {aboutBullets.map((bullet) => (
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

export function ProcessSection() {
  return (
    <section className="section section-process">
      <div className="shell">
        <div className="section-heading centered">
          <span className="eyebrow">Our Methodology</span>
          <h2>How We Work</h2>
        </div>
        <div className="process-grid">
          {processSteps.map((step) => (
            <article className="process-step" key={step.number}>
              <div className={step.highlighted ? "step-badge active" : "step-badge"}>
                {step.number}
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

export function FaqSection() {
  return (
    <section className="section">
      <div className="shell faq-shell">
        <div className="section-heading centered">
          <span className="eyebrow">Knowledge Base</span>
          <h2>Common Questions</h2>
        </div>
        <div className="faq-list">
          {faqItems.map((item) => (
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

export function InsightsSection() {
  return (
    <section className="section section-insights">
      <div className="shell">
        <div className="section-heading split">
          <h2>Latest Insights</h2>
          <Link className="button button-link" href="/portfolio">
            View All Posts <span className="arrow">-&gt;</span>
          </Link>
        </div>
        <div className="insight-grid">
          {insights.map((post) => (
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

export function CtaStrip() {
  return (
    <section className="section">
      <div className="shell">
        <div className="cta-strip">
          <div>
            <span className="eyebrow">Start a project</span>
            <h2>Need the same design, but as a full agency website?</h2>
            <p>
              Separate pages are ready. The next step is wiring forms, CMS
              content, and real portfolio entries.
            </p>
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
