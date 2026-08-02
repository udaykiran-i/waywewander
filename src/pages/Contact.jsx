import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import PageTransition from '../components/PageTransition.jsx';
import Seo from '../components/Seo.jsx';
import CallbackForm from '../components/forms/CallbackForm.jsx';
import { brand } from '../data/siteContent.js';

export default function Contact() {
  return (
    <PageTransition>
      <Seo
        title="Contact | WayWeWander"
        description="Request a callback from WayWeWander for premium travel planning, curated trips, and custom itinerary support."
      />

      <section className="page-hero page-hero--contact">
        <div className="container">
          <span className="eyebrow">Contact</span>
          <h1>Start with your travel window</h1>
          <p>Tell us where you want to go, how you like to travel, and what kind of comfort matters to you.</p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <article>
            <FaEnvelope />
            <h2>Email</h2>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </article>
          <article>
            <FaPhoneAlt />
            <h2>Phone</h2>
            <p>{brand.phone}</p>
          </article>
          <article>
            <FaWhatsapp />
            <h2>WhatsApp</h2>
            <a href={brand.whatsappUrl}>{brand.whatsapp}</a>
          </article>
          <article>
            <FaMapMarkerAlt />
            <h2>Base</h2>
            <p>{brand.address}</p>
          </article>
        </div>
      </section>

      <section className="section section--tinted" id="callback">
        <div className="container callback-panel">
          <div>
            <span className="eyebrow">Request a callback</span>
            <h2>Let an expert shape the first route</h2>
            <p>
              The more context you share, the better we can recommend destination, budget, dates, and style.
            </p>
          </div>
          <CallbackForm sourcePage="Contact" />
        </div>
      </section>
    </PageTransition>
  );
}
