const chai = require('chai');
const expect = chai.expect;

describe('sellers', async function(){

	it('should return list of marketplaces the seller can sell in', async function(){
		let res = await this.sellingPartner.callAPI({
			operation:'getMarketplaceParticipations'
    });
    expect(res).to.be.a('array');
	});

});