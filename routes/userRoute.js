import { Router } from "express";
import express from "express"
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
import { getProductDetails } from "../controller/product/getProductDetails.js";
import { addToCartController } from "../controller/user/addTocartController.js";
import { countAddToCartProduct } from "../controller/user/countAddToCartProduct.js";
import { addToCartViewProduct } from "../controller/user/addToCartViewProduct.js";
import { updateAddToCartProduct } from "../controller/user/updateToCartProduct.js";
import { deleteAddToCartProduct } from "../controller/user/deleteAddToCartProduct.js";
import { filterProductController } from "../controller/product/filterProduct.js";
import { searchProduct } from "../controller/product/searchProduct.js";
import { paymentController } from "../controller/order/paymentController.js";
import webhooks from "../controller/order/webhook.js";
import { orderController } from "../controller/order/orderController.js";
import { allOrderController } from "../controller/order/allOrderController.js";
import bodyParser from "body-parser";


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
router.post("/product-details",getProductDetails)
router.get("/search",searchProduct)
router.post("/filter-product",filterProductController)


//user add to cart
router.post("/addtocart",authToken,addToCartController)
router.get("/countAddToCartProduct",authToken,countAddToCartProduct)
router.get("/view-card-product",authToken,addToCartViewProduct)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)

// paystack

router.post('/checkout',authToken,paymentController)
router.post('/webhook',webhooks)
router.get("/order-list",authToken,orderController)
router.get("/all-order",authToken,allOrderController)





export default router;
