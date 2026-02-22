require("dotenv").config();
require("./utils/database");

const express = require("express");
const eventRoute = require("./modules/events/eventRoute");
const issueRoute = require("./modules/issues/issueRoute");
const citizenRoute = require("./modules/citizen/citizenRoute");
const organizationRoute = require("./modules/organization/organizationRoute");
const errorHandler = require("./middlewares/errorHandler");
const userRoute = require("./modules/user/user.route");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/citizens", citizenRoute);
app.use("/api/organizations", organizationRoute);

app.use("/api/users", userRoute);
app.use("/api/events", eventRoute);
app.use("/api/issues", issueRoute);


app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
