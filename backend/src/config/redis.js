const { createClient } = require("redis");

if (!process.env.REDIS_URL) {
  console.warn("REDIS_URL is not set. Caching is disabled.");

  module.exports = {
    get: async () => null,
    set: async () => null,
    on: () => {},
  };
} else {
  const redisClient = createClient({
    url: process.env.REDIS_URL,
  });

  redisClient.on("error", (err) => console.error("Redis Error", err));

  (async () => {
    await redisClient.connect();
  })();

  module.exports = redisClient;
}