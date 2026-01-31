const mongo = require("mongoose");

const applicationschema=new mongo.Schema({
    job:{type:mongo.Schema.Types.ObjectId,ref:"job",require:true},
    applicant:{type:mongo.Schema.Types.ObjectId,ref:"user",require:true},
    status:{type:String,enum:['applied','accepted','pending'],default:'accepted'}
},{timestamps:true});

module.exports=mongo.model("applications",applicationschema)