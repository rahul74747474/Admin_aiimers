import jwt from "jsonwebtoken";

function adminMiddleware(req, res, next) {
  console.log("🛡️ [adminMiddleware] Request received");

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.warn("🚫 [adminMiddleware] No Bearer token provided");
    return res.status(401).json({ errors: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  console.log("🔐 [adminMiddleware] Token extracted:", token);

  try {
    const decoded = jwt.verify(token, "adm1nS3cr3tT0kenKey!");
    console.log("✅ [adminMiddleware] Token verified:", decoded);

    if (!decoded.isAdmin) {
      console.warn("⛔ [adminMiddleware] User is not an admin");
      return res.status(403).json({ errors: "Access denied. Admins only." });
    }

    req.adminId = decoded.id;
    console.log("🎯 [adminMiddleware] Admin ID:", req.adminId);
    next();
  } catch (error) {
    console.error("❌ [adminMiddleware] Token verification failed:", error.message);
    return res.status(401).json({ errors: "Invalid token or expired" });
  }
}

export default adminMiddleware;

