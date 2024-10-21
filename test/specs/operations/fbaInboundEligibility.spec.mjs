import * as chai from "chai";
const expect = chai.expect;

const endpoint = "fbaInboundEligibility";

describe(endpoint, async function () {
  it("should return inbound eligibility preview for asin", async function () {
    let res = await this.sellingPartner.callAPI({
      operation: "getItemEligibilityPreview",
      endpoint: endpoint,
      query: {
        marketplaceIds: this.config.marketplace_id,
        asin: this.config.asin,
        program: "INBOUND"
      }
    });
    expect(res).to.be.a("object");
    expect(res.asin).to.equal(this.config.asin);
    expect(res.marketplaceId).to.equal(this.config.marketplace_id);
    expect(res.program).to.equal("INBOUND");
    expect(res.isEligibleForProgram).to.be.a("boolean");
  });

  it("should return commingling eligibility preview for asin", async function () {
    let res = await this.sellingPartner.callAPI({
      operation: "getItemEligibilityPreview",
      endpoint: endpoint,
      query: {
        asin: this.config.asin,
        program: "COMMINGLING"
      }
    });
    expect(res).to.be.a("object");
    expect(res.asin).to.equal(this.config.asin);
    expect(res.program).to.equal("COMMINGLING");
    expect(res.isEligibleForProgram).to.be.a("boolean");
  });
});
