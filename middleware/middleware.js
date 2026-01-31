const jwt = require("jsonwebtoken")
const user=require("../Schemas/user")

const protect = async(req,res)=>{
    let token;
    if(req.headers.authorization&&req.headers.authorization.startsWith("Bearer")){
        try{
        token = req.headers.authorization.split(" ")[1]
        let decoded = jwt.verify(token,process.env.jwt)
        req.user=  await user.findById(decoded.id).select("-password")
        if(!req.user){
            res.status(400).json({message:"user not found"})
             next()
        }}catch(err){res.status(400).json({message:"not authorized,token failed"})}
       
    }else{
        res.status(401).json({message:"Token Not Found"})
    }}

    const authorize=(...allowedRoles)=>{
        return (req,res,next)=>{
            if (!allowedRoles.includes(req.user.role)){
                return res.status(403).json({message:"Unauthorized,you do not have access to this resource"})
            }
            next()
        }
    }
    module.exports={protect,authorize}