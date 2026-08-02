# WayWeWander

Premium, responsive React travel website built with Vite, React Router, Framer Motion, AOS, Swiper, and Netlify Forms.

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Commented Code for Future Use

The following sections are currently commented out and can be uncommented when you are ready to add custom itineraries:

### 1. `src/pages/Trips.jsx`
- Lines 5-6: `TripCard` and `trips` imports
- Lines 22-25: `filteredTrips` useMemo (kept active but rendering is commented)
- Lines 102-113: Trip grid rendering and empty state — replaced with "We are working on it, let's travel soon !!" placeholder

### 2. `src/pages/Home.jsx`
- Lines 6-7: `TripCard` and `trips` imports
- Line 18: `featuredTrips` constant
- Lines 60-78: Featured trips section (trip grid + View All Trips button) — replaced with placeholder

### 3. `src/components/layout/Footer.jsx`
- Line 3: `trips` import
- Line 8: `popularTrips` constant
- Lines 54-60: Popular Trips links in footer — replaced with placeholder text

### 4. `src/pages/Home.jsx` (stats section)
- Lines 49-58: Travel stats grid (120+ Curated journeys, 8.5K+ Happy travelers, 4.9 Average rating, 60+ Expert partners) — commented out until real stats are available

### 5. `src/pages/About.jsx` (stats section)
- Lines 61-70: Travel stats grid in About page — commented out until real stats are available

### 6. `src/pages/Home.jsx` (testimonials section)
- Lines 116-130: Testimonials section (Trusted by travelers who care about details) — commented out until real testimonials are available

### How to Restore Trips
1. Uncomment the imports and JSX sections listed above
2. Add/edit trip data in `src/data/trips.json`
3. Ensure each trip has a unique `slug` and `id`
4. The `TripDetails` page at `src/pages/TripDetails.jsx` is already set up to render individual trip pages

Trip content is managed in `src/data/trips.json`. Add or edit trips there to update catalogue cards and dynamic itinerary pages without changing component code.

## Adding Trips

Add new trips in `src/data/trips.json`. The file is a JSON array, so each trip is one object inside the outer `[]`.

Important rules:

- Keep every `slug` unique. It becomes the trip URL, for example `/trip/ladakh-expedition`.
- Keep `id` unique too. A good pattern is `trip-your-slug`.
- `price` must be a number, not a string.
- `categories` should use the existing filter names: `Adventure`, `International`, `Domestic`, `Family`, `Honeymoon`, `Weekend`, `Luxury`.
- `heroImage`, `gallery`, and each itinerary `image` should be valid image URLs or public asset paths.
- Do not remove fields unless the React code is updated to handle missing values.

Use this pattern:

```json
{
  "id": "trip-your-trip-slug",
  "slug": "your-trip-slug",
  "title": "Your Trip Name",
  "location": "Primary Destination",
  "categories": ["Domestic", "Adventure"],
  "price": 45900,
  "duration": "6 Days / 5 Nights",
  "travelDates": ["12 Sep 2026", "26 Sep 2026"],
  "seatsLeft": 8,
  "rating": 4.9,
  "reviewsCount": 100,
  "shortDescription": "One polished sentence for the trip card.",
  "heroImage": "https://example.com/hero-image.jpg",
  "gallery": [
    "https://example.com/gallery-1.jpg",
    "https://example.com/gallery-2.jpg",
    "https://example.com/gallery-3.jpg"
  ],
  "highlights": ["Highlight one", "Highlight two", "Highlight three"],
  "overview": "A premium overview paragraph for the trip details page.",
  "pickupLocation": "Airport or pickup point",
  "accommodation": "Stay type",
  "transportation": "Transport type",
  "meals": "Meal plan",
  "difficulty": "Easy",
  "altitude": "Sea level",
  "weather": "Expected weather",
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival and check-in",
      "morning": "Morning plan.",
      "afternoon": "Afternoon plan.",
      "evening": "Evening plan.",
      "hotel": "Hotel or stay name/type",
      "mealsIncluded": "Dinner",
      "image": "https://example.com/day-1.jpg"
    }
  ],
  "inclusions": ["Inclusion one", "Inclusion two"],
  "exclusions": ["Exclusion one", "Exclusion two"],
  "packingList": ["Item one", "Item two"],
  "faq": [
    {
      "question": "Question?",
      "answer": "Answer."
    }
  ],
  "reviews": [
    {
      "name": "Traveler Name",
      "location": "City",
      "rating": 5,
      "text": "Short review."
    }
  ]
}
```

Prompt to use with ChatGPT:

```text
Create one production-ready trip JSON object for my React travel website WayWeWander.

Return only valid JSON for a single object, no markdown and no explanation.

Use exactly these fields:
id, slug, title, location, categories, price, duration, travelDates, seatsLeft, rating, reviewsCount, shortDescription, heroImage, gallery, highlights, overview, pickupLocation, accommodation, transportation, meals, difficulty, altitude, weather, itinerary, inclusions, exclusions, packingList, faq, reviews.

Rules:
- id must be "trip-" plus the slug.
- slug must be lowercase words joined by hyphens.
- price must be a number in INR.
- categories must only use these values when relevant: Adventure, International, Domestic, Family, Honeymoon, Weekend, Luxury.
- itinerary must include one object per day with: day, title, morning, afternoon, evening, hotel, mealsIncluded, image.
- gallery must include 3 image URLs.
- highlights should include 4 concise items.
- faq should include 2-4 questions.
- reviews should include 1-3 realistic reviews.
- Write polished premium travel copy, not placeholder text.

Trip details:
[Paste destination, days, price, dates, inclusions, exclusions, hotels, transport, meals, itinerary notes, pickup point, difficulty, weather, and any special requirements here.]
```
