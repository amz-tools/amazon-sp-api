const chai = require('chai');
const expect = chai.expect;

describe('tokens', async function(){

  it('should return a restricted data token', async function(){
    if (this.config.order_id){
      let res = await this.sellingPartner.callAPI({
        operation:'createRestrictedDataToken',
        body:{
          restrictedResources:[{
            path:'/orders/v0/orders/' + this.config.order_id + '/address',
            method:'GET'
          }]
        }
      });
      expect(res).to.be.a('object');
      expect(res.restrictedDataToken).to.be.a('string');
      expect(res.expiresIn).to.be.a('number');
    } else {
      this.skip();
    }
  });

});