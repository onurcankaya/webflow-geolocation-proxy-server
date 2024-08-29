import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

export async function handler(event) {
  const ip =
    event.headers["x-forwarded-for"] || event.headers["cf-connecting-ip"];

  if (!ip) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "IP address not found" }),
    };
  }

  console.log("ip", ip);

  const apiKey = process.env.IPAPI_API_KEY;
  const url = `https://api.ipapi.com/api/${ip}?access_key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("data", data);
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch location data" }),
    };
  }
}
