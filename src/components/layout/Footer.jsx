import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import trips from '../../data/trips.json';
import { brand, navLinks } from '../../data/siteContent.js';

export default function Footer() {
  const popularTrips = trips.slice(0, 5);

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <section className="footer-brand" aria-label="WayWeWander summary">
          <Link className="brand-mark brand-mark--footer" to="/">
            <img src={brand.logoPath} alt="WayWeWander logo" />
            <span>{brand.name}</span>
          </Link>
          <p>
            Premium adventure, luxury, family, honeymoon, weekend, domestic, and international
            journeys planned with care.
          </p>
          <div className="social-links" aria-label="Social media links">
            <a href={brand.instagramUrl} aria-label={`Instagram ${brand.instagramHandle}`}>
              <FaInstagram />
            </a>
            <a href={brand.whatsappUrl} aria-label="WhatsApp">
              <FaWhatsapp />
            </a>
          </div>
        </section>

        <section>
          <h2>Quick Links</h2>
          <ul className="footer-list">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link to={link.path}>{link.label}</Link>
              </li>
            ))}
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms-and-conditions">Terms</Link>
            </li>
            <li>
              <Link to="/cancellation-policy">Cancellation Policy</Link>
            </li>
          </ul>
        </section>

        <section>
          <h2>Popular Trips</h2>
          <ul className="footer-list">
            {popularTrips.map((trip) => (
              <li key={trip.id}>
                <Link to={`/trip/${trip.slug}`}>{trip.title}</Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Contact</h2>
          <ul className="footer-list footer-contact">
            <li>
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
            </li>
            <li>
              <span>{brand.phone}</span>
            </li>
            <li>
              <a href={brand.whatsappUrl}>WhatsApp: {brand.whatsapp}</a>
            </li>
            <li>
              <a href={brand.instagramUrl}>Instagram: @{brand.instagramHandle}</a>
            </li>
          </ul>
        </section>
      </div>

      <div className="container footer-bottom">
        <span>Copyright 2026 WayWeWander. All rights reserved.</span>
        <span>{brand.tagline}</span>
      </div>
    </footer>
  );
}
