require("dotenv").config();
require("./utils/database");

const express = require("express");
const userRoute = require("./modules/citizen/citizenRoute");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/recycling", recyclingCenterRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
