import * as chai from "chai";
const expect = chai.expect;
import moment from "moment";

const endpoint = "orders";

describe(endpoint, async function () {
  it("should return orders created in date range for marketplace", async function () {
    let res = await this.sellingPartner.callAPI({
      operation: "getOrders",
      endpoint: endpoint,
      query: {
        MarketplaceIds: this.config.marketplace_id,
        CreatedBefore: moment().startOf("day").toISOString(),
        CreatedAfter: moment().startOf("day").subtract(1, "month").toISOString()
      }
    });
    expect(res).to.be.a("object");
    expect(moment(res.CreatedBefore).isValid()).to.equal(true);
    expect(res.Orders).to.be.a("array");
  });

  it("should return order for order id", async function () {
    if (this.config.order_id) {
      let res = await this.sellingPartner.callAPI({
        operation: "getOrder",
        endpoint: endpoint,
        path: {
          orderId: this.config.order_id
        }
      });
      expect(res).to.be.a("object");
      expect(res.AmazonOrderId).to.equal(this.config.order_id);
      expect(moment(res.PurchaseDate).isValid()).to.equal(true);
      expect(moment(res.LastUpdateDate).isValid()).to.equal(true);
      expect([
        "Pending",
        "Unshipped",
        "PartiallyShipped",
        "Shipped",
        "Canceled",
        "Unfulfillable",
        "InvoiceUnconfirmed",
        "PendingAvailability"
      ]).to.include(res.OrderStatus);
    } else {
      this.skip();
    }
  });

  it("should return buyer information for order id", async function () {
    if (this.config.order_id) {
      let res = await this.sellingPartner.callAPI({
        operation: "getOrderBuyerInfo",
        endpoint: endpoint,
        path: {
          orderId: this.config.order_id
        }
      });
      expect(res).to.be.a("object");
      expect(res.AmazonOrderId).to.equal(this.config.order_id);
    } else {
      this.skip();
    }
  });

  it("should return buyer information for order id", async function () {
    if (this.config.order_id) {
      let res = await this.sellingPartner.callAPI({
        operation: "getOrderAddress",
        endpoint: endpoint,
        path: {
          orderId: this.config.order_id
        }
      });
      expect(res).to.be.a("object");
      expect(res.AmazonOrderId).to.equal(this.config.order_id);
    } else {
      this.skip();
    }
  });

  it("should return order item information for order id", async function () {
    if (this.config.order_id) {
      let res = await this.sellingPartner.callAPI({
        operation: "getOrderItems",
        endpoint: endpoint,
        path: {
          orderId: this.config.order_id
        }
      });
      expect(res).to.be.a("object");
      expect(res.AmazonOrderId).to.equal(this.config.order_id);
      expect(res.OrderItems).to.be.a("array");
    } else {
      this.skip();
    }
  });

  it("should return buyer inforamtion in order items for order id", async function () {
    if (this.config.order_id) {
      let res = await this.sellingPartner.callAPI({
        operation: "getOrderItemsBuyerInfo",
        endpoint: endpoint,
        path: {
          orderId: this.config.order_id
        }
      });
      expect(res).to.be.a("object");
      expect(res.AmazonOrderId).to.equal(this.config.order_id);
      expect(res.OrderItems).to.be.a("array");
    } else {
      this.skip();
    }
  });
});
