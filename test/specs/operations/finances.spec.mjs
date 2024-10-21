import * as chai from "chai";
const expect = chai.expect;
import moment from "moment";

const endpoint = "finances";

describe(endpoint, async function () {
  let event_group_id;

  it("should return financial event groups for date range", async function () {
    let res = await this.sellingPartner.callAPI({
      operation: "listFinancialEventGroups",
      endpoint: endpoint,
      query: {
        FinancialEventGroupStartedBefore: moment().startOf("day").toISOString(),
        FinancialEventGroupStartedAfter: moment()
          .startOf("day")
          .subtract(2, "months")
          .toISOString()
      }
    });
    expect(res).to.be.a("object");
    expect(res.FinancialEventGroupList).to.be.a("array");

    if (res.FinancialEventGroupList[0]) {
      event_group_id = res.FinancialEventGroupList[0].FinancialEventGroupId;
    }
  });

  it("should return financial events for event group", async function () {
    if (event_group_id) {
      let res = await this.sellingPartner.callAPI({
        operation: "listFinancialEventsByGroupId",
        endpoint: endpoint,
        path: {
          eventGroupId: event_group_id
        }
      });
      expect(res).to.be.a("object");
      expect(res.FinancialEvents).to.be.a("object");
    } else {
      this.skip();
    }
  });

  it("should return financial events for order", async function () {
    if (this.config.order_id) {
      let res = await this.sellingPartner.callAPI({
        operation: "listFinancialEventsByOrderId",
        endpoint: endpoint,
        path: {
          orderId: this.config.order_id
        }
      });
      expect(res).to.be.a("object");
      expect(res.FinancialEvents).to.be.a("object");
    } else {
      this.skip();
    }
  });

  it("should return financial events for date range", async function () {
    let res = await this.sellingPartner.callAPI({
      operation: "listFinancialEvents",
      endpoint: endpoint,
      query: {
        PostedBefore: moment().startOf("day").toISOString(),
        PostedAfter: moment().startOf("day").subtract(2, "months").toISOString()
      }
    });
    expect(res).to.be.a("object");
    expect(res.FinancialEvents).to.be.a("object");
  });
});
