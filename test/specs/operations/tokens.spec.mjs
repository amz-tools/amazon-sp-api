import * as chai from "chai";
const expect = chai.expect;

const endpoint = "tokens";

describe(endpoint, async function () {
  it("should return a restricted data token or an access denied error", async function () {
    try {
      let res = await this.sellingPartner.callAPI({
        operation: "createRestrictedDataToken",
        endpoint: endpoint,
        body: {
          restrictedResources: [
            {
              path: "/orders/v0/orders",
              method: "GET",
              dataElements: ["buyerInfo", "shippingAddress"]
            }
          ]
        }
      });
      expect(res).to.be.a("object");
      expect(res.restrictedDataToken).to.be.a("string");
      expect(res.expiresIn).to.be.a("number");
    } catch (e) {
      expect(e).to.be.an("error");
      expect(e.message).to.equal(
        "Application does not have access to one or more requested data elements: [buyerInfo, shippingAddress]"
      );
    }
  });
});
