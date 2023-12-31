const express = require('express');

const { productRoutes, salesRoutes } = require('./routes');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.use('/products', productRoutes);
app.use('/sales', salesRoutes);

module.exports = app;
