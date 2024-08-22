export const userLogoutController = async(req, res)=> {
    try {
        const tokenOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "none",
          };

        res.clearCookie("token", tokenOptions).status(200).json({
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