import jwt from "jsonwebtoken";

const authToken = (req, res, next) => {
    try {
      const token = req.cookies?.token;
      console.log("Extracted Token:", token);
  
      if (!token) {
        console.log("No token found");
        return res.status(401).json({
          message: "Please Login...!",
          error: true,
          success: false,
        });
      }
  
      jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
        if (err) {
          console.log("Token verification error:", err.message);
          return res.status(401).json({
            message: "Invalid or expired token. Please login again.",
            error: true,
            success: false,
          });
        }
  
        req.userId = decoded?._id;
        console.log("Decoded User ID:", req.userId);
        next();
      });
    } catch (err) {
      console.log("Auth middleware error:", err);
      return res.status(500).json({
        message: "Something went wrong during authentication.",
        error: true,
        success: false,
      });
    }
  };
  

export default authToken;
