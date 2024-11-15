// import jwt from "jsonwebtoken";
// const isAuthenticated = async (req,res,next) =>{
//     try{
//         const token = req.cookies.token;
//         if (!token){
//             return res.status(401).json({
//                 message:"User not authencation",
//                 success: false,
//             })
//         }
//         const decode = await jwt.verify(token, process.env.SECRET_KEY);
//         if (!decode){
//             return res.status(401).json({
//                 message:"Invalid token",
//                 success:false
//             })
//         };
//         req.id = decode.userId;
//         next();
//     }catch(error){
//         console.log(error)
//     }
// }
// export default isAuthenticated;
import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        // Verify the token using the secret key
        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            });
        }

        // Attach the user's ID to the request object for further use
        req.id = decoded.userId;

        // Proceed to the next middleware or route handler
        return next();
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
};

export default isAuthenticated;










