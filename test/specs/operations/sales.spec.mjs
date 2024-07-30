import * as chai from "chai";
const expect = chai.expect;
import moment from "moment";

const endpoint = "sales";

describe(endpoint, async function () {
  it("should return order metrics for date range aggregated by day", async function () {
    let res = await this.sellingPartner.callAPI({
      operation: "getOrderMetrics",
      endpoint: endpoint,
      query: {
        marketplaceIds: this.config.marketplace_id,
        interval:
          moment().startOf("day").subtract(1, "month").toISOString() +
          "--" +
          moment().toISOString(),
        granularity: "Day"
      }
    });
    expect(res).to.be.a("array");
  });
});
