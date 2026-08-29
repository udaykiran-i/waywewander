const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const configured = Boolean(supabaseUrl && publishableKey);

function headers(accessToken, extra = {}) {
  return {
    apikey: publishableKey,
    Authorization: `Bearer ${accessToken || publishableKey}`,
    ...extra,
  };
}

async function request(path, options = {}, accessToken) {
  if (!configured) throw new Error('Review service is not configured.');
  const response = await fetch(`${supabaseUrl}${path}`, {
    ...options,
    headers: headers(accessToken, options.headers),
  });
  if (!response.ok) throw new Error('Review request failed.');
  if (response.status === 204 || !response.headers.get('content-type')?.includes('application/json')) return null;
  return response.json();
}

export async function getPublishedReviews() {
  return request('/rest/v1/published_reviews?select=*&order=overall_rating.desc,published_at.desc');
}

export async function submitReview(form) {
  return request('/rest/v1/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Prefer: 'return=minimal' },
    body: JSON.stringify({
      full_name: form.fullName.trim(),
      email: form.email.trim(),
      trip_name: form.tripName.trim(),
      travel_month: form.travelMonth ? `${form.travelMonth}-01` : null,
      trip_planning: Number(form.tripPlanning),
      driver_transport: Number(form.driverTransport),
      stays_rooms: Number(form.staysRooms),
      value_for_money: Number(form.valueForMoney),
      overall_rating: Number(form.overallRating),
      review: form.review.trim(),
      consent: form.consent,
    }),
  });
}

export async function signInAdmin(email, password) {
  return request('/auth/v1/token?grant_type=password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
}

export async function getAdminReviews(accessToken) {
  return request('/rest/v1/reviews?select=*&order=created_at.desc', {}, accessToken);
}

export async function updateReviewStatus(id, status, accessToken) {
  return request(`/rest/v1/reviews?id=eq.${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Prefer: 'return=minimal' },
    body: JSON.stringify({ status, published_at: status === 'approved' ? new Date().toISOString() : null }),
  }, accessToken);
}

export async function deleteReview(id, accessToken) {
  return request(`/rest/v1/reviews?id=eq.${id}`, {
    method: 'DELETE',
    headers: { Prefer: 'return=minimal' },
  }, accessToken);
}

export { configured as reviewsConfigured };
