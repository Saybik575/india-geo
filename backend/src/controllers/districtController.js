const districtService = require("../services/districtService");

const getDistrictsByState = async (req, res) => {
  const stateId = Number(req.params.stateId);
  const name = typeof req.query.name === "string" ? req.query.name.trim() : "";

  if (Number.isNaN(stateId)) {
    return res.status(400).json({ error: "Invalid state ID" });
  }

  try {
    const districts = await districtService.getDistrictsByStateId(stateId, name);
    res.json(districts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching districts" });
  }
};

const searchDistricts = async (req, res) => {
  const name = typeof req.query.name === "string" ? req.query.name.trim() : "";

  if (!name) {
    return res.status(400).json({ error: "Search query is required" });
  }

  try {
    const districts = await districtService.searchDistrictsByName(name);
    res.json(districts);
  } catch (error) {
    res.status(500).json({ error: "Error searching districts" });
  }
};

module.exports = { getDistrictsByState, searchDistricts };
