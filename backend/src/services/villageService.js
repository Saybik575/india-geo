const prisma = require("../prisma/client");
const redisClient = require("../config/redis");

const getVillagesBySubdistrictId = async (subdistrictId, page, limit, name) => {
  const cacheKey = name 
    ? `villages:${subdistrictId}:${name}:p${page}:l${limit}` 
    : `villages:${subdistrictId}:p${page}:l${limit}`;

  // 1. Check cache
  const cachedData = await redisClient.get(cacheKey);
  if (cachedData) {
    console.log("Cache HIT - villages");
    return JSON.parse(cachedData);
  }

  // 2. Fetch from DB
  console.log("Cache MISS - villages");
  const where = {
    subdistrict_code: subdistrictId,
    ...(name
      ? {
          village_name: {
            contains: name,
            mode: "insensitive",
          },
        }
      : {}),
  };

  const villages = await prisma.villages.findMany({
    where,
    select: {
      village_code: true,
      village_name: true,
    },
    orderBy: { village_name: "asc" },
    skip: (page - 1) * limit,
    take: limit,
  });

  // 3. Store in cache (TTL = 1 hour)
  await redisClient.set(cacheKey, JSON.stringify(villages), {
    EX: 3600,
  });

  return villages;
};

module.exports = { getVillagesBySubdistrictId };
