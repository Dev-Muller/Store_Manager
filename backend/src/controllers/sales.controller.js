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

module.exports = { findAllSales, findSalesById };