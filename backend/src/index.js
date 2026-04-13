require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");

const stateRoutes = require("./routes/stateRoutes");
const districtRoutes = require("./routes/districtRoutes");
const subdistrictRoutes = require("./routes/subdistrictRoutes");
const { searchDistricts } = require("./controllers/districtController");
const { searchSubdistricts } = require("./controllers/subdistrictController");
const { getVillages, searchVillages } = require("./controllers/villageController");
const apiKeyAuth = require("./middleware/apiKeyAuth");
const swaggerSpec = require("./config/swagger");

const app = express();

app.use(cors({
  origin: "*"
}));
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/states", apiKeyAuth, stateRoutes);
app.use("/api/states", apiKeyAuth, stateRoutes);

app.use("/districts", apiKeyAuth, districtRoutes);
app.use("/api/districts", apiKeyAuth, districtRoutes);

app.use("/subdistricts", apiKeyAuth, subdistrictRoutes);
app.use("/api/subdistricts", apiKeyAuth, subdistrictRoutes);
app.get("/api/districts/search", apiKeyAuth, searchDistricts);
app.get("/api/subdistricts/search", apiKeyAuth, searchSubdistricts);
app.get("/api/villages", apiKeyAuth, getVillages);
app.get("/api/villages/search", apiKeyAuth, searchVillages);

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});