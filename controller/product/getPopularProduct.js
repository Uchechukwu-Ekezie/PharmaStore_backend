import productModel from "../../models/productModel.js";


// Fetch all popular products
export const getPopularProducts = async (req, res) => {
  try {
    const popularProducts = await productModel.find({ isPopular: true });
    res.status(200).json(popularProducts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching popular products", error });
  }
};

// Mark a product as popular
export const markProductAsPopular = async (req, res) => {
  const { productId } = req.params; // Assuming the product ID is passed as a URL parameter

  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      { isPopular: true },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product marked as popular", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Error marking product as popular", error });
  }
};

// Remove popular status from a product
export const removePopularStatus = async (req, res) => {
  const { productId } = req.params; // Assuming the product ID is passed as a URL parameter

  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      { isPopular: false },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product removed from popular status", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Error removing popular status", error });
  }
};
