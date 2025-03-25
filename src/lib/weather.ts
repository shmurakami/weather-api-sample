export async function fetchWeatherByCity(city: string) {
  const apiKey = process.env.WEATHER_API_KEY;
  if (!apiKey) {
    throw new Error("WEATHERAPI_API_KEY is not set in environment variables.");
  }
  const res = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&lang=ja`,
    // { cache: "no-store" }, // SSRでもキャッシュしないように
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch weather data for ${city}`);
  }

  return res.json();
}
