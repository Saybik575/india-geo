const villageService = require("../services/villageService");
const { successResponse, errorResponse } = require("../utils/response");

const getVillages = async (req, res, next) => {
  const subdistrictCode = Number(req.query.subdistrict_code);
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;

  if (Number.isNaN(subdistrictCode)) {
    return errorResponse(res, "Invalid subdistrict code", 400);
  }

  try {
    const payload = await villageService.getVillagesPage(subdistrictCode, page, limit);
    return successResponse(res, payload.data, {
      total: payload.total,
      page: payload.page,
      totalPages: payload.totalPages,
    });
  } catch (error) {
    return next(error);
  }
};

const getVillagesBySubdistrict = async (req, res, next) => {
  const subdistrictId = Number(req.params.subdistrictId);
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 50;
  const name = typeof req.query.name === "string" ? req.query.name.trim() : "";

  if (Number.isNaN(subdistrictId)) {
    return errorResponse(res, "Invalid subdistrict ID", 400);
  }

  try {
    const villages = await villageService.getVillagesBySubdistrictId(subdistrictId, page, limit, name);
    return successResponse(res, villages);
  } catch (error) {
    return next(error);
  }
};

const searchVillages = async (req, res, next) => {
  const name = typeof req.query.name === "string" ? req.query.name.trim() : "";

  if (!name) {
    return errorResponse(res, "Search query is required", 400);
  }

  try {
    const villages = await villageService.searchVillagesByName(name);
    return successResponse(res, villages);
  } catch (error) {
    return next(error);
  }
};

module.exports = { getVillages, getVillagesBySubdistrict, searchVillages };