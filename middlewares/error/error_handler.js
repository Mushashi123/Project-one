const error = require('./error_class')
const errorHandler = (err,req,res,next)=>{

    
    // console.log(err)
    if(err instanceof error){
        res.status(err.status).json({error:err.message});
    }

    return res.status(500).send('something went wrong'); 
}

module.exports = errorHandler;