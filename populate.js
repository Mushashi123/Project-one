const mongoose = require('mongoose');
const connectDb = require('./db/connection');
const products = require('./model/products');
const Product  = require('./model/products');
require('dotenv').config();

connectDb(process.env.MONGO_URI);

const product = Product.create({
    name:"Vanilla",
    company:"Amul",
    available:true,
    description:"kgflafjvfadjfldvladjfvsjdfvDFVALSDHFVLDFJ"
});

product.save();



