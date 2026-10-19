
import axios from "axios";
import supabase from "../config/supabase.js";

const WEATHER_API = "https://api.open-meteo.com/v1/forecast";

export const ingestWeather = async ({
  locationName,
  latitude,
  longitude,
}) => {
  if (!locationName || !Number.isFinite(latitude) ||
      !Number.isFinite(longitude)) {
    throw new Error("Valid location name, latitude, and longitude are required");
  }

  const response = await axios.get(WEATHER_API, {
    params: {
      latitude,
      longitude,
      hourly: "temperature_2m,relative_humidity_2m,precipitation,rain",
      past_days: 1,
      forecast_days: 1,
      timezone: "UTC",
    },
    timeout: 15000,
  });

  const hourly = response.data.hourly;

  if (!hourly?.time?.length) {
    throw new Error("Weather API returned no hourly observations");
  }

  // Store the latest available hourly record.
  const index = hourly.time.length - 1;

  const observation = {
    source: "open-meteo",
    location_name: locationName,
    latitude,
    longitude,
    observed_at: new Date(hourly.time[index] + ":00Z").toISOString(),
    temperature_c: hourly.temperature_2m?.[index] ?? null,
    relative_humidity: hourly.relative_humidity_2m?.[index] ?? null,
    precipitation_mm: hourly.precipitation?.[index] ?? null,
    rain_mm: hourly.rain?.[index] ?? null,
  };

  const { data, error } = await supabase
    .from("weather_observations")
    .upsert(observation, {
      onConflict: "source,latitude,longitude,observed_at",
    })
    .select()
    .single();

  if (error) throw error;

  return data;
};
