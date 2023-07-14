const productService = require('../services/productService.service');
const salesService = require('../services/sales.service');

const productIdRequired = (req, res, next) => {
  const sale = req.body;
  const saleProduct = sale.every((product) => product.productId);
  
  if (!saleProduct) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  next();
};

const validProductId = async (req, res, next) => {
  const sales = req.body;
  const listProductsService = await productService.findAll();

  const allProductsId = listProductsService.map((product) => product.id);

  const salesId = sales.map((sale) => sale.productId);
  const salesIdValidation = salesId.every((id) => allProductsId.includes(id));
  if (!salesIdValidation) {
    return res.status(404).json({ message: 'Product not found' });
  }
  next();
};

const validSaleProduct = async (req, res, next) => {
  const { saleId, productId } = req.params;

  const mySale = await salesService.findSalesById(saleId);
  console.log(mySale);

  const productSaleValidation = mySale.find((product) => product.productId === +productId);
  console.log(productSaleValidation);

  if (!productSaleValidation) {
    return res.status(404).json({ message: 'Product not found in sale' });
  }
  next();
};

const validSale = async (req, res, next) => {
  const { saleId } = req.params;
  const mySale = await salesService.findSalesById(saleId);
  
  if (!Array.isArray(mySale)) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  next();
};

module.exports = { productIdRequired, validProductId, validSaleProduct, validSale };