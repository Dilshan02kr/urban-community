require("dotenv").config();
require("./utils/database");

const express = require("express");
const userRoute = require("./modules/users/userRoute");
const eventRoute = require("./modules/events/eventRoute");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/events", eventRoute);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
