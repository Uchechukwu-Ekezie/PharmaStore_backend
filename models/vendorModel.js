import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

// Vendor Schema Definition
const vendorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: "Please enter a valid email",
      },
    },
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      unique: true, // Ensure company names are unique
      validate: {
        validator: function (v) {
          return v && v.trim() !== ""; // Check that company name is not empty
        },
        message: "Company name cannot be empty",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    profilePic: {
      type: String,
      default: "", // Avoids null issues by defaulting to an empty string
    },
    role: {
      type: String,
      default: "vendor", // Default role is vendor
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          // Allows empty phone or validates phone number
          return v === "" || validator.isMobilePhone(v, "any", { strictMode: false });
        },
        message: "Please enter a valid phone number",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Hashing the password before saving the user
vendorSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// Ensure unique indexes are correctly set up
vendorSchema.index({ email: 1 }, { unique: true });
vendorSchema.index({ companyName: 1 }, { unique: true });

const vendorModel = mongoose.model("Vendor", vendorSchema);

export default vendorModel;
