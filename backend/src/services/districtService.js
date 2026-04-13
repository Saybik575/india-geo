const prisma = require("../prisma/client");
const redisClient = require("../config/redis");

const getDistrictsByStateId = async (stateId, name) => {
  const cacheKey = name ? `districts:${stateId}:${name}` : `districts:${stateId}`;

  // 1. Check cache
  const cachedData = await redisClient.get(cacheKey);
  if (cachedData) {
    console.log("Cache HIT - districts");
    return JSON.parse(cachedData);
  }

  // 2. Fetch from DB
  console.log("Cache MISS - districts");
  const where = {
    state_code: stateId,
    ...(name
      ? {
          district_name: {
            contains: name,
            mode: "insensitive",
          },
        }
      : {}),
  };

  const districts = await prisma.districts.findMany({
    where,
    select: {
      district_code: true,
      district_name: true,
    },
    orderBy: { district_name: "asc" },
  });

  // 3. Store in cache (TTL = 1 hour)
  await redisClient.set(cacheKey, JSON.stringify(districts), {
    EX: 3600,
  });

  return districts;
};

module.exports = { getDistrictsByStateId };
