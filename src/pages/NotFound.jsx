import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition.jsx';
import Seo from '../components/Seo.jsx';

export default function NotFound() {
  return (
    <PageTransition>
      <Seo
        title="Page Not Found | WayWeWander"
        description="The WayWeWander page you were looking for could not be found."
      />

      <section className="not-found">
        <div className="container">
          <span className="eyebrow">404</span>
          <h1>This route wandered off</h1>
          <p>The page may have moved, or the itinerary link may no longer be active.</p>
          <Link className="btn btn--primary" to="/trips">
            Explore Trips <FaArrowRight />
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}
