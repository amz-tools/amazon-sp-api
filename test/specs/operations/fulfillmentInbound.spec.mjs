import * as chai from "chai";
const expect = chai.expect;
import moment from "moment";

const endpoint = "fulfillmentInbound";

describe(endpoint, async function () {
  let inbound_plan_id;
  let shipment_id;

  it("should return a list of shipped inbound plans", async function () {
    let res = await this.sellingPartner.callAPI({
      operation: "listInboundPlans",
      endpoint: endpoint,
      query: {
        status: "SHIPPED"
      }
    });
    expect(res).to.be.a("object");
    expect(res.inboundPlans).to.be.a("array");
    if (res.inboundPlans[0]?.inboundPlanId)
      inbound_plan_id = res.inboundPlans[0].inboundPlanId;
  });

  it("should return inbound plan", async function () {
    if (inbound_plan_id) {
      let res = await this.sellingPartner.callAPI({
        operation: "getInboundPlan",
        endpoint: endpoint,
        path: {
          inboundPlanId: inbound_plan_id
        }
      });
      expect(res).to.be.a("object");
      expect(res.sourceAddress).to.be.a("object");
      expect(["ACTIVE", "VOIDED", "SHIPPED", "ERRORED"]).to.include(res.status);
      expect(res.shipments).to.be.a("array");
      if (res.shipments[0]?.shipmentId)
        shipment_id = res.shipments[0].shipmentId;
    } else {
      this.skip();
    }
  });

  it("should return inbound plan items", async function () {
    if (inbound_plan_id) {
      let res = await this.sellingPartner.callAPI({
        operation: "listInboundPlanItems",
        endpoint: endpoint,
        path: {
          inboundPlanId: inbound_plan_id
        }
      });
      expect(res).to.be.a("object");
      expect(res.items).to.be.a("array");
    } else {
      this.skip();
    }
  });

  it("should return inbound shipment", async function () {
    if (inbound_plan_id && shipment_id) {
      let res = await this.sellingPartner.callAPI({
        operation: "getShipment",
        endpoint: endpoint,
        path: {
          inboundPlanId: inbound_plan_id,
          shipmentId: shipment_id
        }
      });
      expect(res).to.be.a("object");
      expect(res.destination).to.be.a("object");
      expect(res.source).to.be.a("object");
      expect(res.placementOptionId).to.be.a("string").to.have.length(38);
    } else {
      this.skip();
    }
  });

  it("should return transportation options", async function () {
    if (inbound_plan_id && shipment_id) {
      let res = await this.sellingPartner.callAPI({
        operation: "listTransportationOptions",
        endpoint: endpoint,
        path: {
          inboundPlanId: inbound_plan_id
        },
        query: {
          shipmentId: shipment_id
        }
      });
      expect(res).to.be.a("object");
      expect(res.transportationOptions).to.be.a("array");
    } else {
      this.skip();
    }
  });
});
