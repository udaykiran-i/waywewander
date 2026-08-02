import { useState } from 'react';
import {
  FaBed,
  FaCalendarAlt,
  FaChevronDown,
  FaCloudSun,
  FaMapMarkerAlt,
  FaMountain,
  FaStar,
  FaTruck,
  FaUtensils,
} from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import PageTransition from '../components/PageTransition.jsx';
import Seo from '../components/Seo.jsx';
import CallbackForm from '../components/forms/CallbackForm.jsx';
import TripCard from '../components/trips/TripCard.jsx';
import trips from '../data/trips.json';
import { formatPrice } from '../utils/formatters.js';
import NotFound from './NotFound.jsx';

export default function TripDetails() {
  const { slug } = useParams();
  const trip = trips.find((item) => item.slug === slug);
  const [openDay, setOpenDay] = useState(1);

  if (!trip) {
    return <NotFound />;
  }

  const relatedTrips = trips
    .filter((item) => item.slug !== trip.slug && item.categories.some((category) => trip.categories.includes(category)))
    .slice(0, 3);

  const tripFacts = [
    { label: 'Duration', value: trip.duration, icon: <FaCalendarAlt /> },
    { label: 'Pickup', value: trip.pickupLocation, icon: <FaMapMarkerAlt /> },
    { label: 'Stay', value: trip.accommodation, icon: <FaBed /> },
    { label: 'Transport', value: trip.transportation, icon: <FaTruck /> },
    { label: 'Meals', value: trip.meals, icon: <FaUtensils /> },
    { label: 'Weather', value: trip.weather, icon: <FaCloudSun /> },
    { label: 'Altitude', value: trip.altitude, icon: <FaMountain /> },
  ];

  return (
    <PageTransition>
      <Seo
        title={`${trip.title} | WayWeWander`}
        description={trip.shortDescription}
        image={trip.heroImage}
      />

      <section className="trip-detail-hero" style={{ '--hero-image': `url(${trip.heroImage})` }}>
        <div className="trip-detail-hero__overlay" />
        <div className="container trip-detail-hero__content">
          <span className="eyebrow">{trip.categories.join(' / ')}</span>
          <h1>{trip.title}</h1>
          <p>{trip.shortDescription}</p>
          <div className="hero-actions">
            <a className="btn btn--primary" href="#callback">
              Book Now
            </a>
            <a className="btn btn--light" href="#itinerary">
              View Itinerary
            </a>
          </div>
        </div>
      </section>

      <section className="section section--compact">
        <div className="container trip-summary-bar">
          <span>
            <FaStar /> {trip.rating} from {trip.reviewsCount} travelers
          </span>
          <span>{formatPrice(trip.price)} per person</span>
          <span>{trip.seatsLeft} seats left</span>
        </div>
      </section>

      <section className="section">
        <div className="container trip-detail-layout">
          <article>
            <span className="eyebrow">Overview</span>
            <h2>{trip.title}</h2>
            <p className="lead">{trip.overview}</p>
            <ul className="chip-list chip-list--large">
              {trip.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </article>

          <aside className="booking-card">
            <span>Starting from</span>
            <strong>{formatPrice(trip.price)}</strong>
            <p>Available dates: {trip.travelDates.join(', ')}</p>
            <a className="btn btn--primary btn--wide" href="#callback">
              Request Callback
            </a>
          </aside>
        </div>
      </section>

      <section className="section section--tinted">
        <div className="container facts-grid">
          {tripFacts.map((fact) => (
            <article className="fact-card" key={fact.label}>
              <span>{fact.icon}</span>
              <h3>{fact.label}</h3>
              <p>{fact.value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container gallery-grid">
          {trip.gallery.map((image, index) => (
            <img src={image} alt={`${trip.title} gallery ${index + 1}`} key={image} loading="lazy" decoding="async" />
          ))}
        </div>
      </section>

      <section className="section" id="itinerary">
        <div className="container section-heading">
          <span className="eyebrow">Day-wise itinerary</span>
          <h2>Designed with the right pauses</h2>
        </div>
        <div className="container itinerary-list">
          {trip.itinerary.map((day) => (
            <article className="itinerary-item" key={day.day}>
              <button type="button" onClick={() => setOpenDay(openDay === day.day ? 0 : day.day)}>
                <span>Day {day.day}</span>
                <strong>{day.title}</strong>
                <FaChevronDown />
              </button>
              {openDay === day.day && (
                <div className="itinerary-panel">
                  <img src={day.image} alt={day.title} loading="lazy" decoding="async" />
                  <div>
                    <p><strong>Morning:</strong> {day.morning}</p>
                    <p><strong>Afternoon:</strong> {day.afternoon}</p>
                    <p><strong>Evening:</strong> {day.evening}</p>
                    <p><strong>Hotel:</strong> {day.hotel}</p>
                    <p><strong>Meals Included:</strong> {day.mealsIncluded}</p>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="section section--tinted">
        <div className="container detail-columns">
          <InfoList title="Inclusions" items={trip.inclusions} />
          <InfoList title="Exclusions" items={trip.exclusions} />
          <InfoList title="Packing List" items={trip.packingList} />
        </div>
      </section>

      <section className="section">
        <div className="container split-layout">
          <div>
            <span className="eyebrow">FAQs and reviews</span>
            <h2>Know before you go</h2>
            <div className="faq-list">
              {trip.faq.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
          <div className="review-stack">
            {trip.reviews.map((review) => (
              <article className="testimonial-card" key={review.name}>
                <span className="rating-line">
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <FaStar key={`${review.name}-${index}`} />
                  ))}
                </span>
                <p>{review.text}</p>
                <strong>{review.name}</strong>
                <span>{review.location}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="callback">
        <div className="container callback-panel">
          <div>
            <span className="eyebrow">Plan this trip</span>
            <h2>Request availability for {trip.title}</h2>
            <p>Share your travel window and group details so we can confirm the best route and stay options.</p>
          </div>
          <CallbackForm trip={trip.title} sourcePage={`Trip: ${trip.slug}`} />
        </div>
      </section>

      {relatedTrips.length > 0 && (
        <section className="section section--tinted">
          <div className="container section-heading section-heading--inline">
            <div>
              <span className="eyebrow">Related trips</span>
              <h2>More journeys you may like</h2>
            </div>
            <Link className="btn btn--ghost" to="/trips">
              View all
            </Link>
          </div>
          <div className="container trip-grid trip-grid--three">
            {relatedTrips.map((item) => (
              <TripCard trip={item} key={item.id} />
            ))}
          </div>
        </section>
      )}

      <div className="mobile-booking-bar">
        <span>{formatPrice(trip.price)}</span>
        <a className="btn btn--primary" href="#callback">
          Book Now
        </a>
      </div>
    </PageTransition>
  );
}

function InfoList({ title, items }) {
  return (
    <article className="info-list">
      <h2>{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}
