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

const deleteSale = async (id) => {
  const saleId = await salesModel.findSalesById(id);

  if (saleId.length === 0) {
    return {
      status: 404,
      data: {
        message: 'Sale not found',
      },
    };
  }
  
  await salesModel.deleteSale(id);

  return { status: 204, data: {} };
};

const updateSale = async (id, productId, quantity) => {
  const [saleObject] = await salesModel.findSalesById(id);
  
  if (!saleObject) {
    return {
      status: 404,
      data: {
        message: 'Sale not found',
      },
    };
  }

  await salesModel.updateSale(id, productId, quantity);

  return { status: 200,
    data: {
      date: saleObject.date,
      productId: +productId,
      quantity,
      saleId: +id,
    } };
};

module.exports = { findAllSales, findSalesById, createNewSale, deleteSale, updateSale };