const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");

const { getVillagesBySubdistrict } = require("../controllers/villages");
const { searchSubdistricts } = require("../controllers/subdistricts");

const RATE_LIMIT_WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000", 10);
const RATE_LIMIT_VILLAGES_MAX = parseInt(process.env.RATE_LIMIT_VILLAGES_MAX || "30", 10);

const villagesLimiter = rateLimit({
	windowMs: RATE_LIMIT_WINDOW_MS,
	max: RATE_LIMIT_VILLAGES_MAX,
	message: "Too many village requests, try later",
});

router.get("/search", searchSubdistricts);
router.get("/:subdistrictId/villages", villagesLimiter, getVillagesBySubdistrict);

module.exports = router;