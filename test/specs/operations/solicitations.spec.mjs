import * as chai from "chai";
const expect = chai.expect;

const endpoint = "solicitations";

describe(endpoint, async function () {
  it("should return list of solicitation types available for order", async function () {
    if (this.config.order_id) {
      let res = await this.sellingPartner.callAPI({
        operation: "getSolicitationActionsForOrder",
        endpoint: endpoint,
        path: {
          amazonOrderId: this.config.order_id
        },
        query: {
          marketplaceIds: this.config.marketplace_id
        }
      });
      expect(res).to.be.a("object");
      if (res.errors) {
        expect(res.errors).to.be.a("array");
      } else {
        expect(res._links).to.be.a("object");
        expect(res._links.actions).to.be.a("array");
        expect(res._links.self).to.be.a("object");
        expect(res._links.self.href).to.be.a("string");
      }
    } else {
      this.skip();
    }
  });
});
