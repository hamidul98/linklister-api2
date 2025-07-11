import { setCorsHeaders } from '../lib/cors.mjs';
import { validateApiKey } from '../lib/validateApiKey.mjs';

export default async function handler(req, res) {
  setCorsHeaders(res);
  console.log('📥 Request to new-endpoint:', req.method, req.url);

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Method not allowed' });

  const { someField, apiKey } = req.body || {};
  if (!someField || !apiKey)
    return res.status(400).json({ error: 'Missing required fields' });

  if (!validateApiKey(apiKey))
    return res.status(401).json({ error: 'Invalid API key' });

  // Your custom logic here...
  return res.status(200).json({ message: 'Success!' });
}
