import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import productRoute from "./routes/ProductRoute.js";
import userRoute from "./routes/UserRoute.js";
import 'dotenv/config'
import cartRoute from "./routes/CartRoute.js";
import orderRoute from "./routes/OrderRoute.js";

const app = express();
const port = 4000;

app.use(express.json())
app.use(cors())

connectDB();


app.use("/api/product",productRoute)
app.use("/images",express.static('uploads/'))
app.use("/api/user",userRoute)
app.use("/api/cart",cartRoute)
app.use("/api/order",orderRoute)


app.get("/",(req,res)=>{
    res.send("API Working")
})

//callback function ()=>
app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})