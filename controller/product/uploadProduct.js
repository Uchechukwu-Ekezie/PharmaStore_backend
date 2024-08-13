import uploadProductPermission from "../../helpers/permission.js";
import productModel from "../../models/productModel.js";

export const uploadProductController = async (req, res) => {
    try {
        if (!uploadProductPermission(req.userId)) {
            throw new Error("Permission denied");
        }

        const { _id, ...resBody } = req.body;

        let updateProduct;

        if (_id) {
            updateProduct = await productModel.findByIdAndUpdate(_id, resBody, { new: true });
        } else {
            updateProduct = new productModel(resBody);
            await updateProduct.save();
        }

        res.json({
            message: "Product updated successfully",
            data: updateProduct,
            success: true,
            error: false
        });

    } catch (err) {
        console.error("Error in uploadProductController:", err);
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};
