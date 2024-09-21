import userModel from "../../models/userModel.js";
import validator from "validator";

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id; 
    const { name, email, phone, address, profilePic } = req.body;

    // Validate email if it's being updated
    if (email && !validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Find the user by ID
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check for unique email
    if (email && email !== user.email) {
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email is already in use" });
      }
    }

    // Update only the provided fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 12);
    if (profilePic) user.profilePic = profilePic;
    if (role) user.role = role;
    if (phone) user.phone = phone;
    if (address) user.address = address;

    // Save the updated user
    await user.save();

    // Return the updated user data (excluding sensitive information)
    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        profilePic: user.profilePic,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
};
