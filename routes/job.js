const express = require("express")
const router= express.Router()
const{protect,authorize}=require("../middleware/middleware.js")
const {createjobpost,getjobposts,jobpostbyid,deletepost} =require("../controllers/jobController.js")

router.post('/createjob',protect,createjobpost)
router.get('/getjob',getjobposts)
router.get('/jobpostbyid',jobpostbyid)
router.delete('/deletepost',deletepost)


module.exports=router