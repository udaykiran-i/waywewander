import { useState } from 'react';
import { FaCheckCircle, FaPaperPlane, FaStar } from 'react-icons/fa';
import { encodeFormData } from '../../utils/formatters.js';

const ratingFields = [
  { name: 'tripPlanning', label: 'Travel arrangements' },
  { name: 'driverTransport', label: 'Driver and transport' },
  { name: 'staysRooms', label: 'Stays and rooms' },
  { name: 'valueForMoney', label: 'Budget-friendly value' },
  { name: 'overallRating', label: 'Overall experience' },
];

const initialForm = {
  fullName: '',
  email: '',
  tripName: '',
  travelMonth: '',
  tripPlanning: 0,
  driverTransport: 0,
  staysRooms: 0,
  valueForMoney: 0,
  overallRating: 0,
  review: '',
  consent: false,
};

export default function ReviewForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const updateField = (event) => {
    const { name, type, checked, value } = event.target;
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  };

  const validate = () => {
    if (!form.fullName.trim()) return 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Please enter a valid email address.';
    if (!form.tripName.trim()) return 'Please tell us which trip you took.';
    if (ratingFields.some((field) => !form[field.name])) return 'Please rate each part of your experience.';
    if (form.review.trim().length < 20) return 'Please share a little more about your experience.';
    if (!form.consent) return 'Please confirm that we may publish your review.';
    return '';
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const validationError = validate();

    if (validationError) {
      setError(validationError);
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setError('');

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeFormData({ 'form-name': 'traveler-review', ...form, consent: form.consent ? 'yes' : 'no' }),
      });

      if (!response.ok) throw new Error('Review submission failed');

      setStatus('success');
      setForm(initialForm);
    } catch {
      setStatus('error');
      setError('We could not submit your review right now. Please try again shortly.');
    }
  };

  return (
    <form className="review-form" name="traveler-review" data-netlify="true" method="POST" onSubmit={submitForm} noValidate>
      <input type="hidden" name="form-name" value="traveler-review" />
      <p className="sr-only"><label>Do not fill this in if you are human: <input name="bot-field" /></label></p>
      <p className="review-form__required"><span aria-hidden="true">*</span> Required fields</p>
      <div className="form-grid">
        <label>
          <span>Your name *</span>
          <input name="fullName" value={form.fullName} onChange={updateField} autoComplete="name" />
        </label>
        <label>
          <span>Email *</span>
          <input name="email" type="email" value={form.email} onChange={updateField} autoComplete="email" />
        </label>
        <label>
          <span>Trip taken *</span>
          <input name="tripName" value={form.tripName} onChange={updateField} placeholder="For example, Kerala Escape" />
        </label>
        <label>
          <span>When did you travel?</span>
          <input name="travelMonth" type="month" value={form.travelMonth} onChange={updateField} />
        </label>
      </div>

      <fieldset className="review-ratings">
        <legend>Rate your experience out of 5 *</legend>
        {ratingFields.map((field) => (
          <div className="review-rating" key={field.name}>
            <span>{field.label}</span>
            <div className="star-input" aria-label={`${field.label} rating`}>
              {[1, 2, 3, 4, 5].map((value) => (
                <label key={value} title={`${value} out of 5`}>
                  <input
                    type="radio"
                    name={field.name}
                    value={value}
                    checked={Number(form[field.name]) === value}
                    onChange={updateField}
                  />
                  <FaStar aria-hidden="true" />
                  <span className="sr-only">{value} out of 5</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </fieldset>

      <label>
        <span>Your review *</span>
        <textarea name="review" rows="5" value={form.review} onChange={updateField} placeholder="What stood out about your trip?" />
      </label>

      <label className="checkbox-field">
        <input name="consent" type="checkbox" checked={form.consent} onChange={updateField} />
        <span>I took this trip and give WayWeWander permission to publish my review after verification.</span>
      </label>

      {status === 'error' && <p className="form-message form-message--error">{error}</p>}
      {status === 'success' && <p className="form-message form-message--success"><FaCheckCircle /> Thank you. Your review is waiting for verification.</p>}

      <button className="btn btn--primary" type="submit" disabled={status === 'submitting'}>
        <FaPaperPlane /> {status === 'submitting' ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}
