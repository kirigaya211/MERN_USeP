// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
// dotenv.config();

// const roleMiddleware = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ error: "No token provided" });
//   }

//   try {
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decodedToken;
//     console.log("The decoded user is :", req.userId);
//     next();
//   } catch (error) {
//     return res.status(401).json({ error: "Invalid token" });
//   }
// };

// module.exports = roleMiddleware;
