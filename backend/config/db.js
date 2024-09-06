import mongoose from "mongoose"

export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://userteelab:123@teelabdb.mbbq3.mongodb.net/?retryWrites=true&w=majority&appName=teelabdb')
        .then(()=>console.log("DB Connected"))
}