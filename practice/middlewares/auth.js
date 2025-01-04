import jwt from "jsonwebtoken";

export const authorization = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized access. Token required." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id; // Attach user ID to request object
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token." });
  }
};
