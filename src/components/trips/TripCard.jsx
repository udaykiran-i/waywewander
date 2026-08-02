import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function TripCard({ trip }) {
  return (
    <motion.article className="trip-card" whileHover={{ y: -8 }} transition={{ duration: 0.22 }}>
      <Link to={`/trip/${trip.slug}`} className="trip-card__image" aria-label={`View ${trip.title}`}>
        <img src={trip.heroImage} alt={trip.title} loading="lazy" decoding="async" />
        <span>{trip.categories[0]}</span>
      </Link>

      <div className="trip-card__body">
        <div className="trip-card__meta">
          <span>
            <FaMapMarkerAlt /> {trip.location}
          </span>
        </div>
        <div className="trip-card__meta">
          <span>
            <FaClock /> {trip.duration}
          </span>
        </div>
        <h2>{trip.title}</h2>
        <p>{trip.shortDescription}</p>

        <ul className="chip-list" aria-label={`${trip.title} highlights`}>
          {trip.highlights.slice(0, 3).map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>

        <div className="trip-card__footer">
          <div>
            <Link className="btn btn--ghost" to={`/trip/${trip.slug}#itinerary`}>
              View Itinerary
            </Link>
            <Link className="btn btn--primary" to={`/contact#callback`}>
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
