import * as chai from "chai";
const expect = chai.expect;

const endpoint = "productPricing";

describe(endpoint, async function () {
  it("should return pricing information for asin", async function () {
    let res = await this.sellingPartner.callAPI({
      operation: "getPricing",
      endpoint: endpoint,
      query: {
        MarketplaceId: this.config.marketplace_id,
        Asins: this.config.asin,
        ItemType: "Asin"
      }
    });
    expect(res).to.be.a("array");
    expect(res[0].status).to.be.a("string");
    expect(res[0].ASIN).to.equal(this.config.asin);
  });

  it("should return pricing information for asins array", async function () {
    if (this.config.asin2) {
      let asins = [this.config.asin, this.config.asin2];
      let res = await this.sellingPartner.callAPI({
        operation: "getPricing",
        endpoint: endpoint,
        query: {
          MarketplaceId: this.config.marketplace_id,
          Asins: asins,
          ItemType: "Asin"
        }
      });
      expect(res).to.be.a("array");
      expect(res).to.have.lengthOf(2);
      res.map((res_val) => {
        expect(res_val.status).to.be.a("string");
        expect(asins).to.include(res_val.ASIN);
      });
    } else {
      this.skip();
    }
  });

  it("should return pricing information for sku", async function () {
    if (this.config.sku) {
      let res = await this.sellingPartner.callAPI({
        operation: "getPricing",
        endpoint: endpoint,
        query: {
          MarketplaceId: this.config.marketplace_id,
          Skus: this.config.sku,
          ItemType: "Sku"
        }
      });
      expect(res).to.be.a("array");
      expect(res[0].status).to.be.a("string");
      expect(res[0].SellerSKU).to.equal(this.config.sku);
    } else {
      this.skip();
    }
  });

  it("should return pricing information for skus array", async function () {
    if (this.config.sku2) {
      let skus = [this.config.sku, this.config.sku2];
      let res = await this.sellingPartner.callAPI({
        operation: "getPricing",
        endpoint: endpoint,
        query: {
          MarketplaceId: this.config.marketplace_id,
          Skus: skus,
          ItemType: "Sku"
        }
      });
      expect(res).to.be.a("array");
      expect(res).to.have.lengthOf(2);
      res.map((res_val) => {
        expect(res_val.status).to.be.a("string");
        expect(skus).to.include(res_val.SellerSKU);
      });
    } else {
      this.skip();
    }
  });

  it("should return competitive pricing information for asin", async function () {
    let res = await this.sellingPartner.callAPI({
      operation: "getCompetitivePricing",
      endpoint: endpoint,
      query: {
        MarketplaceId: this.config.marketplace_id,
        Asins: this.config.asin,
        ItemType: "Asin"
      }
    });
    expect(res).to.be.a("array");
    expect(res[0].status).to.be.a("string");
    expect(res[0].ASIN).to.equal(this.config.asin);
  });

  it("should return competitive pricing information for sku", async function () {
    if (this.config.sku) {
      let res = await this.sellingPartner.callAPI({
        operation: "getCompetitivePricing",
        endpoint: endpoint,
        query: {
          MarketplaceId: this.config.marketplace_id,
          Skus: this.config.sku,
          ItemType: "Sku"
        }
      });
      expect(res).to.be.a("array");
      expect(res[0].status).to.be.a("string");
      expect(res[0].SellerSKU).to.equal(this.config.sku);
    } else {
      this.skip();
    }
  });

  // Docs wrong! --> https://github.com/amzn/selling-partner-api-docs/blob/main/references/product-pricing-api/productPricingV0.md#getoffersresult
  // Marketplace is NOT capitalized in response
  // It should always return an offers array, but if we put in an item condition without offers it is not included in response
  it("should return lowest priced offers for sku", async function () {
    if (this.config.sku) {
      let res = await this.sellingPartner.callAPI({
        operation: "getListingOffers",
        endpoint: endpoint,
        path: {
          SellerSKU: this.config.sku
        },
        query: {
          MarketplaceId: this.config.marketplace_id,
          ItemCondition: "New"
        }
      });
      expect(res).to.be.a("object");
      expect(res.marketplaceId).to.equal(this.config.marketplace_id);
      expect(res.SKU).to.equal(this.config.sku);
      expect(res.ItemCondition).to.equal("New");
      expect(res.status).to.be.a("string");
      expect(res.Identifier).to.be.a("object");
      expect(res.Summary).to.be.a("object");
      // expect(res.Offers).to.be.a('array');
    } else {
      this.skip();
    }
  });

  // Docs wrong! --> https://github.com/amzn/selling-partner-api-docs/blob/main/references/product-pricing-api/productPricingV0.md#getoffersresult
  // Marketplace is NOT capitalized in response
  // It should always return an offers array, but if we put in an item condition without offers it is not included in response
  it("should return lowest priced offers for asin", async function () {
    let res = await this.sellingPartner.callAPI({
      operation: "getItemOffers",
      endpoint: endpoint,
      path: {
        Asin: this.config.asin
      },
      query: {
        MarketplaceId: this.config.marketplace_id,
        ItemCondition: "New"
      }
    });
    expect(res).to.be.a("object");
    expect(res.marketplaceId).to.equal(this.config.marketplace_id);
    expect(res.ASIN).to.equal(this.config.asin);
    expect(res.ItemCondition).to.equal("New");
    expect(res.status).to.be.a("string");
    expect(res.Identifier).to.be.a("object");
    expect(res.Summary).to.be.a("object");
    // expect(res.Offers).to.be.a('array');
  });

  it("should return lowest priced offers for asin as batch request", async function () {
    let res = await this.sellingPartner.callAPI({
      operation: "getItemOffersBatch",
      endpoint: endpoint,
      body: {
        requests: [
          {
            uri: "/products/pricing/v0/items/" + this.config.asin + "/offers",
            method: "GET",
            queryParams: {
              MarketplaceId: this.config.marketplace_id,
              ItemCondition: "New"
            }
          }
        ]
      }
    });
    expect(res).to.be.a("object");
    expect(res.responses).to.be.a("array");
    expect(res.responses).to.have.lengthOf(1);
  });

  it("should return lowest priced offers for sku as batch request", async function () {
    if (this.config.sku) {
      let res = await this.sellingPartner.callAPI({
        operation: "getListingOffersBatch",
        endpoint: endpoint,
        body: {
          requests: [
            {
              uri:
                "/products/pricing/v0/listings/" + this.config.sku + "/offers",
              method: "GET",
              queryParams: {
                MarketplaceId: this.config.marketplace_id,
                ItemCondition: "New"
              }
            }
          ]
        }
      });
      expect(res).to.be.a("object");
      expect(res.responses).to.be.a("array");
      expect(res.responses).to.have.lengthOf(1);
    } else {
      this.skip();
    }
  });

  it("should return ClientError status for special chars skus array", async function () {
    let skus = ["#+ =?~_-|/!*?()", "@#+ =?~_-|/!*?[]"];
    let res = await this.sellingPartner.callAPI({
      operation: "getPricing",
      endpoint: endpoint,
      query: {
        MarketplaceId: this.config.marketplace_id,
        Skus: skus,
        ItemType: "Sku"
      }
    });
    expect(res).to.be.a("array");
    expect(res).to.have.lengthOf(2);
    res.map((res_val) => {
      expect(res_val.status).to.be.equal("ClientError");
    });
  });

  it("should return a featured offer expected price for sku as batch request", async function () {
    let res = await this.sellingPartner.callAPI({
      operation: "getFeaturedOfferExpectedPriceBatch",
      endpoint: "productPricing",
      body: {
        requests: [
          {
            uri: "/products/pricing/2022-05-01/offer/featuredOfferExpectedPrice",
            method: "GET",
            marketplaceId: this.config.marketplace_id,
            sku: this.config.sku
          }
        ]
      }
    });
    expect(res).to.be.a("object");
    expect(res.responses).to.be.a("array");
    expect(res.responses).to.have.lengthOf(1);
    expect(res.responses[0].request).to.be.a("object");
    expect(res.responses[0].request.marketplaceId).to.equal(
      this.config.marketplace_id
    );
    expect(res.responses[0].request.sku).to.equal(this.config.sku);
  });

  it("should return featured buying options as batch request", async function () {
    let res = await this.sellingPartner.callAPI({
      operation: "getCompetitiveSummary",
      endpoint: "productPricing",
      body: {
        requests: [
          {
            uri: "/products/pricing/2022-05-01/items/competitiveSummary",
            method: "GET",
            marketplaceId: this.config.marketplace_id,
            asin: this.config.asin,
            includedData: ["featuredBuyingOptions"]
          }
        ]
      }
    });
    expect(res).to.be.a("object");
    expect(res.responses).to.be.a("array");
    expect(res.responses).to.have.lengthOf(1);
    expect(res.responses[0].body).to.be.a("object");
    expect(res.responses[0].body.marketplaceId).to.equal(
      this.config.marketplace_id
    );
    expect(res.responses[0].body.featuredBuyingOptions).to.be.a("array");
    expect(res.responses[0].status.reasonPhrase).to.equal("Success");
    expect(res.responses[0].status.statusCode).to.equal(200);
  });
});
