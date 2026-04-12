const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

if (!process.env.JWT_SECRET) {
  console.error(
    "FATAL: JWT_SECRET is not set. Add JWT_SECRET to server/.env, or unset a blank JWT_SECRET in your system/shell environment (dotenv will not override an existing variable)."
  );
  process.exit(1);
}

require("./utils/database");

const app = require("./app");
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
