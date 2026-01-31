const { create } = require("../Schemas/applications")
const jobs=require("../Schemas/jobs")

const createjobpost= async (req,res)=>{
try{
    if(!req.user){
        res.status(401).json({message:"unauthorized"})
    }
    const job = await jobs.create({...req.body,postedby:req.user.id})
    res.status(201).json(job)}
    catch(err){
        res.json({message:"Error Creating JobPost",error:err.message})
    }
}

const getjobposts=async (req,res)=>{
   try{ const {page=1,limit=5,location,search,experience,skills}=req.queary
    queary={}
    if (location) queary.location= location
    if (search) queary.title= search
    if (experience) queary.location= experience
    if (skills) queary.location= skills

    const job = await jobs.find(filter)
    // pegination 
    // .skip((page-1)*limit)    
    // .limit(Number(limit))

    // const total = await jobs.countDocuments(queary)
    
    res.json(job)
    // res.json({total,page:Number(page),totalPages:Math.ceil(total/limit),job}) 
}

    catch(err){res.status(401).json({message:"Error Fetcing Jobs"},err.jobs)}
}

const jobpostbyid=async(req,res)=>{
    try{
        const {jobId}=req.body
        if(!jobId){return res.status(400).json({message:"JobId is required"})}
        const job = await jobs.findOne(jobId)
        if(!job){return res.status(400).json({message:"Job not Found"})}
        res.status(200).json(job)
}catch(err){
    res.status(401).json({message:"something went wrong",error:err.message})
}
    
}

const updatepost=async(req,res)=>{

}

const deletepost= async(req,res)=>{
    
    try{
    const {jobId}=req.body
    if(!jobId){return res.status(400).json({message:"Jobid is required"})}

    const job = await jobs.findOne(jobId)
    if(!job){return res.status(400).json({message:"Job not found"})}

    await job.deleteOne()

    res.json({message:"Post Delete Successfully"})
}
    catch(err){
        res.status(400).json({message:"Error deleting Job Post ",error:err.message})
    }
}
module.exports={createjobpost,getjobposts,jobpostbyid,deletepost}