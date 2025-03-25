import { NextRequest } from "next/server";
import { fetchWeatherByCity } from "../../../lib/weather";

export async function GET(req: NextRequest) {
  const city = req.nextUrl.searchParams.get("city");
  if (!city) {
    return new Response(JSON.stringify({ error: "City is required" }), { status: 400 });
  }

  try {
    const data = await fetchWeatherByCity(city);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
  }
}
