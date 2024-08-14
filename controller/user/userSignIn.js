import userModel from "../../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userSignInController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if both email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    // Check if the password is correct
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      // Create JWT token
      const tokenData = {
        _id: user._id,
        email: user.email,
      };
      const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
        expiresIn: "8h", // Simplified time format
      });

      // Set token in cookie with secure options
      const tokenOptions = {
        httpOnly: true,
        secure: true,
      };

      // Send response with user data and token
      res.cookie("token", token, tokenOptions).status(200).json({
        data: token,
        success: true,
        error: false,
        message: "User logged in successfully",
      });
    } else {
      throw new Error("Please check Password");
    }
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
