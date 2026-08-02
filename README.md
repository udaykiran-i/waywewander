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

The following sections are currently commented out and can be uncommented when you are ready:

### 1. `src/pages/Home.jsx` (stats section)
- Lines 49-58: Travel stats grid (120+ Curated journeys, 8.5K+ Happy travelers, 4.9 Average rating, 60+ Expert partners) — commented out until real stats are available

### 2. `src/pages/About.jsx` (stats section)
- Lines 61-70: Travel stats grid in About page — commented out until real stats are available

### 3. `src/pages/Home.jsx` (testimonials section)
- Lines 116-130: Testimonials section (Trusted by travelers who care about details) — commented out until real testimonials are available

### 4. Newsletter (removed)
- `src/components/forms/NewsletterForm.jsx` — removed
- `src/components/layout/Footer.jsx` — newsletter form removed from footer contact section
- `index.html` — hidden newsletter form removed
- `src/styles/global.css` — newsletter CSS removed

## Active Trip Sections

The following trip sections are currently active and displaying content:

### 1. `src/pages/Trips.jsx`
- Trip grid is active, showing all itineraries from `src/data/trips.json`
- Budget filter removed — only search and category filters remain

### 2. `src/pages/Home.jsx`
- Featured trips section is active, showing first 4 trips from `src/data/trips.json`

### 3. `src/components/layout/Footer.jsx`
- Popular Trips section is active, showing first 6 trips from `src/data/trips.json`

## Current Trips

The following trips are currently active in `src/data/trips.json`:

1. **Kerala Highlands & Backwaters Escape** (`kerala-highlands-backwaters`) — 5 Days / 4 Nights
2. **Kerala Weekend Escape** (`kerala-weekend-escape`) — 4 Days / 3 Nights
3. **Gokarna & Dandeli Adventure Escape** (`gokarna-dandeli-adventure`) — 3 Days / 2 Nights
4. **Coorg & Chikmagalur Explorer** (`coorg-chikmagalur-explorer`) — 3 Days / 2 Nights
5. **Coorg Weekend Escape** (`coorg-weekend-escape`) — 2 Days / 1 Night
6. **Ooty Weekend Escape** (`ooty-weekend-escape`) — 2 Days / 1 Night
7. **Ooty Explorer** (`ooty-explorer`) — 3 Days / 2 Nights
8. **Ooty & Coonoor Escape** (`ooty-coonoor-escape`) — 3 Days / 2 Nights
9. **Kodaikanal Weekend Escape** (`kodaikanal-weekend`) — 3 Days / 2 Nights
10. **Coimbatore & Ooty Delight** (`coimbatore-ooty`) — 3 Days / 2 Nights
11. **Coimbatore & Kodaikanal Retreat** (`coimbatore-kodaikanal`) — 4 Days / 3 Nights
12. **Ooty & Kodaikanal Grand Escape** (`ooty-kodaikanal`) — 4 Days / 3 Nights
13. **Complete Tamil Nadu Hills Expedition** (`complete-tamil-nadu-hills`) — 5 Days / 4 Nights

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
