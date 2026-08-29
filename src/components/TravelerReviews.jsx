import { useEffect, useMemo, useState } from 'react';
import { FaChevronDown, FaQuoteLeft, FaStar } from 'react-icons/fa';
import ReviewForm from './forms/ReviewForm.jsx';
import { getPublishedReviews } from '../services/reviews.js';

function Stars({ value }) {
  return <span className="review-stars" aria-label={`${value} out of 5 stars`}>{[1, 2, 3, 4, 5].map((star) => <FaStar className={star <= Math.round(value) ? 'is-filled' : ''} key={star} aria-hidden="true" />)}</span>;
}

export default function TravelerReviews() {
  const [showForm, setShowForm] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getPublishedReviews().then(setReviews).catch(() => setReviews([]));
  }, []);

  const overallRating = useMemo(() => {
    if (!reviews.length) return null;
    return reviews.reduce((total, review) => total + review.overall_rating, 0) / reviews.length;
  }, [reviews]);

  return (
    <section className="section traveler-reviews" id="traveler-reviews">
      <div className="container review-intro">
        <div>
          <span className="eyebrow">Traveler reviews</span>
          <h2>Trip stories, rated by the people who took them</h2>
          <p>Every review is checked before it appears here, so future travelers can plan with confidence.</p>
        </div>
        {overallRating !== null && (
          <div className="review-summary" aria-label={`${overallRating.toFixed(1)} out of 5 based on ${reviews.length} reviews`}>
            <strong>{overallRating.toFixed(1)}</strong>
            <div><Stars value={overallRating} /><span>Based on {reviews.length} verified review{reviews.length === 1 ? '' : 's'}</span></div>
          </div>
        )}
      </div>

      {reviews.length ? (
        <div className="container review-grid">
          {reviews.map((review) => (
            <article className="review-card" key={review.id}>
              <FaQuoteLeft className="review-card__quote" aria-hidden="true" />
              <Stars value={review.overall_rating} />
              <p>{review.review}</p>
              <strong>{review.name}</strong>
              <span>{review.trip_name}{review.travel_month ? `, ${new Intl.DateTimeFormat('en-IN', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(review.travel_month))}` : ''}</span>
              <ul className="review-card__tags" aria-label="Rated trip categories">
                {review.trip_planning >= 4 && <li>Travel arrangements</li>}
                {review.driver_transport >= 4 && <li>Driver and transport</li>}
                {review.stays_rooms >= 4 && <li>Stays and rooms</li>}
                {review.value_for_money >= 4 && <li>Good value</li>}
              </ul>
            </article>
          ))}
        </div>
      ) : (
        <div className="container review-empty">
          <FaStar aria-hidden="true" />
          <div><h3>Be among the first to share your trip</h3><p>We publish verified traveler feedback here after review.</p></div>
        </div>
      )}

      <div className="container review-submit">
        <button className="btn btn--secondary" type="button" onClick={() => setShowForm((visible) => !visible)} aria-expanded={showForm} aria-controls="review-form-panel">
          {showForm ? 'Close review form' : 'Write a review'} <FaChevronDown className={showForm ? 'is-open' : ''} />
        </button>
        {showForm && <div id="review-form-panel"><ReviewForm /></div>}
      </div>
    </section>
  );
}
