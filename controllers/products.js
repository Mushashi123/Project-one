const Products = require('../model/products');
const wrapper = require('../middlewares/wrapper');
const {createCustomError} = require('../middlewares/error/error_class');


const getAllProducts = wrapper(async(req,res,next)=>{

    const {name,company,available,sort,limit,numericFilter} = req.query;
    let queryObj = {};
    if(name){
        queryObj.name = {$regex:name,$options:'i'};
    }
    if(company){
        queryObj.company = {$regex:company,$options:'i'};
    }
    if(available === 'true' || available === 'false'){
        queryObj.available = available;
    }

    if(numericFilter){
        const operatorMap = {
            '>':'$gt',
            '>=':'$gte',
            '<':'$lt',
            '<=':'$lte',
            '=':'$eq'
        }
        const regex = /\b(<|>|<=|>=|=)\b/g;
        //replace all the area with the above regex matches with opertor map
        const filters = numericFilter.replace(regex,(match)=>`-${operatorMap[match]}-`);
        //our api options of key to perform numberic operator 
        const options = 'price';

        // split where there is - and store the value os string in a variable 
        const [field,operator,value] = filters.split('-');

        // if the query was performed in one of our option key
        if(field === options){
            queryObj[field] = {[operator]:Number(value)};
        }
    }

    // i am deliberately not using await so that the code would get asynchronous 
    // and i can use the sort() and limit() method 

    let result =  Products.find(queryObj);

    //sorting
    if(sort){
        result = result.sort(sort);
    }
    
    //limiting
    let limiter = limit || 10;
    result = result.limit(limiter);

    const product = await result;

    if(product.length > 0){
        return res.status(200).json({sucess:true,data:product});
    }
    return next(createCustomError("No products available",404));
});


const getOneProduct = wrapper(async(req,res,next)=>{
    const {id} = req.params;
    const product = await Products.findById(id);
    if(!product){
        return next(createCustomError("Product not found",404));
    //    return res.status(200).json({sucess:true,data:"Product not found"});
    }
    res.status(200).json({sucess:true,data:product});

});

const insertProduct = wrapper(async(req,res,next)=>{
    
    const product = await Products.insertMany(req.body);
    if(!product[0]){
        return next(createCustomError("Could not insert.",404));
       
    }
    res.status(200).json({sucess:true,data:product[0]});

});


const updateProduct = async(req,res,next)=>{
    const {id} = req.params;
    const product = await Products.findByIdAndUpdate(id,req.body,{
        runValidators:true,
        new:true
    });

    if(!product){
        return next(createCustomError("Unable to update",404));
       
    }

    res.status(200).json({success:true,data:product});

}


const deleteProduct = async(req,res,next)=>{
    const {id} = req.params;
    const product = await Products.findByIdAndDelete(id);
    if(!product){
       return next(createCustomError("Unable to delete",404));
    }
    res.status(200).json({sucess:true,data:product});
}


module.exports = {getAllProducts,
    getOneProduct,
    insertProduct,
    updateProduct,
    deleteProduct

};