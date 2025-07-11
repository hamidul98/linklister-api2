// api/pantabilaikhabemas.mjs

import { setCorsHeaders } from '../lib/cors.mjs';
import { validateApiKey } from '../lib/validateApiKey.mjs';

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // CORS preflight
  }

  if (req.method !== 'POST') {
    console.warn('❌ Invalid method used:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { rice, dal, apiKey } = req.body || {};

  if (!rice || !dal || !apiKey) {
    return res.status(400).json({ error: 'Missing required fields (rice, dal, apiKey)' });
  }

  if (!validateApiKey(apiKey)) {
    return res.status(401).json({ error: 'Invalid API key' });
  }

  // ✅ Your custom logic here
  console.log("🥣 Pantabilaikhabemas received:", { rice, dal });

  return res.status(200).json({
    message: 'Pantabilaikhabemas served!',
    items: {
      rice,
      dal
    }
  });
}
