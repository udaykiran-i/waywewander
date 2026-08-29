import { useEffect, useState } from 'react';
import { FaCheck, FaSignOutAlt, FaTrash, FaTimes } from 'react-icons/fa';
import PageTransition from '../components/PageTransition.jsx';
import Seo from '../components/Seo.jsx';
import { deleteReview, getAdminReviews, signInAdmin, updateReviewStatus } from '../services/reviews.js';

const sessionKey = 'waywewander-review-admin-session';

export default function ReviewAdmin() {
  const [session, setSession] = useState(() => JSON.parse(sessionStorage.getItem(sessionKey) || 'null'));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const loadReviews = async (accessToken = session?.access_token) => {
    if (!accessToken) return;
    try { setReviews(await getAdminReviews(accessToken)); setError(''); } catch { setError('This account is not authorized to manage reviews.'); }
  };

  useEffect(() => { loadReviews(); }, [session]);

  const signIn = async (event) => {
    event.preventDefault(); setBusy(true); setError('');
    try {
      const nextSession = await signInAdmin(email, password);
      sessionStorage.setItem(sessionKey, JSON.stringify(nextSession));
      setSession(nextSession);
    } catch { setError('Sign-in failed. Check your email and password.'); }
    finally { setBusy(false); }
  };

  const changeStatus = async (id, status) => {
    setBusy(true);
    try { await updateReviewStatus(id, status, session.access_token); await loadReviews(); } catch { setError('Could not update this review.'); }
    finally { setBusy(false); }
  };

  const removeReview = async (id) => {
    if (!window.confirm('Permanently delete this review?')) return;
    setBusy(true);
    try { await deleteReview(id, session.access_token); await loadReviews(); } catch { setError('Could not delete this review.'); }
    finally { setBusy(false); }
  };

  if (!session) return (
    <PageTransition><Seo title="Review Administration | WayWeWander" description="Review moderation." />
      <section className="section admin-page"><div className="container admin-login"><span className="eyebrow">Private area</span><h1>Review moderation</h1>
        <form className="review-form" onSubmit={signIn}><label><span>Email</span><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" /></label><label><span>Password</span><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" /></label>{error && <p className="form-message form-message--error">{error}</p>}<button className="btn btn--primary" disabled={busy}>{busy ? 'Signing in...' : 'Sign in'}</button></form>
      </div></section>
    </PageTransition>
  );

  return (
    <PageTransition><Seo title="Review Administration | WayWeWander" description="Review moderation." />
      <section className="section admin-page"><div className="container"><div className="admin-heading"><div><span className="eyebrow">Private area</span><h1>Review moderation</h1><p>Approve reviews to publish them immediately on the website.</p></div><button className="btn btn--ghost" onClick={() => { sessionStorage.removeItem(sessionKey); setSession(null); }}><FaSignOutAlt /> Sign out</button></div>{error && <p className="form-message form-message--error">{error}</p>}
        <div className="admin-review-list">{reviews.map((review) => <article className="admin-review" key={review.id}><div><strong>{review.full_name}</strong><span>{review.email} · {review.trip_name}</span><p>{review.review}</p><small>Overall: {review.overall_rating}/5 · Status: {review.status}</small></div><div className="admin-actions"><button className="icon-button" title="Approve" aria-label="Approve review" disabled={busy} onClick={() => changeStatus(review.id, 'approved')}><FaCheck /></button><button className="icon-button" title="Reject" aria-label="Reject review" disabled={busy} onClick={() => changeStatus(review.id, 'rejected')}><FaTimes /></button><button className="icon-button admin-delete" title="Delete" aria-label="Delete review" disabled={busy} onClick={() => removeReview(review.id)}><FaTrash /></button></div></article>)}</div>
      </div></section>
    </PageTransition>
  );
}
