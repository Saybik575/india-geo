const subdistrictService = require("../services/subdistrictService");

const getSubdistrictsByDistrict = async (req, res) => {
  const districtId = Number(req.params.districtId);
  const name = typeof req.query.name === "string" ? req.query.name.trim() : "";

  if (Number.isNaN(districtId)) {
    return res.status(400).json({ error: "Invalid district ID" });
  }

  try {
    const subdistricts = await subdistrictService.getSubdistrictsByDistrictId(districtId, name);
    res.json(subdistricts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching subdistricts" });
  }
};

const searchSubdistricts = async (req, res) => {
  const name = typeof req.query.name === "string" ? req.query.name.trim() : "";

  if (!name) {
    return res.status(400).json({ error: "Search query is required" });
  }

  try {
    const subdistricts = await subdistrictService.searchSubdistrictsByName(name);
    res.json(subdistricts);
  } catch (error) {
    res.status(500).json({ error: "Error searching subdistricts" });
  }
};

module.exports = { getSubdistrictsByDistrict, searchSubdistricts };
