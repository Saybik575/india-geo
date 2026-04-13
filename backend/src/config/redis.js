const { createClient } = require("redis");

const normalizeUrl = (value) => {
  if (!value) {
    return "";
  }

  return value.trim().replace(/^['\"]|['\"]$/g, "");
};

const redisUrl = normalizeUrl(process.env.REDIS_URL);

if (!redisUrl) {
  console.warn("REDIS_URL is not set. Caching is disabled.");

  module.exports = {
    get: async () => null,
    set: async () => null,
    on: () => {},
  };
} else {
  const redisClient = createClient({
    url: redisUrl,
  });

  redisClient.on("error", (err) => console.error("Redis Error", err));

  (async () => {
    await redisClient.connect();
  })();

  module.exports = redisClient;
}