const GOOGLE_FIND_PLACE_URL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json";
const GOOGLE_PLACE_DETAILS_URL = "https://maps.googleapis.com/maps/api/place/details/json";

const safeString = (value) => (typeof value === "string" ? value : "");

const fetchJson = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Google API request failed: ${response.status}`);
  }

  return response.json();
};

const resolvePlaceId = async (apiKey) => {
  const fixedPlaceId = process.env.GOOGLE_PLACE_ID;

  if (fixedPlaceId) {
    return fixedPlaceId;
  }

  const query = process.env.GOOGLE_PLACE_QUERY || "star fire sao jose dos campos";
  const params = new URLSearchParams({
    input: query,
    inputtype: "textquery",
    fields: "place_id,name,rating,user_ratings_total",
    language: "pt-BR",
    key: apiKey,
  });

  const data = await fetchJson(`${GOOGLE_FIND_PLACE_URL}?${params.toString()}`);

  if (data.status !== "OK" || !Array.isArray(data.candidates) || data.candidates.length === 0) {
    throw new Error(`Unable to resolve place id. Status: ${data.status || "unknown"}`);
  }

  return data.candidates[0].place_id;
};

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return res.status(503).json({ ok: false, error: "GOOGLE_PLACES_API_KEY not configured" });
  }

  try {
    const placeId = await resolvePlaceId(apiKey);

    const detailParams = new URLSearchParams({
      place_id: placeId,
      fields: "name,rating,user_ratings_total,reviews,url",
      language: "pt-BR",
      reviews_no_translations: "true",
      key: apiKey,
    });

    const details = await fetchJson(`${GOOGLE_PLACE_DETAILS_URL}?${detailParams.toString()}`);

    if (details.status !== "OK" || !details.result) {
      throw new Error(`Place details not available. Status: ${details.status || "unknown"}`);
    }

    const reviews = (details.result.reviews || []).slice(0, 6).map((review) => ({
      author_name: safeString(review.author_name),
      rating: Number(review.rating || 0),
      relative_time_description: safeString(review.relative_time_description),
      text: safeString(review.text),
      profile_photo_url: safeString(review.profile_photo_url),
      author_url: safeString(review.author_url),
    }));

    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");

    return res.status(200).json({
      ok: true,
      source: "google_places_api",
      place_id: placeId,
      place_name: safeString(details.result.name),
      place_url: safeString(details.result.url),
      rating: Number(details.result.rating || 0),
      user_ratings_total: Number(details.result.user_ratings_total || 0),
      reviews,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
