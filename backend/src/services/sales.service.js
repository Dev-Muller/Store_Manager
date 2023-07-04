const { salesModel } = require('../models');
const { getSaleId } = require('../models/sales.model');

const findAllSales = async () => {
  const sales = await salesModel.findAllSales();
  return sales;
};

const findSalesById = async (salesId) => {
  const sales = await salesModel.findSalesById(salesId);
  if (sales.length === 0) return { message: 'Sale not found' };
  return sales;
};

const createNewSale = async (saleDataObject) => {
  const saleId = await getSaleId();
  saleDataObject.map(async (sale) => {
    await salesModel.createNewSale(saleId, sale.productId, sale.quantity);
  }); 
  
  return { id: saleId, itemsSold: saleDataObject };
};

module.exports = { findAllSales, findSalesById, createNewSale };