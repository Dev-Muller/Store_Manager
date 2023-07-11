const { connection } = require('./connection');

const findAllSales = async () => {
  const [sales] = await connection.execute(
    `SELECT sales.id AS saleId,
    sales.date AS date, product.product_id AS productId, product.quantity AS quantity
    FROM StoreManager.sales AS sales
    join StoreManager.sales_products AS product ON sales.id = product.sale_id
    ORDER BY sales.id, productId`,
  );
  return sales;
};

const findSalesById = async (saleId) => {
  const [sales] = await connection
    .execute(`SELECT sales.date, product.product_id AS productId, product.quantity 
    FROM StoreManager.sales AS sales
    join StoreManager.sales_products AS product ON sales.id = product.sale_id 
    WHERE sales.id = ? ORDER BY sales.id, productId`, [saleId]);
  return sales;
};

const createNewSale = async (saleId, productId, quantity) => {
  const [sale] = await connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );

  return { id: sale.insertId, productId, quantity };
};

const getSaleId = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUES (NOW())',
  );
  return insertId;
};

const deleteSale = async (id) => {
  await connection.execute(
    'DELETE FROM sales WHERE id = ?',
    [id],
  );
};

module.exports = { findAllSales, findSalesById, createNewSale, getSaleId, deleteSale };