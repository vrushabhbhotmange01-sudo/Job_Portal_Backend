const mongo = require("mongoose")

const userSchema = new mongo.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    role:{type:String,require:true,enum:["user","recruiter"],default:"user"}
})
module.exports=mongo.model("user",userSchema)
