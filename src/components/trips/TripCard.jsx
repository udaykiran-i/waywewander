import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaStar, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/formatters.js';

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
          <span>
            <FaStar /> {trip.rating}
          </span>
        </div>
        <h2>{trip.title}</h2>
        <p>{trip.shortDescription}</p>

        <div className="trip-facts" aria-label={`${trip.title} quick facts`}>
          <span>
            <FaClock /> {trip.duration}
          </span>
          <span>
            <FaCalendarAlt /> {trip.travelDates[0]}
          </span>
          <span>
            <FaUsers /> {trip.seatsLeft} seats left
          </span>
        </div>

        <ul className="chip-list" aria-label={`${trip.title} highlights`}>
          {trip.highlights.slice(0, 3).map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>

        <div className="trip-card__footer">
          <strong>{formatPrice(trip.price)}</strong>
          <div>
            <Link className="btn btn--ghost" to={`/trip/${trip.slug}`}>
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
