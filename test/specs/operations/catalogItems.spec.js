const chai = require('chai');
const expect = chai.expect;

const endpoint = 'catalogItems';

describe(endpoint, async function(){

	it('should return a list of catalog items', async function(){
		let res = await this.sellingPartner.callAPI({
			operation:'listCatalogItems',
      endpoint:endpoint,
			query:{
      	MarketplaceId:this.config.marketplace_id,
      	Query:'samsung'
      }
    });
    expect(res).to.be.a('object');
    expect(res.Items).to.be.a('array');
	});

	it('should return a catalog item (v0)', async function(){
		let res = await this.sellingPartner.callAPI({
			operation:'getCatalogItem',
      endpoint:endpoint,
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

  it('should return a catalog item (2020-12-01)', async function(){
    let res = await this.sellingPartner.callAPI({
      operation:'getCatalogItem',
      endpoint:endpoint,
      path:{
        asin:this.config.asin
      },
      query:{
        marketplaceIds:['A1PA6795UKMFR9'],
        includedData:['identifiers', 'images', 'productTypes', 'salesRanks', 'summaries', 'variations']
      },
      options:{
        version:'2020-12-01'
      }
    });
    expect(res).to.be.a('object');
    expect(res.asin).to.be.a('string');
  });

	it('should return the parent categories of asin', async function(){
		let res = await this.sellingPartner.callAPI({
			operation:'listCatalogCategories',
      endpoint:endpoint,
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

  it('should return the parent categories of asin by version fallback', async function(){
    let res = await this.sellingPartner.callAPI({
      operation:'listCatalogCategories',
      endpoint:endpoint,
      query:{
        MarketplaceId:this.config.marketplace_id,
        ASIN:this.config.asin
      },
      options:{
        version:'2020-12-01'
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
        endpoint:endpoint,
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