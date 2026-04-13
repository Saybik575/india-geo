const stateService = require("../services/stateService");

const getStates = async (req, res) => {
  const name = typeof req.query.name === "string" ? req.query.name.trim() : "";

  try {
    const states = await stateService.getAllStates(name);
    res.json(states);
  } catch (error) {
    res.status(500).json({ error: "Error fetching states" });
  }
};

module.exports = { getStates };