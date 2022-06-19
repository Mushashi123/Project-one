const express = require("express");
const router = express.Router();
// importing controllers 
const {getAllProducts,
    getOneProduct,
    insertProduct,
    updateProduct,
    deleteProduct
    
} = require('../controllers/products');
const {SignUp,authorize,login} = require('../controllers/authorize');


//using router level middleware to create and authorize 

// go to login route and get a valid jwt token 
router.route('/signup').get(SignUp);
router.route('/login').get(login);

    router.use(authorize);

// all the routes handelling 
router.route('/').get(getAllProducts).post(insertProduct);
router.route('/:id').get(getOneProduct).patch(updateProduct).delete(deleteProduct);


// exporting
module.exports = router;