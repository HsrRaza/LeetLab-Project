import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";




import authRoutes  from "./src/routes/auth.routes.js";
import problemRoutes from "./src/routes/problems.routes.js";
import executionRoute from "./src/routes/executeCode.routes.js";


dotenv.config();


const app = express();


app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res)=>{
    res.send("Hello welcome to letlab");
})

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/problems', problemRoutes);
app.use('/api/v1/execute-code',executionRoute );

app.use("api/v1/playlist", playlistRoutes)

app.listen(process.env.PORT,()=>{
    console.log("Server is running on port 8080");
    

})

