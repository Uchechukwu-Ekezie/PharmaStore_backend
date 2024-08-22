import userModel from "../../models/userModel.js";
import bcrypt from "bcryptjs";


// User SignUp
export const userSignUpController = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Normalize email to lowercase
    const normalizedEmail = email.toLowerCase();

    // Check if the user already exists
    const existUser = await userModel.findOne({ email: normalizedEmail });
    console.log("Existing User Check:", existUser); // Log the result

    if (existUser) {
      throw new Error("User already exists.");
    }

    // Validate email
    if(!email){
        throw new Error("Please provide email")
     }

    // Validate name and password
    if (!name) {
      throw new Error("Name is required.");
    }
    if (!password || password.length < 6) {
      throw new Error("Password is required and must be at least 6 characters long.");
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 12);
    if(!hashPassword){
        throw new Error("Something is wrong")
    }

    // Create payload for the new user

    const payload = {
        ...req.body,
    //   email: normalizedEmail,
      password: hashPassword,
      role: "GENERAL",
    };

    // Save the new user to the database
    const newUser = new userModel(payload);
    const saveUser = await newUser.save();

    // Send success response
    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User created successfully!",
    });
}catch(err){
    res.json({
        message : err.message || err  ,
        error : true,
        success : false,
    })
  }
};