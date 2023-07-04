const route = require('express').Router();
const { salesController } = require('../controllers');

route.get('/', salesController.findAllSales);
route.get('/:id', salesController.findSalesById);
route.post('/', salesController.createNewSale);

module.exports = route;