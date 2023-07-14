const quantityRequired = (req, res, next) => {
  const sale = req.body;

  const saleMap = sale.map((product) => product.quantity === undefined);
  if (saleMap.includes(true)) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  next();
};

const validQuantity = (req, res, next) => {
  const sales = req.body;
  const invalidSales = sales
    .some((sale) => sale.quantity <= 0 || typeof sale.quantity !== 'number');
    
  if (invalidSales) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  
  next();
};

const updateQuantity = (req, res, next) => {
  const { quantity } = req.body;
  if (quantity === undefined) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  if (quantity <= 0 || typeof quantity !== 'number') {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

module.exports = { quantityRequired, validQuantity, updateQuantity };