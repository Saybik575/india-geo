const VALID_API_KEYS = [process.env.API_KEY].filter(Boolean);

const apiKeyAuth = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || !VALID_API_KEYS.includes(apiKey)) {
    return res.status(403).json({ error: "Forbidden: Invalid API Key" });
  }

  return next();
};

module.exports = apiKeyAuth;
