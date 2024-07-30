import * as chai from "chai";
const expect = chai.expect;

const endpoint = "productTypeDefinitions";

describe(endpoint, async function () {
  let product_type;

  it("should return a list of product types", async function () {
    let res = await this.sellingPartner.callAPI({
      operation: "searchDefinitionsProductTypes",
      endpoint: endpoint,
      query: {
        marketplaceIds: [this.config.marketplace_id]
      }
    });
    expect(res).to.be.a("object");
    expect(res.productTypes).to.be.a("array");
    if (res.productTypes[0]) {
      product_type = res.productTypes[0].name;
    }
  });

  it("should return a product type definition", async function () {
    if (product_type) {
      let res = await this.sellingPartner.callAPI({
        operation: "getDefinitionsProductType",
        endpoint: endpoint,
        path: {
          productType: product_type
        },
        query: {
          marketplaceIds: [this.config.marketplace_id]
        }
      });
      expect(res).to.be.a("object");
      expect(res.schema).to.be.a("object");
      expect([
        "LISTING",
        "LISTING_PRODUCT_ONLY",
        "LISTING_OFFER_ONLY"
      ]).to.include(res.requirements);
      expect(["ENFORCED", "NOT_ENFORCED"]).to.include(res.requirementsEnforced);
      expect(res.locale).to.be.a("string");
      expect(res.marketplaceIds).to.be.a("array");
      expect(res.productType).to.be.a("string");
      expect(res.productTypeVersion).to.be.a("object");
    } else {
      this.skip();
    }
  });
});
