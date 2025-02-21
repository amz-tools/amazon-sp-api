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

  it("should (by stream api) return downloaded the content of open listings inventory report document", async function () {
    this.timeout(100000);
    try {
      const req_params = {
        body: {
          reportType: "GET_FLAT_FILE_OPEN_LISTINGS_DATA",
          marketplaceIds: [this.config.marketplace_id]
        },
        cancel_after: 3,
        interval: 10000
      };
      const { reportId: report_id } = await this.sellingPartner.callAPI({
        operation: "reports.createReport",
        body: req_params.body,
        options: {
          ...(req_params.version ? { version: req_params.version } : {})
        }
      });
      console.log("created the report", report_id);
      // wait a sensitive amount of time for report to be ready
      await new Promise((s, r) => setTimeout(() => s(1), 60000));
      // try 3 times, until success or failure
      let report_document_id = await (async () => {
        let report_doc_id = 0;
        let tries = 0;
        while (!report_doc_id || tries < 3) {
          const res = await this.sellingPartner.callAPI({
            operation: "reports.getReport",
            path: {
              reportId: report_id
            },
            options: {
              ...(req_params.version ? { version: req_params.version } : {})
            }
          });
          // TODO: When processingStatus is "CANCELLED" or "FATAL" we stay in an endless loop here
          if (res.processingStatus === "DONE") {
            return res.reportDocumentId;
          }
          await new Promise((s, r) => setTimeout(() => s(1), 10000));
        }
      })();
      const report_document = await this.sellingPartner.callAPI({
        operation: "reports.getReportDocument",
        path: {
          reportDocumentId: report_document_id
        },
        options: {
          ...(req_params.version ? { version: req_params.version } : {})
        }
      });
      const docStream =
        await this.sellingPartner.downloadStream(report_document);
      // expect(res).to.be.a("array");
      let data = "";
      docStream.on("data", (chunk) => {
        if (data.length < 1000) {
          data += chunk.toString();
        }
      });
      await new Promise((resolve, reject) => {
        docStream.on("end", () => {
          // TODO: This fails in case reporting language in Sellercentral is not English
          // --> GET_FLAT_FILE_OPEN_LISTINGS_DATA report always returns field names in reporting language
          // --> i.e. if language is german, the field name for price is not "Price" but "Preis"
          // --> try to do another validity check or maybe use another report for testing
          expect(data).to.contain("Price");
          expect(data).to.contain("sku");
          resolve();
        });
      });
    } catch (e) {
      console.log("ERROR DURRRRRING STREAM", e);
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
