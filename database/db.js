const mongo = require ("mongoose")

const dbconnect= async()=>{
    try{
await mongo.connect("mongodb://localhost:27017/Test")
console.log("db connect successfully ")
}catch(err){
    console.log("DataBase Connection Failed",err.message)
}
}

module.exports=dbconnect 
dbconnect()