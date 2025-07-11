import { validateApiKey } from '../lib/validateApiKey.mjs';
import { setCorsHeaders } from '../lib/cors.mjs';

export default async function handler(req, res) {
  console.log("METHOD:", req.method);
  console.log("PATH:", req.url);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    console.warn("Invalid method:", req.method);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { site_url, pages, api_key } = req.body;

  if (!site_url || !pages || !api_key) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  return res.status(200).json({ message: "Data received successfully" });
} 