const { saleService } = require('../services');
// const mapStatusHTTP = require('../utils/mapStatusHTTP');

const findAllSales = async (req, res) => {
  const data = await saleService.findAllSales();
  return res.status(200).json(data);
};

const findSalesById = async (req, res) => {
  const { id } = req.params;

  const data = await saleService.findSalesById(+id);

  if (data.message) {
    return res.status(404).json(data);
  }

  return res.status(200).json(data);
};

const createNewSale = async (req, res) => {
  const { body } = req;
  
  const data = await saleService.createNewSale(body);

  return res.status(201).json(data);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const { status, data } = await saleService.deleteSale(id);

  return res.status(status).json(data);
};

const updateSale = async (req, res) => {
  const { saleId, productId } = req.params;
  const { quantity } = req.body;

  const { status, data } = await saleService.updateSale(saleId, productId, quantity);

  return res.status(status).json(data);
};

module.exports = { findAllSales, findSalesById, createNewSale, deleteSale, updateSale };