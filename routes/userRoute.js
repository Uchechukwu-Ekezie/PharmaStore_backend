import { Router } from "express";
import { userSignInController } from "../controller/user/userSignIn.js";
import { userSignUpController } from "../controller/user/userSignUp.js";
import { userDetailsController } from "../controller/user/userDetail.js";
import { userLogoutController } from "../controller/user/userLogout.js";
import authToken from "../middleware/authToken.js";
import { allUsers } from "../controller/user/allUsers.js";
import { updateUser } from "../controller/user/updateUser.js";
import { uploadProductController } from "../controller/product/uploadProduct.js";
import { getProductController } from "../controller/product/getProduct.js";
import { updateProductController } from "../controller/product/updateProduct.js";
import { getCategoryProduct } from "../controller/product/getCategoryProduct.js";
import { getCategoryWiseProduct } from "../controller/product/getCategoryWiseProduct.js";


const router = Router();

router.post("/login", userSignInController);
router.post("/signup", userSignUpController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogoutController);

// admin panel

router.get("/all-user",authToken, allUsers)
router.post("/update-user", authToken, updateUser)

// product
router.post("/upload-product",authToken, uploadProductController)
router.get("/get-product", getProductController)
router.post("/update-product", authToken, updateProductController)
router.get("/get-categoryProduct", getCategoryProduct)
router.get("/get-categoryProduct",getCategoryProduct)
router.post("/category-product",getCategoryWiseProduct)




export default router;
