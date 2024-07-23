import * as chai from "chai";
const expect = chai.expect;

const endpoint = "sellers";

describe(endpoint, async function () {
  it("should return list of marketplaces the seller can sell in", async function () {
    let res = await this.sellingPartner.callAPI({
      operation: "getMarketplaceParticipations",
      endpoint: endpoint
    });
    expect(res).to.be.a("array");
  });

  it("should return list of marketplaces the seller can sell in as raw result", async function () {
    let res = await this.sellingPartner.callAPI({
      operation: "getMarketplaceParticipations",
      endpoint: endpoint,
      options: {
        raw_result: true
      }
    });
    expect(res).to.be.a("object");
    expect(res.body).to.be.a("string");
    expect(res.chunks).to.be.a("array");
    expect(res.statusCode).to.equal(200);
    expect(res.headers).to.be.a("object");
  });
});
