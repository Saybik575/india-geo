const prisma = require("../prisma/client");
const redisClient = require("../config/redis");

const getSubdistrictsByDistrictId = async (districtId, name) => {
  const cacheKey = name ? `subdistricts:${districtId}:${name}` : `subdistricts:${districtId}`;

  // 1. Check cache
  const cachedData = await redisClient.get(cacheKey);
  if (cachedData) {
    console.log("Cache HIT - subdistricts");
    return JSON.parse(cachedData);
  }

  // 2. Fetch from DB
  console.log("Cache MISS - subdistricts");
  const where = {
    district_code: districtId,
    ...(name
      ? {
          subdistrict_name: {
            contains: name,
            mode: "insensitive",
          },
        }
      : {}),
  };

  const subdistricts = await prisma.subdistricts.findMany({
    where,
    select: {
      subdistrict_code: true,
      subdistrict_name: true,
    },
    orderBy: { subdistrict_name: "asc" },
  });

  // 3. Store in cache (TTL = 1 hour)
  await redisClient.set(cacheKey, JSON.stringify(subdistricts), {
    EX: 3600,
  });

  return subdistricts;
};

module.exports = { getSubdistrictsByDistrictId };
