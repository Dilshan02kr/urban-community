const { verifyToken, decodeToken } = require("../utils/tokenManager");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const token = authHeader.split(" ")[1];

    const isValidToken = verifyToken(token);

    if (!isValidToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    const decodedToken = decodeToken(token);

    req.user = decodedToken;

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
