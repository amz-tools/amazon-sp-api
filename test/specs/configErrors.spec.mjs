import { SellingPartner } from "../../index.js";
import * as chai from "chai";
const expect = chai.expect;

describe("configErrors", async function () {
  it("should return a missing refresh token error", async function () {
    try {
      new SellingPartner({
        region: this.config.region
      });
    } catch (e) {
      expect(e).to.be.an("error");
      expect(e.code).to.equal("NO_REFRESH_TOKEN_PROVIDED");
    }
  });

  it("should return an invalid region error", async function () {
    try {
      new SellingPartner({
        region: "de",
        refresh_token: this.config.refresh_token
      });
    } catch (e) {
      expect(e).to.be.an("error");
      expect(e.code).to.equal("NO_VALID_REGION_PROVIDED");
    }
  });

  it("should return a no operation given error", async function () {
    try {
      const spClient = new SellingPartner({
        region: this.config.region,
        refresh_token: this.config.refresh_token,
        access_token: this.config.access_token
      });
      await spClient.callAPI({});
    } catch (e) {
      expect(e).to.be.an("error");
      expect(e.code).to.equal("NO_OPERATION_GIVEN");
    }
  });

  it("should return an invalid operation error", async function () {
    try {
      const spClient = new SellingPartner({
        region: this.config.region,
        refresh_token: this.config.refresh_token,
        access_token: this.config.access_token,
        options: {
          only_grantless_operations: true
        }
      });
      await spClient.callAPI({
        operation: "sellers.getMarketplaceParticipations"
      });
    } catch (e) {
      expect(e).to.be.an("error");
      expect(e.code).to.equal("INVALID_OPERATION_ERROR");
    }
  });

  it("should return an endpoint not given error", async function () {
    try {
      const spClient = new SellingPartner({
        region: this.config.region,
        refresh_token: this.config.refresh_token,
        access_token: this.config.access_token
      });
      await spClient.callAPI({
        operation: "getMarketplaceParticipations"
      });
    } catch (e) {
      expect(e).to.be.an("error");
      expect(e.code).to.equal("NO_ENDPOINT_GIVEN");
    }
  });

  it("should return an endpoint not found error", async function () {
    try {
      const spClient = new SellingPartner({
        region: this.config.region,
        refresh_token: this.config.refresh_token,
        access_token: this.config.access_token
      });
      await spClient.callAPI({
        operation: "getMarketplaceParticipations",
        endpoint: "invalidEndpoint"
      });
    } catch (e) {
      expect(e).to.be.an("error");
      expect(e.code).to.equal("ENDPOINT_NOT_FOUND");
    }
  });

  it("should return an invalid operation for endpoint error", async function () {
    try {
      const spClient = new SellingPartner({
        region: this.config.region,
        refresh_token: this.config.refresh_token,
        access_token: this.config.access_token
      });
      await spClient.callAPI({
        operation: "getMarketplaceParticipations",
        endpoint: "catalogItems"
      });
    } catch (e) {
      expect(e).to.be.an("error");
      expect(e.code).to.equal("INVALID_OPERATION_FOR_ENDPOINT");
    }
  });

  it("should return a no scope error", async function () {
    try {
      const spClient = new SellingPartner({
        region: this.config.region,
        options: {
          only_grantless_operations: true
        }
      });
      await spClient.refreshAccessToken();
    } catch (e) {
      expect(e).to.be.an("error");
      expect(e.code).to.equal("NO_SCOPE_PROVIDED");
    }
  });

  it("should return a no access token error", async function () {
    try {
      const spClient = new SellingPartner({
        region: this.config.region,
        refresh_token: this.config.refresh_token,
        options: {
          auto_request_tokens: false
        }
      });
      await spClient.callAPI({
        operation: "sellers.getMarketplaceParticipations"
      });
    } catch (e) {
      expect(e).to.be.an("error");
      expect(e.code).to.equal("NO_ACCESS_TOKEN_PRESENT");
    }
  });

  it("should return a no operation given error", async function () {
    try {
      const spClient = new SellingPartner({
        region: this.config.region,
        refresh_token: this.config.refresh_token
      });
      await spClient.callAPI({});
    } catch (e) {
      expect(e).to.be.an("error");
      expect(e.code).to.equal("NO_OPERATION_GIVEN");
    }
  });

  it("should return an invalid refresh token error", async function () {
    try {
      const spClient = new SellingPartner({
        region: this.config.region,
        refresh_token: "invalidRefreshToken"
      });
      await spClient.callAPI({
        operation: "sellers.getMarketplaceParticipations"
      });
    } catch (e) {
      expect(e).to.be.an("error");
      expect(e.code).to.equal("invalid_grant");
    }
  });

  it("should return an invalid method error", async function () {
    try {
      const spClient = new SellingPartner({
        region: this.config.region,
        refresh_token: this.config.refresh_token
      });
      await spClient.callAPI({
        api_path: "/sellers/v1/marketplaceParticipations"
      });
    } catch (e) {
      expect(e).to.be.an("error");
      expect(e.code).to.equal("NO_VALID_METHOD_PROVIDED");
    }
  });

  it("should return an invalid endpoints error", async function () {
    try {
      new SellingPartner({
        region: this.config.region,
        refresh_token: this.config.refresh_token,
        endpoints_versions: {
          invalidEndpoint: "v0"
        }
      });
    } catch (e) {
      expect(e).to.be.an("error");
      expect(e.code).to.equal("VERSION_DEFINED_FOR_INVALID_ENDPOINTS");
    }
  });

  it("should return an invalid version for endpoints error", async function () {
    try {
      new SellingPartner({
        region: this.config.region,
        refresh_token: this.config.refresh_token,
        endpoints_versions: {
          sellers: "unknownVersion"
        }
      });
    } catch (e) {
      expect(e).to.be.an("error");
      expect(e.code).to.equal("INVALID_VERSION_FOR_ENDPOINTS");
    }
  });

  it("should return an invalid version error", async function () {
    try {
      const spClient = new SellingPartner({
        region: this.config.region,
        refresh_token: this.config.refresh_token
      });
      await spClient.callAPI({
        operation: "getMarketplaceParticipations",
        endpoint: "sellers",
        options: {
          version: "unknownVersion"
        }
      });
    } catch (e) {
      expect(e).to.be.an("error");
      expect(e.code).to.equal("INVALID_VERSION");
    }
  });

  it("should return an operation not found for version error", async function () {
    try {
      const spClient = new SellingPartner({
        region: this.config.region,
        refresh_token: this.config.refresh_token,
        options: {
          version_fallback: false
        }
      });
      await spClient.callAPI({
        operation: "listCatalogCategories",
        endpoint: "catalogItems",
        query: {
          MarketplaceId: this.config.marketplace_id,
          ASIN: this.config.asin
        },
        options: {
          version: "2020-12-01"
        }
      });
    } catch (e) {
      expect(e).to.be.an("error");
      expect(e.code).to.equal("OPERATION_NOT_FOUND_FOR_VERSION");
    }
  });

  it("should return an invalid code parameter error", async function () {
    try {
      const spClient = new SellingPartner({
        region: this.config.region,
        options: {
          only_grantless_operations: true
        }
      });
      await spClient.exchange("invalid_auth_code");
    } catch (e) {
      expect(e).to.be.an("error");
      expect(e.code).to.equal("invalid_request");
      expect(e.message).to.equal("The request has an invalid parameter : code");
    }
  });

  it("should return a response timeout error", async function () {
    let response_timeout = 5;
    let res;
    try {
      const spClient = new SellingPartner({
        region: this.config.region,
        refresh_token: this.config.refresh_token,
        options: {
          version_fallback: false,
          timeouts: {
            response: response_timeout
          }
        }
      });
      res = await spClient.callAPI({
        operation: "getMarketplaceParticipations",
        endpoint: "sellers"
      });
    } catch (e) {
      res = e;
    }
    expect(res).to.be.an("error");
    expect(res.code).to.equal("API_RESPONSE_TIMEOUT");
    expect(res.timeout).to.equal(response_timeout);
  });

  it("should return a deadline timeout error", async function () {
    let deadline_timeout = 5;
    let res;
    try {
      const spClient = new SellingPartner({
        region: this.config.region,
        refresh_token: this.config.refresh_token,
        options: {
          timeouts: {
            response: 10
          }
        }
      });
      res = await spClient.callAPI({
        operation: "getMarketplaceParticipations",
        endpoint: "sellers",
        options: {
          timeouts: {
            deadline: deadline_timeout
          }
        }
      });
    } catch (e) {
      res = e;
    }
    expect(res).to.be.an("error");
    expect(res.code).to.equal("API_DEADLINE_TIMEOUT");
    expect(res.timeout).to.equal(deadline_timeout);
  });

  it("should catch invalid client error, update credentials and return a valid access token", async function () {
    const spClient = new SellingPartner({
      region: this.config.region,
      refresh_token: this.config.refresh_token,
      credentials: {
        SELLING_PARTNER_APP_CLIENT_ID: "INVALID_CLIENT_ID",
        SELLING_PARTNER_APP_CLIENT_SECRET: "INVALID_CLIENT_ERROR"
      }
    });
    let res;
    try {
      res = await spClient.refreshAccessToken();
    } catch (e) {
      res = e;
    }
    expect(res).to.be.an("error");
    expect(res.code).to.equal("invalid_client");
    spClient.updateCredentials();
    await spClient.refreshAccessToken();
    expect(spClient.access_token).to.be.a("string");
  });
});
