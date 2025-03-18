const mongoose=require("mongoose")
require("dotenv").config()
const ConnectToDB=async()=>{
   await mongoose.connect(process.env.MONGO_URI)
   console.log("connected to DB")
}


module.exports={ConnectToDB}