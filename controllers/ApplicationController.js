
const applications = require("../Schemas/applications")


const apply = async(req,res)=>{
    try{const {jobId}=req.body
    
    const exists = await applications.findOne({job:jobId,applicant:req.user.id})
    if(exists){res.status(400).json("You Have Already Applied To this JobPosting")}

    const applied = await applications.create({job:jobId,applicant:req.user.body})
    res.status(201).json({message:"Applied Successfully"})
}catch(err){
    res.status(401).json({message:"Error Applying To JobPost "})
}
}

const getapplications=async(req,res)=>{
    try{const filter={}
    if (req.user.role==="user")filter.applicant=req.user.id
    if (req.user.role==="recruiter")filter.postedby=req.user.id

    const application = applications.find(filter).populate("job applicant","job name email")
    res.status(201).json(application)
    }catch(err){res.status(400).json({message:"Error While Featching Applications"},err.message)}
}
module.exports={apply,getapplications}