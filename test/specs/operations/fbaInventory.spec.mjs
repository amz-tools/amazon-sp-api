import * as chai from "chai";
const expect = chai.expect;

// Only run tests for fbaInventory if region is "na"
// --> inventory summaries don't seem to be available in other regions
// --> comparable to ListInventorySupply in MWS API
const endpoint = "fbaInventory";

describe(endpoint, async function () {
  it("should return a list of inventory summaries for sku", async function () {
    if (this.config.sku) {
      let res = await this.sellingPartner.callAPI({
        operation: "getInventorySummaries",
        endpoint: endpoint,
        query: {
          details: true,
          sellerSkus: [this.config.sku],
          granularityType: "Marketplace",
          granularityId: this.config.marketplace_id,
          marketplaceIds: [this.config.marketplace_id]
        }
      });
      expect(res).to.be.a("object");
      expect(res.granularity).to.be.a("object");
      expect(res.inventorySummaries).to.be.a("array");
    } else {
      this.skip();
    }
  });
});
