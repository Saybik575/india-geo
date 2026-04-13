const subdistrictService = require("../services/subdistrictService");
const { successResponse, errorResponse } = require("../utils/response");

const getSubdistrictsByDistrict = async (req, res, next) => {
  const districtId = Number(req.params.districtId);
  const name = typeof req.query.name === "string" ? req.query.name.trim() : "";

  if (Number.isNaN(districtId)) {
    return errorResponse(res, "Invalid district ID", 400);
  }

  try {
    const subdistricts = await subdistrictService.getSubdistrictsByDistrictId(districtId, name);
    return successResponse(res, subdistricts);
  } catch (error) {
    return next(error);
  }
};

const searchSubdistricts = async (req, res, next) => {
  const name = typeof req.query.name === "string" ? req.query.name.trim() : "";

  if (!name) {
    return errorResponse(res, "Search query is required", 400);
  }

  try {
    const subdistricts = await subdistrictService.searchSubdistrictsByName(name);
    return successResponse(res, subdistricts);
  } catch (error) {
    return next(error);
  }
};

module.exports = { getSubdistrictsByDistrict, searchSubdistricts };