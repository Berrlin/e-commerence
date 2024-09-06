import express from 'express'
import { deleteUser, listUser, loginUser, registerUser, updateUser } from '../controller/UserController.js';


const userRoute = express.Router();


userRoute.post("/register",registerUser)
userRoute.post("/login",loginUser)
userRoute.get("/list",listUser)
userRoute.post("/delete", deleteUser)
userRoute.put("/update",updateUser)
export default userRoute