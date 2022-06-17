require('dotenv').config();
const jwt = require('jsonwebtoken');

//this middleware will create the token ....
const createToken = (req,res,next)=>{
    const {username,password} = req.body;
    if(!username || !password){
        res.status(403).send('Username and password must be provided');
    }

    const payload = {username,password};
    const token = generateToken(payload);

    res.status(200).json({token : token, msg : "Sucessfully created token"});
    // next();
}


const generateToken = (payload)=>{
    return jwt.sign(payload,process.env.SECRET,{expiresIn:'30d'});
} 

// this middleware will verify the token 
const authorize = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        res.sendStatus(401);
    }

    jwt.verify(token,process.env.SECRET,(err,user)=>{
        if(err) res.sendStatus(401);

        // res.send('U have access kiddo');
        next()
        
    })
} 


module.exports = {
    createToken,
    authorize
};

