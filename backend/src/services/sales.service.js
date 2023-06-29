const { salesModel } = require('../models');

const findAllSales = async () => {
  const sales = await salesModel.findAllSales();
  return sales;
};

const findSalesById = async (salesId) => {
  const sales = await salesModel.findSalesById(salesId);
  if (sales.length === 0) return { message: 'Sale not found' };
  return sales;
};

module.exports = { findAllSales, findSalesById };