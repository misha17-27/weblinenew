"use client";

import { useMemo, useState } from "react";
import type { ContactOffice } from "../lib/site-data";

export function ContactOfficeTabs({
  offices,
  heading,
  mapEyebrow,
  openMapLabel,
}: {
  offices: ContactOffice[];
  heading: string;
  mapEyebrow: string;
  openMapLabel: string;
}) {
  const [activeCity, setActiveCity] = useState(offices[0]?.city ?? "");

  const activeOffice = useMemo(
    () => offices.find((office) => office.city === activeCity) ?? offices[0],
    [activeCity, offices]
  );

  if (!activeOffice) {
    return null;
  }

  return (
    <section className="section contact-offices-section">
      <div className="shell">
        <div className="contact-offices-heading">
          <h2>{heading}</h2>
        </div>

        <div className="office-tabs" role="tablist" aria-label={heading}>
          {offices.map((office) => {
            const isActive = office.city === activeOffice.city;

            return (
              <button
                key={office.city}
                id={`office-tab-${office.city}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`office-panel-${office.city}`}
                className={isActive ? "office-tab is-active" : "office-tab"}
                onClick={() => setActiveCity(office.city)}
              >
                <div className="office-tab__icon" aria-hidden="true">
                  <span />
                </div>
                <strong>{office.city}</strong>
                <small>{office.country}</small>
                <ul>
                  <li>{office.address}</li>
                  <li>{office.phone}</li>
                  <li>{office.email}</li>
                </ul>
              </button>
            );
          })}
        </div>

        <div
          id={`office-panel-${activeOffice.city}`}
          role="tabpanel"
          aria-labelledby={`office-tab-${activeOffice.city}`}
          className="office-map-card"
        >
          <div className="office-map-card__meta">
            <div>
              <span className="eyebrow">{mapEyebrow}</span>
              <h3>{activeOffice.city}</h3>
              <p>
                {activeOffice.address}
                <br />
                {activeOffice.country}
              </p>
            </div>
            <a
              className="office-map-link"
              href={activeOffice.mapUrl}
              target="_blank"
              rel="noreferrer"
            >
              {openMapLabel}
            </a>
          </div>

          <iframe
            key={activeOffice.city}
            src={activeOffice.embedUrl}
            title={`${activeOffice.city} office map`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
