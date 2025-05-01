import { PrismaClient } from "../generated/prisma/index.js";



let globalForPrisma = globalThis;

export const db = globalForPrisma.prisma || new PrismaClient();

if(process.env.NODE_ENV !== "production") globalForPrisma = db