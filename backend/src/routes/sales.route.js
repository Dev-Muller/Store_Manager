const route = require('express').Router();
const { salesController } = require('../controllers');
const { validProductId,
  productIdRequired,
  validSaleProduct, 
  validSale } = require('../middlewares/productIdValidation');
const { quantityRequired, validQuantity,
  updateQuantity } = require('../middlewares/quantityValidation');

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
route.put(
'/:saleId/products/:productId/quantity',
updateQuantity,
validSale,
validSaleProduct,
salesController.updateSale,
);

module.exports = route;