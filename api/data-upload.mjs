export default async function handler(req, res) {
  console.log(`Incoming request: ${req.method} ${req.url}`);

  // Handle CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    console.warn(`Method not allowed: ${req.method}`);
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // ✅ Extract all expected fields from body
    const { name, email, apiKey, pages, internalLinks, brokenLinks } = req.body;

    // ✅ Validate required fields
    if (!name || !email || !apiKey || pages == null || internalLinks == null || brokenLinks == null) {
      return res.status(400).json({ error: "Missing required fields (name, email, apiKey, pages, internalLinks, brokenLinks)" });
    }

    // ✅ Valid API keys
    const validKeys = [
      "ll_trial_user_api_key_x123",
      "ll_premium_user_api_key_abc456",
      "ll_dev_api_key_testing_mode_789xyz",
      "ll_admin_api_key_secure_admin_001",
      "ll_backup_api_key_fallback_def321"
    ];

    if (!validKeys.includes(apiKey)) {
      return res.status(401).json({ error: "Invalid API key" });
    }

    // ✅ Log everything
    console.log("✅ Data received:", { name, email, pages, internalLinks, brokenLinks });

    // ✅ Respond with all the data
    return res.status(200).json({
      message: "Data uploaded successfully",
      data: { name, email, pages, internalLinks, brokenLinks }
    });

  } catch (error) {
    console.error("❌ Server error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
