const chai = require('chai');
const expect = chai.expect;

describe('productPricing', async function(){

  it('should return pricing information for asin', async function(){
    let res = await this.sellingPartner.callAPI({
      operation:'getPricing',
      query:{
        MarketplaceId:this.config.marketplace_id,
        Asins:this.config.asin,
        ItemType:'Asin'
      }
    });
    expect(res).to.be.a('array');
    expect(res[0].status).to.be.a('string');
    expect(res[0].ASIN).to.equal(this.config.asin);
  });

	it('should return pricing information for sku', async function(){
    if (this.config.sku){
  		let res = await this.sellingPartner.callAPI({
  			operation:'getPricing',
  			query:{
          MarketplaceId:this.config.marketplace_id,
          Skus:this.config.sku,
          ItemType:'Sku'
        }
      });
      expect(res).to.be.a('array');
      expect(res[0].status).to.be.a('string');
      expect(res[0].SellerSKU).to.equal(this.config.sku);
    } else {
      this.skip();
    }
	});

  it('should return competitive pricing information for asin', async function(){
    let res = await this.sellingPartner.callAPI({
      operation:'getCompetitivePricing',
      query:{
        MarketplaceId:this.config.marketplace_id,
        Asins:this.config.asin,
        ItemType:'Asin'
      }
    });
    expect(res).to.be.a('array');
    expect(res[0].status).to.be.a('string');
    expect(res[0].ASIN).to.equal(this.config.asin);
  });

  it('should return competitive pricing information for sku', async function(){
    if (this.config.sku){
      let res = await this.sellingPartner.callAPI({
        operation:'getCompetitivePricing',
        query:{
          MarketplaceId:this.config.marketplace_id,
          Skus:this.config.sku,
          ItemType:'Sku'
        }
      });
      expect(res).to.be.a('array');
      expect(res[0].status).to.be.a('string');
      expect(res[0].SellerSKU).to.equal(this.config.sku);
    } else {
      this.skip();
    }
  });

  // Docs wrong! --> https://github.com/amzn/selling-partner-api-docs/blob/main/references/product-pricing-api/productPricingV0.md#getoffersresult
  // Marketplace is NOT capitalized in response
  // It should always return an offers array, but if we put in an item condition without offers it is not included in response
  it('should return lowest priced offers for sku', async function(){
    if (this.config.sku){
      let res = await this.sellingPartner.callAPI({
        operation:'getListingOffers',
        path:{
          SellerSKU:this.config.sku
        },
        query:{
          MarketplaceId:this.config.marketplace_id,
          ItemCondition:'New'
        }
      });
      expect(res).to.be.a('object');
      expect(res.marketplaceId).to.equal(this.config.marketplace_id);
      expect(res.SKU).to.equal(this.config.sku);
      expect(res.ItemCondition).to.equal('New');
      expect(res.status).to.be.a('string');
      expect(res.Identifier).to.be.a('object');
      expect(res.Summary).to.be.a('object');
      // expect(res.Offers).to.be.a('array');
    } else {
      this.skip();
    }
  });

  // Docs wrong! --> https://github.com/amzn/selling-partner-api-docs/blob/main/references/product-pricing-api/productPricingV0.md#getoffersresult
  // Marketplace is NOT capitalized in response
  // It should always return an offers array, but if we put in an item condition without offers it is not included in response
  it('should return lowest priced offers for asin', async function(){
    let res = await this.sellingPartner.callAPI({
      operation:'getItemOffers',
      path:{
        Asin:this.config.asin
      },
      query:{
        MarketplaceId:this.config.marketplace_id,
        ItemCondition:'New'
      }
    });
    expect(res).to.be.a('object');
    expect(res.marketplaceId).to.equal(this.config.marketplace_id);
    expect(res.ASIN).to.equal(this.config.asin);
    expect(res.ItemCondition).to.equal('New');
    expect(res.status).to.be.a('string');
    expect(res.Identifier).to.be.a('object');
    expect(res.Summary).to.be.a('object');
    // expect(res.Offers).to.be.a('array');
  });

});