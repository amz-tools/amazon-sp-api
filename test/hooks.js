const config = require('./config');
const SellingPartnerAPI = require('../index');

module.exports.mochaHooks = {

	beforeAll:async function(){	
    let sellingPartner = new SellingPartnerAPI({
      region:config.region,
      refresh_token:config.refresh_token,
      options:{
        auto_request_tokens:false
      }
    });
    await sellingPartner.refreshAccessToken();
    await sellingPartner.refreshRoleCredentials();
    config.access_token = sellingPartner.access_token;
    config.role_credentials = sellingPartner.role_credentials;
  	this.config = config;
  },

  beforeEach:function(done){
    this.sellingPartner = new SellingPartnerAPI({
      region:config.region,
      refresh_token:config.refresh_token,
      access_token:config.access_token,
      role_credentials:config.role_credentials,
      options:{
        auto_request_tokens:false
      }
    });
    done();
  }

};