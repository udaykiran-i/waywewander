import { useMemo, useState } from 'react';
import { FaCheckCircle, FaPaperPlane } from 'react-icons/fa';

const initialForm = {
  fullName: '',
  travelStartDate: '',
  travelEndDate: '',
  email: '',
  mobile: '',
  whatsappSame: true,
  whatsapp: '',
  message: '',
};

export default function CallbackForm({ trip = 'General enquiry', sourcePage = 'Website' }) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const whatsappNumber = useMemo(
    () => (form.whatsappSame ? form.mobile : form.whatsapp),
    [form.mobile, form.whatsapp, form.whatsappSame],
  );

  const updateField = (event) => {
    const { name, type, checked, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validate = () => {
    if (!form.fullName.trim()) return 'Please enter your full name.';
    if (!form.travelStartDate && !form.travelEndDate) return 'Please add your preferred travel dates.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Please enter a valid email.';
    if (!/^[0-9+\-\s()]{7,18}$/.test(form.mobile)) return 'Please enter a valid mobile number.';
    if (!form.whatsappSame && !/^[0-9+\-\s()]{7,18}$/.test(form.whatsapp)) {
      return 'Please enter a valid WhatsApp number.';
    }
    if (form.message.trim().length < 10) return 'Please tell us a little about your travel plans.';
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

    const payload = {
      fullName: form.fullName,
      travelStartDate: form.travelStartDate,
      travelEndDate: form.travelEndDate,
      email: form.email,
      mobile: form.mobile,
      whatsappSame: form.whatsappSame ? 'yes' : 'no',
      whatsapp: whatsappNumber,
      message: form.message,
      trip,
      sourcePage,
    };

    try {
      const response = await fetch('/.netlify/functions/send-callback-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      setStatus('success');
      setForm(initialForm);
    } catch {
      setStatus('error');
      setError('We could not submit this right now. Please try again or contact us on WhatsApp.');
    }
  };

  return (
    <form className="callback-form" name="callback" method="POST" onSubmit={submitForm} noValidate>
      <div className="form-grid">
        <label>
          <span>Full Name</span>
          <input name="fullName" value={form.fullName} onChange={updateField} autoComplete="name" />
        </label>
        <label className="date-range-field">
          <span>Travel Dates</span>
          <div className="date-range-inputs">
            <input
              type="date"
              name="travelStartDate"
              value={form.travelStartDate}
              onChange={updateField}
            />
            <span className="date-range-separator">to</span>
            <input
              type="date"
              name="travelEndDate"
              value={form.travelEndDate}
              onChange={updateField}
            />
          </div>
        </label>
        <label>
          <span>Email</span>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={updateField}
            autoComplete="email"
          />
        </label>
        <label>
          <span>Mobile Number</span>
          <input
            name="mobile"
            type="tel"
            value={form.mobile}
            onChange={updateField}
            autoComplete="tel"
          />
        </label>
      </div>

      <label className="checkbox-field">
        <input
          type="checkbox"
          name="whatsappSame"
          checked={form.whatsappSame}
          onChange={updateField}
        />
        <span>My WhatsApp number is same as mobile number</span>
      </label>

      {!form.whatsappSame && (
        <label>
          <span>WhatsApp Number</span>
          <input name="whatsapp" type="tel" value={form.whatsapp} onChange={updateField} />
        </label>
      )}

      <label>
        <span>Tell us about your travel plans</span>
        <textarea name="message" rows="5" value={form.message} onChange={updateField} />
      </label>

      {status === 'error' && <p className="form-message form-message--error">{error}</p>}
      {status === 'success' && (
        <p className="form-message form-message--success">
          <FaCheckCircle /> Your request is in. Our travel expert will reach out soon.
        </p>
      )}

      <button className="btn btn--primary btn--wide" type="submit" disabled={status === 'submitting'}>
        <FaPaperPlane /> {status === 'submitting' ? 'Sending...' : 'Request Callback'}
      </button>
    </form>
  );
}
