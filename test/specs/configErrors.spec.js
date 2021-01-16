const SellingPartnerAPI = require('../../index');
const chai = require('chai');
const expect = chai.expect;

describe('configErrors', async function(){

	it('should return a missing refresh token error', async function(){
    try {
      new SellingPartnerAPI({
        region:this.config.region,
      });
    } catch(e){
      expect(e).to.be.an('error');
      expect(e.code).to.equal('NO_REFRESH_TOKEN_PROVIDED');
    }
	});

  it('should return an invalid region error', async function(){
    try {
      new SellingPartnerAPI({
        region:'de',
        refresh_token:this.config.refresh_token
      });
    } catch(e){
      expect(e).to.be.an('error');
      expect(e.code).to.equal('NO_VALID_REGION_PROVIDED');
    }
  });

  it('should return an invalid operation error', async function(){
    try {
      let sellingPartner = new SellingPartnerAPI({
        region:'eu',
        refresh_token:this.config.refresh_token,
        access_token:this.config.access_token,
        role_credentials:this.config.role_credentials,
        options:{
          only_grantless_operations:true
        }
      });
      await sellingPartner.callAPI({
        operation:'getMarketplaceParticipations'
      });
    } catch(e){
      expect(e).to.be.an('error');
      expect(e.code).to.equal('INVALID_OPERATION_ERROR');
    }
  });

  it('should return a no scope error', async function(){
    try {
      let sellingPartner = new SellingPartnerAPI({
        region:'eu',
        options:{
          only_grantless_operations:true
        }
      });
      await sellingPartner.refreshAccessToken();
    } catch(e){
      expect(e).to.be.an('error');
      expect(e.code).to.equal('NO_SCOPE_PROVIDED');
    }
  });

  it('should return a no access token or role credentials error', async function(){
    try {
      let sellingPartner = new SellingPartnerAPI({
        region:'eu',
        refresh_token:this.config.refresh_token,
        options:{
          auto_request_tokens:false
        }
      });
      await sellingPartner.callAPI({
        operation:'getMarketplaceParticipations'
      });
    } catch(e){
      expect(e).to.be.an('error');
      expect(e.code).to.equal('NO_ACCESS_TOKEN_AND_OR_ROLE_CREDENTIALS_PRESENT');
    }
  });

  it('should return an unknown operation error', async function(){
    try {
      let sellingPartner = new SellingPartnerAPI({
        region:'eu',
        refresh_token:this.config.refresh_token
      });
      await sellingPartner.callAPI({
        operation:'unknownOperation'
      });
    } catch(e){
      expect(e).to.be.an('error');
      expect(e.code).to.equal('OPERATION_NOT_FOUND');
    }
  });

  it('should return a no operation given error', async function(){
    try {
      let sellingPartner = new SellingPartnerAPI({
        region:'eu',
        refresh_token:this.config.refresh_token
      });
      await sellingPartner.callAPI({});
    } catch(e){
      expect(e).to.be.an('error');
      expect(e.code).to.equal('NO_OPERATION_GIVEN');
    }
  });

  it('should return an invalid sandbox parameters error', async function(){
    try {
      let sellingPartner = new SellingPartnerAPI({
        region:'eu',
        refresh_token:this.config.refresh_token,
        options:{
          use_sandbox:true
        }
      });
      await sellingPartner.callAPI({
        operation:'listCatalogItems',
        query:{
          MarketplaceId:'TEST',
          SellerSKU:'TEST'
        }
      });
    } catch(e){
      expect(e).to.be.an('error');
      expect(e.code).to.equal('INVALID_SANDBOX_PARAMETERS');
    }
  });

  it('should return a invalid refresh token error', async function(){
    try {
      let sellingPartner = new SellingPartnerAPI({
        region:'eu',
        refresh_token:'invalidRefreshToken'
      });
      await sellingPartner.callAPI({
        operation:'getMarketplaceParticipations'
      });
    } catch(e){
      expect(e).to.be.an('error');
      expect(e.code).to.equal('invalid_grant');
    }
  });

});