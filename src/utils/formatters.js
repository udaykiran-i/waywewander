export function formatPrice(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
}

export function normalize(value) {
  return value.toString().trim().toLowerCase();
}

export function tripMatches(trip, { query = '', category = '', budget = '' }) {
  const search = normalize(query);
  const matchesSearch =
    !search ||
    [trip.title, trip.location, trip.shortDescription, ...trip.highlights, ...trip.categories]
      .map(normalize)
      .some((value) => value.includes(search));

  const matchesCategory = !category || trip.categories.includes(category);

  const matchesBudget =
    !budget ||
    (budget === 'under-40000' && trip.price < 40000) ||
    (budget === '40000-75000' && trip.price >= 40000 && trip.price <= 75000) ||
    (budget === 'above-75000' && trip.price > 75000);

  return matchesSearch && matchesCategory && matchesBudget;
}

export function encodeFormData(data) {
  const payload = new URLSearchParams();

  Object.entries(data).forEach(([key, value]) => {
    payload.append(key, value);
  });

  return payload.toString();
}
