const chai = require('chai');
const expect = chai.expect;

describe('catalogItems', async function(){

	it('should return a list of catalog items', async function(){
		let res = await this.sellingPartner.callAPI({
			operation:'listCatalogItems',
			query:{
      	MarketplaceId:this.config.marketplace_id,
      	Query:'samsung'
      }
    });
    expect(res).to.be.a('object');
    expect(res.Items).to.be.a('array');
	});

	it('should return a catalog item', async function(){
		let res = await this.sellingPartner.callAPI({
			operation:'getCatalogItem',
			path:{
				asin:this.config.asin
			},
			query:{
      	MarketplaceId:this.config.marketplace_id
      }
    });
    expect(res).to.be.a('object');
    expect(res.Identifiers).to.be.a('object');
	});

	it('should return the parent categories of asin', async function(){
		let res = await this.sellingPartner.callAPI({
			operation:'listCatalogCategories',
			query:{
      	MarketplaceId:this.config.marketplace_id,
      	ASIN:this.config.asin
      }
    });
    expect(res).to.be.a('array');
    expect(res[0]).to.have.property('ProductCategoryId');
    expect(res[0]).to.have.property('ProductCategoryName');
    expect(res[0]).to.have.property('parent');
	});

	it('should return the parent categories of sku', async function(){
    if (this.config.sku){
  		let res = await this.sellingPartner.callAPI({
  			operation:'listCatalogCategories',
  			query:{
        	MarketplaceId:this.config.marketplace_id,
        	SellerSKU:this.config.sku
        }
      });
      expect(res).to.be.a('array');
      expect(res[0]).to.have.property('ProductCategoryId');
      expect(res[0]).to.have.property('ProductCategoryName');
      expect(res[0]).to.have.property('parent');
    } else {
      this.skip();
    }
	});

});