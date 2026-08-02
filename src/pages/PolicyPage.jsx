import PageTransition from '../components/PageTransition.jsx';
import Seo from '../components/Seo.jsx';
import { policyPages } from '../data/siteContent.js';
import NotFound from './NotFound.jsx';

export default function PolicyPage({ type }) {
  const page = policyPages[type];

  if (!page) {
    return <NotFound />;
  }

  return (
    <PageTransition>
      <Seo title={`${page.title} | WayWeWander`} description={page.description} />

      <section className="page-hero page-hero--policy">
        <div className="container">
          <span className="eyebrow">WayWeWander policies</span>
          <h1>{page.title}</h1>
          <p>{page.description}</p>
        </div>
      </section>

      <section className="section">
        <div className="container policy-content">
          {page.sections.map((section) => (
            <article key={section.heading}>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </article>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
