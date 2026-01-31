const express=  require ("express")
const authroutes = require('./routes/route.js')
const jobroutes = require('./routes/job.js')
const applications = require('./routes/applications.js')
const connectdb = require('./database/db.js')
const dotenv = require("dotenv")
dotenv.config()

const app  = express()
app.use(express.json())

app.use('/auth',authroutes)
app.use('/job',jobroutes)
app.use('/applications',applications)

app.get('/',(req,res)=>{
    res.send("app is listening").json("app is listening")
})

connectdb().then(()=>{
    app.listen(process.env.port,()=>{
        console.log(`app is listening on port ${process.env.port}`)
    })
})