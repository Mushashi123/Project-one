const Products = require('../model/products');
const wrapper = require('../middlewares/wrapper');
const {createCustomError} = require('../middlewares/error/error_class');

const getAllProducts = wrapper(async(req,res,next)=>{
    const product = await Products.find({});
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