import * as chai from "chai";
const expect = chai.expect;
import moment from "moment";

const endpoint = "replenishment";

describe(endpoint, async function () {
  it("should return offers and pagination for last week", async function () {
    let res = await this.sellingPartner.callAPI({
      operation: "listOfferMetrics",
      endpoint: endpoint,
      body: {
        pagination: {
          limit: 10,
          offset: 0
        },
        filters: {
          marketplaceId: this.config.marketplace_id,
          programTypes: ["SUBSCRIBE_AND_SAVE"],
          aggregationFrequency: "WEEK",
          timeInterval: {
            startDate: moment()
              .subtract(7, "days")
              .startOf("week")
              .format("YYYY-MM-DD"),
            endDate: moment()
              .subtract(7, "days")
              .endOf("week")
              .format("YYYY-MM-DD")
          },
          timePeriodType: "PERFORMANCE"
        }
      }
    });
    expect(res).to.be.a("object");
    expect(res.offers).to.be.a("array");
    expect(res.pagination).to.be.a("object");
    expect(res.pagination.totalResults).to.be.a("number");
  });
});
