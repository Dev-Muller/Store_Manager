const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

// const salesFromDB = require('../unit/mocks/sales.mock');
const productService = require('../../src/services/productService.service');
const { validProductId, productIdRequired } = require('../../src/middlewares/productIdValidation');

describe('Teste das middlewares de venda', function () {
  describe('Teste da middleware productIdRequired', function () {
    it('deve chamar a próxima função se todos os produtos possuem productId', function () {
      const req = {
        body: [
          { productId: 1 },
          { productId: 2 },
          { productId: 3 },
        ],
      };
      const res = {};
      const next = sinon.spy();

      productIdRequired(req, res, next);
    });

    it('deve retornar um erro de status 400 se algum produto não possui productId', function () {
      const req = {
        body: [
          { productId: 1 },
          { name: 'Product 2' },
          { productId: 3 },
        ],
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      const next = sinon.spy();

      productIdRequired(req, res, next);

      expect(res.status).to.be.calledWith(400);
      expect(res.json).to.be.calledWith({ message: '"productId" is required' });
    });
  });

  describe('Teste da middleware validProductId', function () {
    it('deve chamar a próxima função se todos os produtos possuem IDs válidos', async function () {
      const req = {
        body: [
          { productId: 1 },
          { productId: 2 },
          { productId: 3 },
        ],
      };
      const res = {};
      const next = sinon.spy();

      // Crie um stub para a função `findAll` do `productService` que retorna uma lista de produtos válidos
      const findAllStub = sinon.stub(productService, 'findAll').resolves([
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ]);

      await validProductId(req, res, next);

      findAllStub.restore();
    });

    it('deve retornar um erro de status 404 se algum produto possui um ID inválido', async function () {
      const req = {
        body: [
          { productId: 1 },
          { productId: 5 },
          { productId: 3 },
        ],
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      const next = sinon.spy();

      // Crie um stub para a função `findAll` do `productService` que retorna uma lista de produtos válidos
      const findAllStub = sinon.stub(productService, 'findAll').resolves([
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ]);

      await validProductId(req, res, next);

      expect(res.status).to.be.calledWith(404);
      expect(res.json).to.be.calledWith({ message: 'Product not found' });

      findAllStub.restore();
    });
  });
});