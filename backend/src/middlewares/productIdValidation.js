const productService = require('../services/productService.service');

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

module.exports = { productIdRequired, validProductId };
