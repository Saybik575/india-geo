const stateService = require("../services/stateService");
const { successResponse, errorResponse } = require("../utils/response");

const getStates = async (req, res, next) => {
  const name = typeof req.query.name === "string" ? req.query.name.trim() : "";

  try {
    const states = await stateService.getAllStates(name);
    return successResponse(res, states);
  } catch (error) {
    return next(error);
  }
};

const getStateVillageCounts = async (req, res, next) => {
  const limit = Number(req.query.limit) || 10;

  if (!Number.isFinite(limit) || limit < 1) {
    return errorResponse(res, "Invalid limit", 400);
  }

  try {
    const counts = await stateService.getStateVillageCounts(limit);
    return successResponse(res, counts, { limit: Math.min(limit, 50) });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getStates, getStateVillageCounts };