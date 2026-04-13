const villageService = require("../services/villageService");

const getVillages = async (req, res) => {
  const subdistrictCode = Number(req.query.subdistrict_code);
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;

  if (Number.isNaN(subdistrictCode)) {
    return res.status(400).json({ error: "Invalid subdistrict code" });
  }

  try {
    const payload = await villageService.getVillagesPage(subdistrictCode, page, limit);
    res.json(payload);
  } catch (error) {
    res.status(500).json({ error: "Error fetching villages" });
  }
};

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

const searchVillages = async (req, res) => {
  const name = typeof req.query.name === "string" ? req.query.name.trim() : "";

  if (!name) {
    return res.status(400).json({ error: "Search query is required" });
  }

  try {
    const villages = await villageService.searchVillagesByName(name);
    res.json(villages);
  } catch (error) {
    res.status(500).json({ error: "Error searching villages" });
  }
};

module.exports = { getVillages, getVillagesBySubdistrict, searchVillages };
