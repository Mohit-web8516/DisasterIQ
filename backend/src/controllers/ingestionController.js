import { ingestWeather } from "../services/weatherService.js";

export const ingestWeatherData = async (req, res) => {
  try {
    const {
      location_name,
      latitude,
      longitude,
    } = req.body;

    const data = await ingestWeather({
      locationName: location_name,
      latitude: Number(latitude),
      longitude: Number(longitude),
    });

    res.status(200).json({
      success: true,
      message: "Weather data ingested successfully",
      data,
    });
  } catch (error) {
    console.error("Weather ingestion error:", error.message);

    res.status(500).json({
      success: false,
      message: "Weather ingestion failed",
      error: error.message,
    });
  }
};