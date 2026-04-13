const express = require("express");

const stateRoutes = require("./states");
const districtRoutes = require("./districts");
const subdistrictRoutes = require("./subdistricts");
const villageRoutes = require("./villages");

const router = express.Router();

router.use("/states", stateRoutes);
router.use("/districts", districtRoutes);
router.use("/subdistricts", subdistrictRoutes);
router.use("/villages", villageRoutes);

module.exports = router;