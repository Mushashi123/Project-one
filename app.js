require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const endpoint = "/api/v1/products";
const router = require('./router/products');
const connectDB = require('./db/connection');
const mongoose = require('mongoose');
const notFound = require('./middlewares/not_found'); 
const errorHandler = require('./middlewares/error/error_handler');

// middlewares 
app.use(express.json());
app.use(endpoint,router);
app.use(notFound);
app.use(errorHandler);


//connecting to the data base 
connectDB(process.env.MONGO_URI);
const db = mongoose.connection;
db.on('error',(err)=>console.log(err));
db.once('open',()=>console.log('connected to db'));


// listening requests 
app.listen(port,console.log(`listening at port ${port}`));



