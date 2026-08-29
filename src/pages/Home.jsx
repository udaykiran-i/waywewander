import { FaArrowRight, FaChevronDown, FaCompass, FaMountain, FaRoute } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition.jsx';
import Seo from '../components/Seo.jsx';
import CallbackForm from '../components/forms/CallbackForm.jsx';
import TravelerReviews from '../components/TravelerReviews.jsx';
import TripCard from '../components/trips/TripCard.jsx';
import trips from '../data/trips.json';
import {
  blogPreviews,
  brand,
  homeFaqs,
  partnerNames,
  travelStats,
  whyChoose,
} from '../data/siteContent.js';

const featuredTrips = trips.slice(0, 4);

export default function Home() {
  return (
    <PageTransition>
      <Seo
        title="WayWeWander | Travel Beyond Boundaries"
        description="Premium curated travel experiences for adventure, luxury, family, honeymoon, weekend, domestic, and international journeys."
      />

      <section className="hero-section">
        <div className="hero-media" aria-hidden="true" />
        <div className="hero-overlay" />
        <div className="container hero-content">
          <span className="eyebrow">Premium travel planning</span>
          <h1>{brand.name}</h1>
          <p>{brand.tagline} Curated trips, thoughtful stays, and expert planning for travelers who want every day to feel intentional.</p>
          <div className="hero-actions">
            <Link className="btn btn--primary" to="/trips">
              Explore Trips <FaArrowRight />
            </Link>
            <Link className="btn btn--light" to="/contact#callback">
              Contact Expert
            </Link>
          </div>
        </div>
        <a className="scroll-indicator" href="#featured-trips" aria-label="Scroll to featured trips">
          <FaChevronDown />
        </a>
      </section>

      {/* COMMENTED OUT FOR FUTURE USE - Uncomment when stats are available
      <section className="section section--compact">
        <div className="container stats-grid" data-aos="fade-up">
          {travelStats.map((stat) => (
            <div className="stat-item" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>
      */}

      <section className="section" id="featured-trips">
        <div className="container section-heading">
          <span className="eyebrow">Featured departures</span>
          <h2>Journeys with a strong point of view</h2>
          <p>
            Choose from active mountain routes, quiet island escapes, cultural loops, and family-friendly nature trails.
          </p>
        </div>
        <div className="container trip-grid">
          {featuredTrips.map((trip) => (
            <TripCard trip={trip} key={trip.id} />
          ))}
        </div>
        <div className="section-action">
          <Link className="btn btn--secondary" to="/trips">
            View All Trips <FaArrowRight />
          </Link>
        </div>
      </section>

      <section className="section section--tinted">
        <div className="container split-layout">
          <div>
            <span className="eyebrow">Why choose us</span>
            <h2>Premium travel, practical planning</h2>
            <p>
              The best trips feel effortless because the hard decisions were made carefully before departure.
            </p>
          </div>
          <div className="feature-grid">
            {whyChoose.map((item, index) => (
              <article className="feature-card" key={item.title} data-aos="fade-up" data-aos-delay={index * 80}>
                <span className="feature-icon">
                  {index % 3 === 0 && <FaCompass />}
                  {index % 3 === 1 && <FaRoute />}
                  {index % 3 === 2 && <FaMountain />}
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="callback">
        <div className="container callback-panel">
          <div>
            <span className="eyebrow">Request a callback</span>
            <h2>Tell us how you want to travel</h2>
            <p>
              Share your dates, group size, pace, and comfort level. A WayWeWander expert will help shape the route.
            </p>
          </div>
          <CallbackForm sourcePage="Home" />
        </div>
      </section>

      <TravelerReviews />
    </PageTransition>
  );
}
