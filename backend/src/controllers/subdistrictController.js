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

module.exports = { getSubdistrictsByDistrict };
