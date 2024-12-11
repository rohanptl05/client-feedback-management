import jwt from "jsonwebtoken";
const JWT_SECRET =  "dcinfotech";


const fatchuser =(req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please authoticate a valid token"})
    }
    try {
        const data=jwt.verify(token,JWT_SECRET);
        req.user=data.user;
        next()
    } catch (error) {
        res.status(401).send({error:"Please authoticate a valid token"})
    }


}

export default fatchuser ;