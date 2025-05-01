import express, { Router } from "express";
import {register, login, logout , check}  from '../controllers/auth.controllers.js'
import { authMiddleware } from "../middlewares/auth.middle.js";


const authRoutes = express.Router()


authRoutes.post('/register',register)
authRoutes.post('/login', login)
authRoutes.post('/logout', logout)
authRoutes.get('/check', authMiddleware ,check)



export default authRoutes