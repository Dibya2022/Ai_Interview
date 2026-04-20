import jwt from "jsonwebtoken"


const isAuth = async (req,res,next) => {
    try {
        let {token} = req.cookies

        if(!token){
            return res.status(401).json({message:"Unauthorized: token missing"})
        }
        const verifyToken = jwt.verify(token , process.env.JWT_SECRET)
        
        if(!verifyToken){
            return res.status(401).json({message:"Unauthorized: invalid token"})
        }
        req.userId = verifyToken.userId

        next()
   

    } catch (error) {
        if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
            return res.status(401).json({message:"Unauthorized: invalid or expired token"})
        }
        return res.status(500).json({message:`isAuth error ${error}`})
    }
    
}

export default isAuth