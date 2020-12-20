const chai = require('chai');
const expect = chai.expect;

describe('productFees', async function(){

	it('should return estimated product fees for sku', async function(){
    if (this.config.sku){
  		let res = await this.sellingPartner.callAPI({
  			operation:'getMyFeesEstimateForSKU',
  			path:{
          SellerSKU:this.config.sku
        },
        body:{
          FeesEstimateRequest:{
            MarketplaceId:this.config.marketplace_id,
            Identifier:'19.99',
            PriceToEstimateFees:{
              ListingPrice:{
                CurrencyCode:this.config.currency_code,
                Amount:'19.99'
              }
            }
          }
        }
      });
      expect(res).to.be.a('object');
      expect(res.FeesEstimateResult).to.be.a('object');
    } else {
      this.skip();
    }
	});

  it('should return estimated product fees for asin', async function(){
    let res = await this.sellingPartner.callAPI({
      operation:'getMyFeesEstimateForASIN',
      path:{
        Asin:this.config.asin
      },
      body:{
        FeesEstimateRequest:{
          MarketplaceId:this.config.marketplace_id,
          Identifier:'19.99',
          PriceToEstimateFees:{
            ListingPrice:{
              CurrencyCode:this.config.currency_code,
              Amount:'19.99'
            }
          }
        }
      }
    });
    expect(res).to.be.a('object');
    expect(res.FeesEstimateResult).to.be.a('object');
  });

});