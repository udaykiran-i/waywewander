import { useMemo, useState } from 'react';
import { FaChevronDown, FaQuoteLeft, FaStar } from 'react-icons/fa';
import { approvedReviews } from '../data/reviews.js';
import ReviewForm from './forms/ReviewForm.jsx';

function Stars({ value }) {
  return <span className="review-stars" aria-label={`${value} out of 5 stars`}>{[1, 2, 3, 4, 5].map((star) => <FaStar className={star <= Math.round(value) ? 'is-filled' : ''} key={star} aria-hidden="true" />)}</span>;
}

export default function TravelerReviews() {
  const [showForm, setShowForm] = useState(false);
  const overallRating = useMemo(() => {
    if (!approvedReviews.length) return null;
    return approvedReviews.reduce((total, review) => total + review.overallRating, 0) / approvedReviews.length;
  }, []);

  return (
    <section className="section traveler-reviews" id="traveler-reviews">
      <div className="container review-intro">
        <div>
          <span className="eyebrow">Traveler reviews</span>
          <h2>Trip stories, rated by the people who took them</h2>
          <p>Every review is checked before it appears here, so future travelers can plan with confidence.</p>
        </div>
        {overallRating !== null && (
          <div className="review-summary" aria-label={`${overallRating.toFixed(1)} out of 5 based on ${approvedReviews.length} reviews`}>
            <strong>{overallRating.toFixed(1)}</strong>
            <div><Stars value={overallRating} /><span>Based on {approvedReviews.length} verified review{approvedReviews.length === 1 ? '' : 's'}</span></div>
          </div>
        )}
      </div>

      {approvedReviews.length ? (
        <div className="container review-grid">
          {approvedReviews.map((review) => (
            <article className="review-card" key={`${review.name}-${review.tripName}`}>
              <FaQuoteLeft className="review-card__quote" aria-hidden="true" />
              <Stars value={review.overallRating} />
              <p>{review.review}</p>
              <strong>{review.name}</strong>
              <span>{review.tripName}{review.travelMonth ? `, ${review.travelMonth}` : ''}</span>
              <ul className="review-card__tags" aria-label="Rated trip categories">
                {review.highlights?.map((item) => <li key={item}>{item}</li>)}
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
