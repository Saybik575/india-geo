const prisma = require("../prisma/client");
const redisClient = require("../config/redis");

const getAllStates = async (name) => {
  const cacheKey = name ? `states:${name}` : "states";

  // 1. Check cache
  const cachedData = await redisClient.get(cacheKey);

  if (cachedData) {
    console.log("Cache HIT");
    return JSON.parse(cachedData);
  }

  // 2. Fetch from DB
  console.log("Cache MISS");
  const where = name
    ? {
        state_name: {
          contains: name,
          mode: "insensitive",
        },
      }
    : undefined;

  const states = await prisma.states.findMany({
    where,
    select: {
      state_code: true,
      state_name: true,
    },
    orderBy: {
      state_name: "asc",
    },
  });

  // 3. Store in cache (TTL = 1 hour)
  await redisClient.set(cacheKey, JSON.stringify(states), {
    EX: 3600,
  });

  return states;
};

module.exports = { getAllStates };