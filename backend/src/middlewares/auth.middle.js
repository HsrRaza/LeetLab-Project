import jwt from "jsonwebtoken";
import { db } from '../libs/db.js'

export const authMiddleware = async (req, res ,next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({
                msg: "unathorized - NO token"
            })
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return res.status(401).json({
                msg: "Unauthorized - Invalid token"
            })
        }



        const user = await db.user.findUnique({
            where: {
                id: decoded.id
            },
            select: {
                id: true,
                image: true,
                name: true,
                email: true,
                role: true,
            }
        })

        if (!user) {
            return res.status(404).json({
                msg: "User not found",
            });
        }

        req.user = user;
        next();



    } catch (error) {
        console.error("Error authencating user", error);
        res.status(500).json({
            msg: "Error authentication user"
        });

    }
}

export const checkAdmin = async (req , res)=>{
    try {
        const userId = req.user.id;

        const user = await db.user.findUnique({
            where:{
                id:userId
            },
            select:{
                role:true
            }
        })

        if(!user || user.role !== "ADMIN"){
            return res.status(400).json({
                message:"Access denied - Admins only"
            })
        }
    } catch (error) {
        console.error("Error checking admin role", error);
        res.status(500).json({message:"Error checking admin role"})
        
        
    }
}