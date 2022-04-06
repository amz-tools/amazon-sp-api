const chai = require('chai');
const expect = chai.expect;

const endpoint = 'fbaSmallAndLight';

describe(endpoint, async function(){

	it('should return the small and light enrollment status for sku', async function(){
    if (this.config.sku){
  		let res = await this.sellingPartner.callAPI({
  			operation:'getSmallAndLightEnrollmentBySellerSKU',
        endpoint:endpoint,
        path:{
          sellerSKU:this.config.sku
        },
        query:{
          marketplaceIds:this.config.marketplace_id
        }
      });
      expect(res).to.be.a('object');
      expect(res.sellerSKU).to.equal(this.config.sku);
      expect(res.marketplaceId).to.equal(this.config.marketplace_id);
      expect(res.status).to.be.a('string');
      expect(['ENROLLED', 'NOT_ENROLLED']).to.include(res.status);
    } else {
      this.skip();
    }
	});

  it('should return the small and light eligibility for sku', async function(){
    if (this.config.sku){
      try {
        let res = await this.sellingPartner.callAPI({
          operation:'getSmallAndLightEligibilityBySellerSKU',
          endpoint:endpoint,
          path:{
            sellerSKU:this.config.sku
          },
          query:{
            marketplaceIds:this.config.marketplace_id
          }
        });
        expect(res).to.be.a('object');
        expect(res.sellerSKU).to.equal(this.config.sku);
        expect(res.marketplaceId).to.equal(this.config.marketplace_id);
        expect(res.status).to.be.a('string');
        expect(['ELIGIBLE', 'NOT_ELIGIBlE']).to.include(res.status);
      } catch(e){
        // TODO: Check what could be other error reasons?
        expect([
          'EXPECTED_SALES_VELOCITY_TOO_LOW',
          'UNCOMMINGLING_FNSKU_ON_SHIPMENT',
          'INVALID_ASIN_PRICE',
          'INVALID_PACKAGE_DIMENSIONS'
        ]).to.include(e.code);
      }
    } else {
      this.skip();
    }
  });

  it('should return the small and light fee estimates for asin', async function(){
    let res = await this.sellingPartner.callAPI({
      operation:'getSmallAndLightFeePreview',
      endpoint:endpoint,
      body:{
        marketplaceId:this.config.marketplace_id,
        items:[{
          asin:this.config.asin,
          price:{
            currencyCode:this.config.currency_code,
            amount:9.99
          }
        }]
      }
    });
    expect(res).to.be.a('object').to.have.property('data').to.be.a('array');
    expect(res.data[0].totalFees).to.be.a('object');
    expect(res.data[0].price).to.be.a('object');
    expect(res.data[0].asin).to.equal(this.config.asin);
    expect(res.data[0].feeBreakdown).to.be.a('array');
  });

});