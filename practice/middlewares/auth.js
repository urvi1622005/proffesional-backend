import jwt from "jsonwebtoken";

// Authorization middleware
export const authorization = (req, res, next) => {
  try {
    // Retrieve token from cookies
    const token = req.cookies?.token;

    // Check if token exists
    if (!token) {
      return res.status(401).json({ message: "Unauthorized access. Token required." });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user ID to the request object for further use
    req.user = decoded.id;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("JWT Error:", error.message);

    // Handle specific JWT errors
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({ message: "Token expired. Please log in again." });
    }

    // Generic error response
    res.status(401).json({ message: "Invalid or expired token." });
  }
};
