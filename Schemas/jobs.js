const mongo = require ("mongoose");

const jobsSchema= new mongo.Schema({
    title:{type:String,require:true},
    description:{type:String,require:true},
    company:{type:String,require:true},
    location:{type:String,require:true},
    experience:{type:String,require:true},
    skills:{type:String,require:true},
    postedby:{type:mongo.Schema.Types.ObjectId,ref:"user"}
},
{timestamps:true});

module.exports = mongo.model("job",jobsSchema);