const chai = require('chai');
const expect = chai.expect;
const moment= require('moment');

describe('reports', async function(){

  let report_id;
  let report_document_id;
  let report_schedule_id;
  let report_document;

	it('should return report details for open listings inventory reports', async function(){
		let res = await this.sellingPartner.callAPI({
			operation:'getReports',
			query:{
        reportTypes:'GET_FLAT_FILE_OPEN_LISTINGS_DATA'
      }
    });
    expect(res).to.be.a('array');
    if (res[0]){
      report_id = res[0].reportId;
    }
	});

  it('should return report details open listings inventory report id', async function(){
    if (report_id){
      let res = await this.sellingPartner.callAPI({
        operation:'getReport',
        path:{
          reportId:report_id
        }
      });
      expect(res).to.be.a('object');
      expect(res.reportId).to.equal(report_id);
      expect(res.reportType).to.equal('GET_FLAT_FILE_OPEN_LISTINGS_DATA');
      expect(moment(res.createdTime).isValid()).to.equal(true);
      expect(['CANCELLED', 'DONE', 'FATAL', 'IN_PROGRESS', 'IN_QUEUE']).to.include(res.processingStatus);
      if (res.reportDocumentId){
        report_document_id = res.reportDocumentId;
      }
    } else {
      this.skip();
    }
  });

  it('should return report schedules for open listings inventory reports', async function(){
    let res = await this.sellingPartner.callAPI({
      operation:'getReportSchedules',
      query:{
        reportTypes:['GET_FLAT_FILE_OPEN_LISTINGS_DATA']
      }
    });
    expect(res).to.be.a('array');
    if (res[0]){
      report_schedule_id = res[0].reportScheduleId;
    }
  });

  it('should return report details for open listings inventory report schedule id', async function(){
    if (report_schedule_id){
      let res = await this.sellingPartner.callAPI({
        operation:'getReportSchedule',
        path:{
          reportScheduleId:report_schedule_id
        }
      });
      expect(res).to.be.a('object');
      expect(res.reportScheduleId).to.equal(report_schedule_id);
      expect(res.reportType).to.equal('GET_FLAT_FILE_OPEN_LISTINGS_DATA');
      expect(res.period).to.be.a('string');
    } else {
      this.skip();
    }
  });

  it('should return report document for open listings inventory report document id', async function(){
    if (report_document_id){
      let res = await this.sellingPartner.callAPI({
        operation:'getReportDocument',
        path:{
          reportDocumentId:report_document_id
        }
      });
      expect(res).to.be.a('object');
      expect(res.reportDocumentId).to.equal(report_document_id);
      expect(res.encryptionDetails).to.be.a('object');
      expect(res.encryptionDetails.standard).to.equal('AES');
      expect(res.encryptionDetails.initializationVector).to.be.a('string');
      expect(res.encryptionDetails.key).to.be.a('string');
      expect(res.url).to.be.a('string');
      report_document = res;
    } else {
      this.skip();
    }
  });

  it('should return downloaded and decrypted json-formatted content of open listings inventory report document', async function(){
    if (report_document){
      let res = await this.sellingPartner.download(report_document, {
        json:true
      });
      expect(res).to.be.a('array');
    } else {
      this.skip();
    }
  });

});