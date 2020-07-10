const config = require('config');
const assert = require('chai').assert

const badMembers = require('./mock').badMembers
const badElements = require('./mock').badElements
const goodElements = require('./mock').goodElements
const index = require('../index')


const quotations = require('./quotation.mock').quotations
// const index = require('../index')


describe('flectra connect', function () {
    it('should return undefined', function () {
        assert.isUndefined(flectra.flectra.userConnected);
    });
    it('should return the id user connected', async function () {
        await flectra.connect();
        assert.isNumber(flectra.flectra.userConnected);
    });
});

describe('formatDate()', function () {
    it('should return date', function () {
        let date = flectra.formatDate("2020-04-12T05:52:01.000Z");
        assert.strictEqual("2020-04-12 5:52:1", date);
    });
    it('should return date', function () {
        let date = flectra.formatDate("2020-04-12T11:05:63.000Z");
        assert.strictEqual("2020-04-12 11:6:3", date);
    });
    it('should return date', function () {
        let date = flectra.formatDate(new Date("2020-04-12T09:28:23.000Z"));
        assert.strictEqual("2020-04-12 9:28:0", date);
    });
});

describe('getAccount()', function () {
    it('should return the account id', async function () {
        let account = await flectra.getAccount();
        assert.isNumber(account.id);
    });
    it('should return the account id', async function () {
        let account = await flectra.getAccount("105.01.01");
        assert.isNumber(account.id);
    });
    it('should return undefined', async function () {
        let account = await flectra.getAccount("0.0.0");
        assert.isUndefined(account);
    });
});

describe('getProduct()', function () {
    it('should return the product id', async function () {
        let product = await flectra.getProduct();
        assert.isNumber(product.id);
    });
    it('should return the product id', async function () {
        let product = await flectra.getProduct("Down payment");
        assert.isNumber(product.id);
    });
    it('should return undefined', async function () {
        let product = await flectra.getProduct("Not Product");
        assert.isUndefined(product);
    });
});

describe('getPaymentTerms()', function () {
    it('should return the payment terms id', async function () {
        let paymentTerms = await flectra.getPaymentTerms();
        assert.isNumber(paymentTerms.id);
    });
    it('should return the payment terms id', async function () {
        let paymentTerms = await flectra.getPaymentTerms("Immediate Payment");
        assert.isNumber(paymentTerms.id);
    });
    it('should return undefined', async function () {
        let paymentTerms = await flectra.getPaymentTerms("Not Payment");
        assert.isUndefined(paymentTerms);
    });
});

describe('getClient()', function () {
    it('should return the client id', async function () {
        let client = await flectra.getClient(quotations[0]);
        assert.isNumber(client.id)
    });
    it('should return undefined', async function () {
        let client = await flectra.getClient(quotations[1]);
        assert.isUndefined(client)
    });
    it('should return the client id', async function () {
        let client = await flectra.getClient(quotations[2]);
        assert.isNumber(client.id)
    });
});

describe('getAgent()', function () {
    it('should return the agent id', async function () {
        let agent = await flectra.getAgent(quotations[0]);
        assert.isNumber(agent.id)
    });
    it('should return undefined', async function () {
        let agent = await flectra.getAgent(quotations[1]);
        assert.isUndefined(agent)
    });
    it('should return the agent id', async function () {
        let agent = await flectra.getAgent(quotations[2]);
        assert.isNumber(agent.id)
    });
});

describe('getCurrency()', function () {
    it('should return the currency id', async function () {
        let currency = await flectra.getCurrency("USD");
        assert.isNumber(currency.id)
    });
    it('should return undefined', async function () {
        let currency = await flectra.getCurrency("CUP");
        assert.isUndefined(currency)
    });
    it('should return the currency id', async function () {
        let currency = await flectra.getCurrency("EUR");
        assert.isNumber(currency.id)
    });
});

describe('getInvoice()', function () {
    it('should return invoice id', async function () {
        let currency = await flectra.getInvoice("TPV: (Invoice => TEST)");
        assert.isNumber(currency.id)
    });
    it('should return undefined', async function () {
        let currency = await flectra.getInvoice("TPV: (Invoice => Does not exist)");
        assert.isUndefined(currency)
    });
});

describe('agentpaymentToInvoices()', function () {
    it('should return the new invoice id', async function () {
        let invoice = await flectra.agentpaymentToInvoices(quotations[0]);
        assert.isNumber(invoice)
    });
    it('should return - Invoice already exist!: {invoice name}', async function () {
        let invoice = await flectra.agentpaymentToInvoices(quotations[0]);
        assert.include(invoice, "Invoice already exist!: ")
    });
});

