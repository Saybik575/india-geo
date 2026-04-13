const districtService = require("../services/districtService");
const { successResponse, errorResponse } = require("../utils/response");

const getDistrictsByState = async (req, res, next) => {
  const stateId = Number(req.params.stateId);
  const name = typeof req.query.name === "string" ? req.query.name.trim() : "";

  if (Number.isNaN(stateId)) {
    return errorResponse(res, "Invalid state ID", 400);
  }

  try {
    const districts = await districtService.getDistrictsByStateId(stateId, name);
    return successResponse(res, districts);
  } catch (error) {
    return next(error);
  }
};

const searchDistricts = async (req, res, next) => {
  const name = typeof req.query.name === "string" ? req.query.name.trim() : "";

  if (!name) {
    return errorResponse(res, "Search query is required", 400);
  }

  try {
    const districts = await districtService.searchDistrictsByName(name);
    return successResponse(res, districts);
  } catch (error) {
    return next(error);
  }
};

module.exports = { getDistrictsByState, searchDistricts };