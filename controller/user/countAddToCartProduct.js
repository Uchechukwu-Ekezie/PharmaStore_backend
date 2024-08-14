import addToCartModel from "../../models/cartProduct.js"

export const countAddToCartProduct = async(req,res)=>{
    try{
        const userId = req.userId

        const count = await addToCartModel.countDocuments({
            userId : userId
        })

        res.json({
            data : {
                count : count
            },
            message : "ok",
            error : false,
            success : true
        })
    }catch(error){
        res.json({
            message : error.message || error,
            error : false,
            success : false,
        })
    }
}