import * as chai from "chai";
const expect = chai.expect;

const endpoint = "listingsRestrictions";

describe(endpoint, async function () {
  it("should return an array of restrictions", async function () {
    if (this.config.seller_id) {
      let res = await this.sellingPartner.callAPI({
        operation: "getListingsRestrictions",
        endpoint: endpoint,
        query: {
          sellerId: this.config.seller_id,
          asin: this.config.asin,
          marketplaceIds: this.config.marketplace_id
        }
      });
      expect(res).to.be.a("object");
      expect(res.restrictions).to.be.a("array");
    } else {
      this.skip();
    }
  });
});
