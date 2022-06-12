const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name of the ice cream must be provided"]
    },
    company:{
        type:String,
        required:[true,"company of the ice cream must be provided"]
    },
    available:{
        type:Boolean,
        default:true
    },
    description:{
        type:String
    },
    insertedAt:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model('products',productSchema);