const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User= require("../Schemas/user.js")

const generate_token = (user)=>{
    return jwt.sign({id:user._id,role:user.role},process.env.jwt,{expiresIn:'1d'})
}

const register = async(req,res)=>{
const {name,email,role,password}=req.body;
if (!name||!email||!role||!password){
    return res.status(401).json({message:"Invalaid Data"})}
const exists = await User.findOne({email})
if(exists){return res.status(401).json({messgae:"Email already exists"})}

const hashedpassword=await bcrypt.hash(password,10)
const user = await User.create({name,email,role,password:hashedpassword})

res.status(200).json({
    message:"User Created Successfully",
    token:generate_token(user),
    user:{id:user._id,name:user.name,email:user.email,role:user.role}
})

}

const login =async(req,res)=>{

    const {email,password} = req.body;
   
if (!email||!password){
    return res.status(401).json({message:"Invalaid Data"})}
const user = await User.findOne({email})
if(!user){return res.status(401).json({messgae:"Email Does not exists"})}

const ismatch= bcrypt.compare(user.password,password)
if(!ismatch){return res.status(400).json({message:"invalaid Password"})}

let token=generate_token(user)
 console.log(token)
res.status(200).json({
    message:"User logined Successfully",
    token:token,
    user:{id:user._id,name:user.name,email:user.email,role:user.role}
})  
}

module.exports={register,login}