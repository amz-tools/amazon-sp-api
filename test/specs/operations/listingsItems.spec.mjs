import * as chai from "chai";
const expect = chai.expect;

const endpoint = "listingsItems";

describe(endpoint, async function () {
  it("should return a not found error for special chars sku", async function () {
    if (this.config.seller_id) {
      let sku = "#+ =,?~_-|/!*?()";
      try {
        let res = await this.sellingPartner.callAPI({
          operation: "getListingsItem",
          endpoint: endpoint,
          path: {
            sellerId: this.config.seller_id,
            sku: sku
          },
          query: {
            marketplaceIds: this.config.marketplace_id
          }
        });
      } catch (e) {
        expect(e).to.be.an("error");
        expect(e.code).to.equal("NOT_FOUND");
        expect(e.message).to.include(sku);
      }
    } else {
      this.skip();
    }
  });
  it("should return listings items", async function () {
    if (this.config.seller_id) {
      let res = await this.sellingPartner.callAPI({
        operation: "searchListingsItems",
        endpoint: endpoint,
        path: {
          sellerId: this.config.seller_id
        },
        query: {
          marketplaceIds: this.config.marketplace_id
        }
      });
      expect(res).to.be.a("object");
      expect(res.numberOfResults).to.be.a("number");
      expect(res.items).to.be.a("array");
    } else {
      this.skip();
    }
  });
});
