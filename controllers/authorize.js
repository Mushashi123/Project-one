require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Users = require('../model/users');

//this middleware will create the token ....

const SignUp = async (req,res,next)=>{

    const {username,password} = req.body;
    if(!username || !password){
        res.status(403).send('Username and password must be provided');
    }

    const exists = await Users.exists({username : username});

    if(exists){
        return res.send('User name Exists!');
    }
    
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password,salt);
    
    let user = undefined;
    try{
         user = await Users.insertMany({username,password : hashedPassword});
    }catch(error){
        console.log(error);
        return res.sendStatus(500);
    }

    const payload = {username,password};
    const token = generateToken(payload);

    res.status(200).json({token : token, msg : "Sucessfully signned up "+ user[0].username});

}


const generateToken = (payload)=>{
    return jwt.sign(payload,process.env.SECRET,{expiresIn:'30d'});
} 

// this middleware will verify the token 
const authorize = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.sendStatus(401);
    }

    jwt.verify(token,process.env.SECRET,(err,user)=>{
        if(err) return res.sendStatus(401);

        // res.send('U have access kiddo');
        next()
        
    })
} 


const login = async (req,res,next)=>{
    const {username,password} = req.body;
    if(!username || !password) {
        return res.status(401).send('User name and password required!');
    }
    
    let user;
    try{
        console.log(username);
         user = await Users.find({username : username});
    }catch(error){
        return res.sendStatus(500);
    }

    if(user.length < 1){
        return res.status(401).send(`user with username ${username} does not exist!`);
    }

    const check = await bcrypt.compare(password,user[0].password);

    if(!check){
        return res.sendStatus(403);
    }

    res.status(200).json({success:true,msg:`logged in successfully ${user[0].username}`});
    
}


module.exports = {
    SignUp,
    authorize,
    login
};

