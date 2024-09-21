import vendorModel from "../../models/vendorModel.js";

export const allVendor = async (req, res) => {
  try {
    console.log("userid all Vendor", req.userId);

    const allVendor = await vendorModel.find();

    res.json({
      message: "All Vendor ",
      data: allVendor,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
