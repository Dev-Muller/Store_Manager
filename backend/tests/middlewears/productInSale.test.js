const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const saleService = require('../../src/services/sales.service');
const { validSaleProduct, validSale } = require('../../src/middlewares/productIdValidation');

describe('Teste das middlewares de venda', function () {
  describe('Teste da middleware de produtos em uma sale e sale existente', function () {
    it('testa se uma sale existe', async function () {
      sinon.stub(saleService, 'findSalesById').resolves({ message: 'Sale not found' });

      const req = {
        params: [{
          saleId: 150,
        }],
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returnsThis(),
      };
      const next = sinon.stub();

      await validSale(req, res, next);

      expect(res.status).to.be.calledWith(404);
      expect(res.json).to.be.calledWith({ message: 'Sale not found' });
    });

    it('testa se existe um produto numa sale', async function () {
      sinon.stub(saleService, 'findSalesById').resolves([
        {
          date: '2023-07-11T16:29:44.000Z',
          productId: 1,
          quantity: 20,
        },
        {
          date: '2023-07-11T16:29:44.000Z',
          productId: 2,
          quantity: 10,
        },
      ]);

      const req = {
        params: [{
          saleId: 1,
          productId: 100,
        }],
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returnsThis(),
      };
      const next = sinon.stub();

      await validSaleProduct(req, res, next);

      expect(res.status).to.be.calledWith(404);
      expect(res.json).to.be.calledWith({ message: 'Product not found in sale' });
    });
  });
  afterEach(function () {
    sinon.restore();
  });
});