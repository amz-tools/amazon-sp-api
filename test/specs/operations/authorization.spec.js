const SellingPartnerAPI = require('../../../index');
const chai = require('chai');
const expect = chai.expect;

const endpoint = 'authorization';

describe(endpoint, async function(){

	it('should throw an invalid party id error', async function(){
    let sellingPartner = new SellingPartnerAPI({
      region:this.config.region,
      options:{
        auto_request_tokens:false,
        only_grantless_operations:true
      }
    });

    await sellingPartner.refreshAccessToken('sellingpartnerapi::migration');
    await sellingPartner.refreshRoleCredentials();

    try {
  		let res = await sellingPartner.callAPI({
  			operation:'getAuthorizationCode',
        endpoint:endpoint,
        query:{
          sellingPartnerId:'XXXXXXXXXXXXXX',
          developerId:'XXXXXXXXXXXX',
          mwsAuthToken:'amzn.mws.XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX'
        }
      });
    } catch(e){
      expect(e).to.be.an('error');
      expect(e.code).to.equal('InvalidInput');
      expect(e.message).to.equal('Invalid partyId: XXXXXXXXXXXXXX');
    }
	});

});