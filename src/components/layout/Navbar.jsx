import { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { brand, navLinks } from '../../data/siteContent.js';
import { useScrollPosition } from '../../hooks/useScrollPosition.js';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const hasScrolled = useScrollPosition(24);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, location.hash]);

  return (
    <header className={`site-header ${hasScrolled || isOpen ? 'site-header--solid' : ''}`}>
      <nav className="nav container" aria-label="Primary navigation">
        <Link className="brand-mark" to="/" aria-label="WayWeWander home">
          <img src={brand.logoPath} alt="WayWeWander logo" />
          <span>{brand.name}</span>
        </Link>

        <button
          className="icon-button nav-toggle"
          type="button"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className={`nav-panel ${isOpen ? 'nav-panel--open' : ''}`}>
          <div className="nav-links">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => (isActive ? 'nav-link nav-link--active' : 'nav-link')}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          <Link className="btn btn--primary nav-cta" to="/contact#callback">
            Request Callback
          </Link>
        </div>
      </nav>
    </header>
  );
}
