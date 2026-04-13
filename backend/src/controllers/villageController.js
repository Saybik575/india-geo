const villageService = require("../services/villageService");

const getVillagesBySubdistrict = async (req, res) => {
  const subdistrictId = Number(req.params.subdistrictId);
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 50;
  const name = typeof req.query.name === "string" ? req.query.name.trim() : "";

  if (Number.isNaN(subdistrictId)) {
    return res.status(400).json({ error: "Invalid subdistrict ID" });
  }

  try {
    const villages = await villageService.getVillagesBySubdistrictId(subdistrictId, page, limit, name);
    res.json(villages);
  } catch (error) {
    res.status(500).json({ error: "Error fetching villages" });
  }
};

module.exports = { getVillagesBySubdistrict };
