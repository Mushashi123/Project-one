const Products = require('../model/products');
const wrapper = require('../middlewares/wrapper');


const getAllProducts = wrapper(async(req,res,next)=>{
    const product = await Products.find({});
    if(product.length > 0){
        return res.status(200).json({sucess:true,data:product});
    }
    res.status(200).json({sucess:true,msg:"No products available"});
});


const getOneProduct = wrapper(async(req,res,next)=>{
    const {id} = req.params;
    const product = await Products.findById(id);
    if(!product){
       return res.status(200).json({sucess:true,data:"Product not found"});
    }
    res.status(200).json({sucess:true,data:product});

});

const insertProduct = wrapper(async(req,res,next)=>{
    
    const product = await Products.insertMany(req.body);
    if(!product[0]){
        return res.send(400).json({sucess:false,msg:"Could not insert."});
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
       return res.status(200).json({sucess:"false",msg:"Unable to update"})
    }

    res.status(200).json({sucess:true,data:product});

}
const deleteProduct = async(req,res,next)=>{
    const {id} = req.params;
    const product = await Products.findByIdAndDelete(id);
    if(!product){
       return res.status(200).json({sucess:true,data:"Cannot delete"});
    }
    res.status(200).json({sucess:true,data:product});
}


module.exports = {getAllProducts,
    getOneProduct,
    insertProduct,
    updateProduct,
    deleteProduct

};