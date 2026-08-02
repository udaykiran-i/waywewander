import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { encodeFormData } from '../../utils/formatters.js';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const submitNewsletter = async (event) => {
    event.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeFormData({
          'form-name': 'newsletter',
          email,
          sourcePage: 'Footer',
        }),
      });

      if (!response.ok) {
        throw new Error('Newsletter submission failed');
      }

      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <form className="newsletter-form" name="newsletter" method="POST" onSubmit={submitNewsletter}>
      <input type="hidden" name="form-name" value="newsletter" />
      <label htmlFor="newsletter-email">Newsletter</label>
      <div>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          value={email}
          placeholder="Email address"
          onChange={(event) => setEmail(event.target.value)}
        />
        <button type="submit" aria-label="Subscribe" disabled={status === 'submitting'}>
          <FaPaperPlane />
        </button>
      </div>
      {status === 'success' && <p>Subscribed.</p>}
      {status === 'error' && <p>Please enter a valid email.</p>}
    </form>
  );
}
