import fs from 'node:fs/promises';

const tripsPath = new URL('../src/data/trips.json', import.meta.url);
const trips = JSON.parse(await fs.readFile(tripsPath, 'utf8'));
const placeAliases = {
  Alleppey: 'Alappuzha Kerala',
  Thekkady: 'Periyar Kerala',
  Coorg: 'Kodagu Karnataka',
  Mysuru: 'Mysore Karnataka',
  Bengaluru: 'Bangalore Karnataka',
  Cherrapunji: 'Sohra Meghalaya',
  Kodaikanal: 'Kodaikanal Tamil Nadu',
};

function cleanQuery(value) {
  return value.replace(/[^\p{L}\p{N}\s,]/gu, ' ').replace(/\s+/g, ' ').trim();
}

async function commonsImage(query, offset) {
  await new Promise((resolve) => setTimeout(resolve, 1100));
  const params = new URLSearchParams({
    action: 'query',
    generator: 'search',
    gsrsearch: query,
    gsrnamespace: '6',
    gsrlimit: '1',
    gsroffset: String(offset),
    prop: 'imageinfo',
    iiprop: 'url|mime',
    iiurlwidth: '1400',
    format: 'json',
    origin: '*',
  });
  const response = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`);
  if (!response.ok) return null;
  const payload = await response.json();
  const page = Object.values(payload.query?.pages ?? {})[0];
  const info = page?.imageinfo?.[0];
  if (!info || !info.url || /\.svg(?:$|[?])/i.test(info.url)) return null;
  return info.thumburl ?? info.url;
}

async function uniqueImage(query) {
  return (await commonsImage(cleanQuery(query), 0))
    ?? 'https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg?auto=compress&cs=tinysrgb&w=1400';
}

for (const trip of trips) {
  const locations = trip.location
    .split(/(?:â€¢|•)/)
    .map(cleanQuery)
    .filter(Boolean);
  const location = locations.join(' ');
  for (const day of trip.itinerary) {
    const place = locations[Math.min(day.day - 1, locations.length - 1)] ?? location;
    const image = await uniqueImage(`${placeAliases[place] ?? place} India`);
    if (!image) throw new Error(`No image found for ${trip.id}, day ${day.day}`);
    day.image = image;
  }

  trip.gallery = trip.itinerary.slice(0, 3).map((day) => day.image);
}

await fs.writeFile(tripsPath, `${JSON.stringify(trips, null, 2)}\n`, 'utf8');
console.log(`Refreshed ${trips.length} trip heroes and ${trips.reduce((sum, trip) => sum + trip.itinerary.length, 0)} itinerary images.`);
