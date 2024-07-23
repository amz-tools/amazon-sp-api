import * as chai from "chai";
const expect = chai.expect;

const endpoint = "productFees";

describe(endpoint, async function () {
  it("should return estimated product fees for sku", async function () {
    if (this.config.sku) {
      let res = await this.sellingPartner.callAPI({
        operation: "getMyFeesEstimateForSKU",
        endpoint: endpoint,
        path: {
          SellerSKU: this.config.sku
        },
        body: {
          FeesEstimateRequest: {
            MarketplaceId: this.config.marketplace_id,
            Identifier: this.config.sku,
            PriceToEstimateFees: {
              ListingPrice: {
                CurrencyCode: this.config.currency_code,
                Amount: 19.99
              }
            }
          }
        }
      });
      expect(res).to.be.a("object");
      expect(res.FeesEstimateResult).to.be.a("object");
    } else {
      this.skip();
    }
  });

  it("should return estimated product fees for asin", async function () {
    let res = await this.sellingPartner.callAPI({
      operation: "getMyFeesEstimateForASIN",
      endpoint: endpoint,
      path: {
        Asin: this.config.asin
      },
      body: {
        FeesEstimateRequest: {
          MarketplaceId: this.config.marketplace_id,
          Identifier: this.config.asin,
          PriceToEstimateFees: {
            ListingPrice: {
              CurrencyCode: this.config.currency_code,
              Amount: 19.99
            }
          }
        }
      }
    });
    expect(res).to.be.a("object");
    expect(res.FeesEstimateResult).to.be.a("object");
  });

  it("should return estimated product fees for sku and asin", async function () {
    if (this.config.sku) {
      let res = await this.sellingPartner.callAPI({
        operation: "getMyFeesEstimates",
        endpoint: endpoint,
        body: [
          {
            FeesEstimateRequest: {
              MarketplaceId: this.config.marketplace_id,
              Identifier: this.config.sku,
              PriceToEstimateFees: {
                ListingPrice: {
                  CurrencyCode: this.config.currency_code,
                  Amount: 19.99
                }
              }
            },
            IdType: "SellerSKU",
            IdValue: this.config.sku
          },
          {
            FeesEstimateRequest: {
              MarketplaceId: this.config.marketplace_id,
              Identifier: this.config.asin,
              PriceToEstimateFees: {
                ListingPrice: {
                  CurrencyCode: this.config.currency_code,
                  Amount: 19.99
                }
              }
            },
            IdType: "ASIN",
            IdValue: this.config.sain
          }
        ]
      });
      expect(res).to.be.a("array");
      expect(res).to.have.lengthOf(2);
    } else {
      this.skip();
    }
  });
});
