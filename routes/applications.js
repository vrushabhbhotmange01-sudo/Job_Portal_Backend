const express = require("express")
const router= express.Router()
const{protect,authorize}=require("../middleware/middleware.js")
const {apply,getapplications}=require("../controllers/ApplicationController.js")

router.post('/sendapplication',protect,apply)
router.get('/getapplication',protect,getapplications)

module.exports=router