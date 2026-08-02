import { useMemo, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import PageTransition from '../components/PageTransition.jsx';
import Seo from '../components/Seo.jsx';
import TripCard from '../components/trips/TripCard.jsx';
import trips from '../data/trips.json';
import { tripCategories } from '../data/siteContent.js';
import { tripMatches } from '../utils/formatters.js';

export default function Trips() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');

  const filteredTrips = useMemo(
    () => trips.filter((trip) => tripMatches(trip, { query, category })),
    [category, query],
  );

  return (
    <PageTransition>
      <Seo
        title="Trips | WayWeWander"
        description="Search premium WayWeWander trips by destination, budget, duration, adventure style, domestic routes, international escapes, family holidays, honeymoons, weekends, and luxury travel."
      />

      <section className="page-hero page-hero--trips">
        <div className="container">
          <span className="eyebrow">Trip collection</span>
          <h1>Find the route that fits your travel rhythm</h1>
          <p>Filter curated journeys by place, price, and travel style.</p>
        </div>
      </section>

      <section className="section section--compact">
        <div className="container filter-bar" aria-label="Trip filters">
          <label className="search-field">
            <FaSearch />
            <input
              type="search"
              value={query}
              placeholder="Search destination, trip, or highlight"
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            aria-label="Trip category"
          >
            <option value="">All styles</option>
            {tripCategories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="container filter-chips" aria-label="Quick category filters">
          <button className={!category ? 'is-active' : ''} type="button" onClick={() => setCategory('')}>
            All
          </button>
          {tripCategories.map((item) => (
            <button
              key={item}
              className={category === item ? 'is-active' : ''}
              type="button"
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container section-heading section-heading--inline">
          <div>
            <span className="eyebrow">Available journeys</span>
          </div>
        </div>

        {filteredTrips.length > 0 ? (
          <div className="container trip-grid">
            {filteredTrips.map((trip) => (
              <TripCard trip={trip} key={trip.id} />
            ))}
          </div>
        ) : (
          <div className="container empty-state">
            <h2>No exact match yet</h2>
            <p>Try a wider search or clear the category filter to see more routes.</p>
          </div>
        )}
      </section>
    </PageTransition>
  );
}
