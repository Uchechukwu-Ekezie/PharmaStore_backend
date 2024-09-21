import bcrypt from "bcryptjs";
import vendorModel from "../../models/vendorModel.js";

// Vendor SignUp Controller
export const vendorSignUpController = async (req, res) => {
  try {
    const { email, password, name, companyName, address } = req.body;

    // Check for missing fields and prevent null submissions
    if (!email) {
      throw new Error("Please provide an email.");
    }
    if (!name) {
      throw new Error("Name is required.");
    }
    if (!password || password.length < 6) {
      throw new Error("Password is required and must be at least 6 characters long.");
    }
    if (!companyName || companyName.trim() === "") {
      throw new Error("Company name is required and cannot be empty.");
    }
    if (!address) {
      throw new Error("Address is required.");
    }

    // Normalize email to lowercase
    const normalizedEmail = email.toLowerCase();

    // Check if the vendor already exists by email
    const existUser = await vendorModel.findOne({ email: normalizedEmail });
    if (existUser) {
      throw new Error("User already exists.");
    }

    // Check if the company name already exists
    const existingCompany = await vendorModel.findOne({ companyName });
    if (existingCompany) {
      throw new Error("Company name already exists. Please choose a different name.");
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 12);

    // Create payload for the new vendor
    const payload = {
      name,
      email: normalizedEmail,
      companyName,
      password: hashPassword,
      address,
      role: "VENDOR",
      profilePic: req.body.profilePic || "", // Handle profile picture if provided
    };

    // Save the new vendor to the database
    const newUser = new vendorModel(payload);
    const saveUser = await newUser.save();

    // Send success response
    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "Vendor created successfully!",
    });
  } catch (err) {
    console.error("Error during vendor signup:", err.message);
    res.status(400).json({
      message: err.message || "An error occurred during vendor signup.",
      error: true,
      success: false,
    });
  }
};
