import express from "express";
import User from "../models/Users.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import fetchuser from "../middleware/fetchuser.js";
import jwt from "jsonwebtoken";


const router = express.Router();
const JWT_SECRET =  "dcinfotech";


//Router: 1 create user
router.post('/createuser', [
    body('name', 'Enter a valid Name').isLength({ min: 3 }),
    body('email', "Enter a valid Email").isEmail(),
    body('password', "Password must be atlest 5 charecters").isLength({ min: 5 }),
    body('type',"valid input"),

],async (req,res) =>{
    let success=false;
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({success,error:error.array()});
    }
    try {
        let user = await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({success,error:"Sorry this Email already exists"})
        }
        const salt= await bcrypt.genSalt(10);
        const genPass = await bcrypt.hash(req.body.password,salt) ;

        //create new user
        user = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:genPass,
            type:req.body.type,
        });
        const data ={
            user :{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data,JWT_SECRET);

        //res.json
        success=true;
        res.json({success,authtoken})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Eroorr");
        
    }
})
/// router 2 lonin 
router.post('/login',[
    body('email',"Enter a Valid email").isEmail(),
    body('password',"password can't be blank").exists(),
],async (req,res)=>{
    let success= false;
     // If there are errors, return Bad request and the errors
     const errors = validationResult(req);
     if(!errors.isEmpty()){
        return res.status(400).json({errors :errors.array()});
     }
     const {email,password}=req.body;
     try {
        let user =await User.findOne({email});
        if(!user){
            success= false;
            return res.status(400).json({errors:"Please try to login with correct credencials"});

        }
        const passCompare = await bcrypt.compare(password,user.password);
        if(!passCompare){
            success=false;
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }
        const data={
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data,JWT_SECRET);
        success=true;
        res.json({success,authtoken})
     } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error");
     }
})
// ROUTE 3: getuser a User using: POST

router.post('/getuser', fetchuser, async (req, res) => {

    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password")
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })







export default router;