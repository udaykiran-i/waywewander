import { FaCompass, FaHandshake, FaMapSigns } from 'react-icons/fa';
import PageTransition from '../components/PageTransition.jsx';
import Seo from '../components/Seo.jsx';
import { brand, travelStats } from '../data/siteContent.js';

export default function About() {
  return (
    <PageTransition>
      <Seo
        title="About | WayWeWander"
        description="WayWeWander is a premium travel planning company creating curated adventure, luxury, family, honeymoon, weekend, domestic, and international journeys."
      />

      <section className="page-hero page-hero--about">
        <div className="container">
          <span className="eyebrow">About WayWeWander</span>
          <h1>Travel planning for people who notice the details</h1>
          <p>
            We design journeys with a clear rhythm: stays that feel right, routes that respect time, and experiences that connect travelers with place.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container split-layout">
          <div>
            <span className="eyebrow">{brand.tagline}</span>
            <h2>Built around better travel days</h2>
          </div>
          <div className="copy-stack">
            <p>
              WayWeWander began with a simple belief: premium travel is not only about expensive rooms. It is about thoughtful pacing, transparent advice, local trust, and the confidence that someone has handled the details.
            </p>
            <p>
              Our itineraries are designed for modern Indian travelers seeking adventure, comfort, culture, and connection without the stress of stitching every piece together alone.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--tinted">
        <div className="container values-grid">
          <article>
            <FaCompass />
            <h2>Curiosity</h2>
            <p>We prefer routes with texture, local food, people, terrain, and stories that stay with you.</p>
          </article>
          <article>
            <FaMapSigns />
            <h2>Clarity</h2>
            <p>We keep inclusions, exclusions, pace, and practical tradeoffs visible from the start.</p>
          </article>
          <article>
            <FaHandshake />
            <h2>Care</h2>
            <p>We choose partners and stays with reliability, safety, warmth, and service consistency in mind.</p>
          </article>
        </div>
      </section>

      {/* COMMENTED OUT FOR FUTURE USE - Uncomment when stats are available
      <section className="section section--compact">
        <div className="container stats-grid">
          {travelStats.map((stat) => (
            <div className="stat-item" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>
      */}
    </PageTransition>
  );
}
