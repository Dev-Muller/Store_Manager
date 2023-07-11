const route = require('express').Router();
const { salesController } = require('../controllers');
const { validProductId, productIdRequired } = require('../middlewares/productIdValidation');
const { quantityRequired, validQuantity } = require('../middlewares/quantityValidation');

route.get('/', salesController.findAllSales);
route.get('/:id', salesController.findSalesById);
route.post(
'/', 
productIdRequired, 
validProductId, 
quantityRequired, 
validQuantity,
salesController.createNewSale,
);
route.delete('/:id', salesController.deleteSale);

module.exports = route;