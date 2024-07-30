import * as chai from "chai";
const expect = chai.expect;
import moment from "moment";

const endpoint = "fulfillmentOutbound";

describe(endpoint, async function () {
  let seller_fulfillment_order_id;

  it("should return fulfillment outbound orders fulfilled after date", async function () {
    let res = await this.sellingPartner.callAPI({
      operation: "listAllFulfillmentOrders",
      endpoint: endpoint,
      query: {
        queryStartDate: moment()
          .startOf("day")
          .subtract(1, "month")
          .toISOString()
      }
    });
    expect(res).to.be.a("object");
    expect(res.fulfillmentOrders).to.be.a("array");

    if (res.fulfillmentOrders[0]) {
      seller_fulfillment_order_id =
        res.fulfillmentOrders[0].sellerFulfillmentOrderId;
    }
  });

  it("should return fulfillment outbound order for fulfillment order id", async function () {
    if (seller_fulfillment_order_id) {
      let res = await this.sellingPartner.callAPI({
        operation: "getFulfillmentOrder",
        endpoint: endpoint,
        path: {
          sellerFulfillmentOrderId: seller_fulfillment_order_id
        }
      });
      expect(res).to.be.a("object");
      expect(res.fulfillmentOrder).to.be.a("object");
      expect(res.fulfillmentOrder.sellerFulfillmentOrderId).to.equal(
        seller_fulfillment_order_id
      );
      expect(res.fulfillmentOrderItems).to.be.a("array");
      expect(res.fulfillmentShipments).to.be.a("array");
      expect(res.returnItems).to.be.a("array");
      expect(res.returnAuthorizations).to.be.a("array");
    } else {
      this.skip();
    }
  });

  it("should return return reason codes for sku for marketplace", async function () {
    let res = await this.sellingPartner.callAPI({
      operation: "listReturnReasonCodes",
      endpoint: endpoint,
      query: {
        sellerSku: this.config.sku,
        marketplaceId: this.config.marketplace_id,
        language: this.config.country_code
      }
    });
    expect(res).to.be.a("object");
    expect(res.ReasonCodeDetailsList).to.be.a("array");
  });

  it("should return features available for multi-channel fulfillment for marketplace", async function () {
    try {
      let res = await this.sellingPartner.callAPI({
        operation: "getFeatures",
        endpoint: endpoint,
        query: {
          marketplaceId: this.config.marketplace_id
        }
      });
      expect(res).to.be.a("object");
      expect(res.features).to.be.a("array");
    } catch (e) {
      expect(e).to.have.property("message");
      expect([
        "API not available in region",
        "Region does not support feature: BLANK_BOX"
      ]).to.include(e.message);
    }
  });
});
