const express = require("express");
const router = express.Router();
// importing controllers 
const {getAllProducts,
    getOneProduct,
    insertProduct,
    updateProduct,
    deleteProduct} = require('../controllers/products');


// all the routes handelling 
router.route('/').get(getAllProducts).post(insertProduct);
router.route('/:id').get(getOneProduct).patch(updateProduct).delete(deleteProduct);


// exporting
module.exports = router;