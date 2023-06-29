const { connection } = require('./connection');

const findAllSales = async () => {
  const [sales] = await connection.execute(
    `SELECT sales.id, sales.date, product.product_id AS productId, product.quantity
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

module.exports = { findAllSales, findSalesById };