const { verifyToken } = require("../utils/tokenManager");
const { USER_ROLE } = require("../config/constant");

/**
 * Admin-only auth middleware.
 * Expects a JWT issued by admin login with payload: { id, role: "admin" }.
 * Use on routes that require admin access.
 */
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
    const decoded = verifyToken(token);

    if (decoded.role !== USER_ROLE.ADMIN) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Admin access required",
      });
    }

    req.user = decoded;
    req.isAdmin = true;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
