import * as chai from "chai";
const expect = chai.expect;
import moment from "moment";

const endpoint = "reports";

describe(endpoint, async function () {
  let report_id;
  let report_document_id;
  let report_schedule_id;
  let report_document;

  it("should return a manually cancelled report processing error", async function () {
    try {
      await this.sellingPartner.downloadReport({
        body: {
          reportType: "GET_FLAT_FILE_OPEN_LISTINGS_DATA",
          marketplaceIds: [this.config.marketplace_id]
        },
        cancel_after: 1
      });
    } catch (e) {
      expect(e).to.be.an("error");
      expect(e.code).to.equal("REPORT_PROCESSING_CANCELLED_MANUALLY");
    }
  });

  it("should return report details for open listings inventory reports", async function () {
    let res = await this.sellingPartner.callAPI({
      operation: "getReports",
      endpoint: endpoint,
      query: {
        reportTypes: "GET_FLAT_FILE_OPEN_LISTINGS_DATA"
      }
    });
    expect(res).to.be.a("object");
    expect(res.reports).to.be.a("array");
    if (res.reports[0]) {
      report_id = res.reports[0].reportId;
    }
  });

  it("should return report details open listings inventory report id", async function () {
    if (report_id) {
      let res = await this.sellingPartner.callAPI({
        operation: "getReport",
        endpoint: endpoint,
        path: {
          reportId: report_id
        }
      });
      expect(res).to.be.a("object");
      expect(res.reportId).to.equal(report_id);
      expect(res.reportType).to.equal("GET_FLAT_FILE_OPEN_LISTINGS_DATA");
      expect(moment(res.createdTime).isValid()).to.equal(true);
      expect([
        "CANCELLED",
        "DONE",
        "FATAL",
        "IN_PROGRESS",
        "IN_QUEUE"
      ]).to.include(res.processingStatus);
      if (res.reportDocumentId) {
        report_document_id = res.reportDocumentId;
      }
    } else {
      this.skip();
    }
  });

  it("should return report schedules for open listings inventory reports", async function () {
    let res = await this.sellingPartner.callAPI({
      operation: "getReportSchedules",
      endpoint: endpoint,
      query: {
        reportTypes: ["GET_FLAT_FILE_OPEN_LISTINGS_DATA"],
        marketplaceIds: [this.config.marketplace_id]
      }
    });
    expect(res).to.be.a("object");
    expect(res.reportSchedules).to.be.a("array");
    if (res.reportSchedules[0]) {
      report_schedule_id = res.reportSchedules[0].reportScheduleId;
    }
  });

  it("should return report details for open listings inventory report schedule id", async function () {
    if (report_schedule_id) {
      let res = await this.sellingPartner.callAPI({
        operation: "getReportSchedule",
        endpoint: endpoint,
        path: {
          reportScheduleId: report_schedule_id
        }
      });
      expect(res).to.be.a("object");
      expect(res.reportScheduleId).to.equal(report_schedule_id);
      expect(res.reportType).to.equal("GET_FLAT_FILE_OPEN_LISTINGS_DATA");
      expect(res.period).to.be.a("string");
    } else {
      this.skip();
    }
  });

  it("should return report document for open listings inventory report document id", async function () {
    if (report_document_id) {
      let res = await this.sellingPartner.callAPI({
        operation: "getReportDocument",
        endpoint: endpoint,
        path: {
          reportDocumentId: report_document_id
        }
      });
      expect(res).to.be.a("object");
      expect(res.reportDocumentId).to.equal(report_document_id);
      expect(res.url).to.be.a("string");
      report_document = res;
    } else {
      this.skip();
    }
  });

  it("should return downloaded and decrypted json-formatted content of open listings inventory report document", async function () {
    if (report_document) {
      let res = await this.sellingPartner.download(report_document, {
        json: true
      });
      expect(res).to.be.a("array");
    } else {
      this.skip();
    }
  });
});
