import * as chai from "chai";
const expect = chai.expect;

const endpoint = "aplusContent";

describe(endpoint, async function () {
  let content_reference_key;

  it("should return assigned aplus content documents", async function () {
    let res = await this.sellingPartner.callAPI({
      operation: "searchContentDocuments",
      endpoint: endpoint,
      query: {
        marketplaceId: this.config.marketplace_id
      }
    });
    expect(res).to.be.a("object");
    expect(res.contentMetadataRecords).to.be.a("array");

    if (res.contentMetadataRecords[0]) {
      content_reference_key = res.contentMetadataRecords[0].contentReferenceKey;
    }
  });

  it("should return a plus content document for content reference key", async function () {
    if (content_reference_key) {
      let res = await this.sellingPartner.callAPI({
        operation: "getContentDocument",
        endpoint: endpoint,
        path: {
          contentReferenceKey: content_reference_key
        },
        query: {
          marketplaceId: this.config.marketplace_id,
          includedDataSet: ["METADATA"]
        }
      });
      expect(res).to.be.a("object");
      expect(res.contentRecord).to.be.a("object");
    } else {
      this.skip();
    }
  });

  it("should return a list of asins related to aplus content for content reference key", async function () {
    if (content_reference_key) {
      let res = await this.sellingPartner.callAPI({
        operation: "listContentDocumentAsinRelations",
        endpoint: endpoint,
        path: {
          contentReferenceKey: content_reference_key
        },
        query: {
          marketplaceId: this.config.marketplace_id
        }
      });
      expect(res).to.be.a("object");
      expect(res.asinMetadataSet).to.be.a("array");
    } else {
      this.skip();
    }
  });

  it("should return a list of a+ content publishing records for asin", async function () {
    let res = await this.sellingPartner.callAPI({
      operation: "searchContentPublishRecords",
      endpoint: endpoint,
      query: {
        marketplaceId: this.config.marketplace_id,
        asin: this.config.asin
      }
    });
    expect(res).to.be.a("object");
    expect(res.publishRecordList).to.be.a("array");
  });
});
