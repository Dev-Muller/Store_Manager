const { connection } = require('./connection');

const findAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products',
  );
  return products;
};

const findById = async (productId) => {
  const [[product]] = await connection.execute('SELECT * FROM products WHERE id = ?', [productId]);
  return product;
};

const createNewProduct = async (productDataObject) => {
  const name = productDataObject;
  const [product] = await connection.execute(
    'INSERT INTO products (name) VALUES (?)',
    [name],
  );
  console.log(product);
  return { id: product.insertId, name };
};

module.exports = { findAll, findById, createNewProduct };