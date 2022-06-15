const {CustomError} = require('./error_class');

const errorHandler = (error,req,res,next)=>{
    if(error instanceof CustomError){
        return res.status(error.statusCode).json({sucess:false,msg:error.message});
    }
    console.log(error);
    return res.status(500).send('Something went wrong.Please try again later');
}

module.exports = errorHandler;