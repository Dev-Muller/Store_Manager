const route = require('express').Router();
const { productController } = require('../controllers');
const { productValidation, minValidName } = require('../middlewares/productValidation');

route.get('/', productController.findAll);
route.get('/:id', productController.findById);
route.post('/', productValidation, minValidName, productController.createNewProduct);
route.put('/:id', productValidation, minValidName, productController.updateProduct);

module.exports = route;