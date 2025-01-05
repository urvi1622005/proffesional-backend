import jwt from "jsonwebtoken";

export const authorization = (req, res, next) => {
  const token = req.cookies?.token; // Safely access token from cookies

  if (!token) {
    return res.status(401).json({ message: "Unauthorized access. Token required." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id; // Attach user ID to the request object
    next();
  } catch (error) {
    console.error("JWT Error:", error.message);
    res.status(401).json({ message: "Invalid or expired token." });
  }
};
