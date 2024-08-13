export const userLogoutController = async(req, res)=> {
    try {
        res.clearCookie("token").status(200).json({
            success: true,
            error: false,
            message: "User logged out successfully"
        })
    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false,
        });
    } 

}