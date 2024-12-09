import mongoose  from "mongoose";
import express from "express";
import cors from "cors";
import authRouter from "./routers/auth.js";





const connectMongo = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/feedback-data");
        console.log("connect To Mongo")
    } catch (error) {
        console.error("Error connecting to MongoDB",error)
    }
}

connectMongo();

const app = express();
const port =6000


app.use(cors())
app.use(express.json())

app.use('/api/auth',authRouter)




app.listen(port,()=>{
    console.log(`App listen port:${port}`)
})