import mongoose, { connect } from "mongoose"

const connectDb=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Database Connected Successfully")
    }catch(error){

    }
}

export default connectDb