const chai = require('chai');
const expect = chai.expect;
const moment = require('moment');

const endpoint = 'fulfillmentInbound';

describe(endpoint, async function(){

  let shipment_id;

	it('should return inbound guidance for asin', async function(){
		let res = await this.sellingPartner.callAPI({
			operation:'getInboundGuidance',
      endpoint:endpoint,
			query:{
      	MarketplaceId:this.config.marketplace_id,
      	ASINList:this.config.asin
      }
    });
    expect(res).to.be.a('object');
    expect(res.ASINInboundGuidanceList).to.be.a('array');
    expect(res.InvalidASINList).to.be.a('array');
	});

  it('should return inbound guidance for sku', async function(){
    if (this.config.sku){
      let res = await this.sellingPartner.callAPI({
        operation:'getInboundGuidance',
        endpoint:endpoint,
        query:{
          MarketplaceId:this.config.marketplace_id,
          SellerSKUList:this.config.sku
        }
      });
      expect(res).to.be.a('object');
      expect(res.SKUInboundGuidanceList).to.be.a('array');
      expect(res.InvalidSKUList).to.be.a('array');
    } else {
      this.skip();
    }
  });

  it('should return prep instructions for asin', async function(){
    let res = await this.sellingPartner.callAPI({
      operation:'getPrepInstructions',
      endpoint:endpoint,
      query:{
        ShipToCountryCode:this.config.country_code,
        ASINList:this.config.asin
      }
    });
    expect(res).to.be.a('object');
    expect(res.ASINPrepInstructionsList).to.be.a('array');
    expect(res.InvalidASINList).to.be.a('array');
  });

  it('should return prep instructions for sku', async function(){
    if (this.config.sku){
      let res = await this.sellingPartner.callAPI({
        operation:'getPrepInstructions',
        endpoint:endpoint,
        query:{
          ShipToCountryCode:this.config.country_code,
          SellerSKUList:this.config.sku
        }
      });
      expect(res).to.be.a('object');
      expect(res.SKUPrepInstructionsList).to.be.a('array');
      expect(res.InvalidSKUList).to.be.a('array');
    } else {
      this.skip();
    }
  });

  it('should return inbound shipments for date range', async function(){
    let res = await this.sellingPartner.callAPI({
      operation:'getShipments',
      endpoint:endpoint,
      query:{
        MarketplaceId:this.config.marketplace_id,
        ShipmentStatusList:['WORKING', 'SHIPPED', 'RECEIVING', 'CANCELLED', 'DELETED', 'CLOSED', 'ERROR', 'IN_TRANSIT', 'DELIVERED', 'CHECKED_IN'],
        QueryType:'DATE_RANGE',
        LastUpdatedBefore:moment().startOf('day').toISOString(),
        LastUpdatedAfter:moment().startOf('day').subtract(2, 'months').toISOString()
      }
    });
    expect(res).to.be.a('object');
    expect(res.ShipmentData).to.be.a('array');

    if (res.ShipmentData[0]){
      shipment_id = res.ShipmentData[0].ShipmentId;
    }
  });

  it('should return inbound shipment items for shipment', async function(){
    if (shipment_id){
      let res = await this.sellingPartner.callAPI({
        operation:'getShipmentItemsByShipmentId',
        endpoint:endpoint,
        query:{
          MarketplaceId:this.config.marketplace_id
        },
        path:{
          shipmentId:shipment_id
        }
      });
      expect(res).to.be.a('object');
      expect(res.ItemData).to.be.a('array');
    } else {
      this.skip();
    }
  });

  it('should return inbound shipment items for date range', async function(){
    let res = await this.sellingPartner.callAPI({
      operation:'getShipmentItems',
      endpoint:endpoint,
      query:{
        MarketplaceId:this.config.marketplace_id,
        QueryType:'DATE_RANGE',
        LastUpdatedBefore:moment().startOf('day').toISOString(),
        LastUpdatedAfter:moment().startOf('day').subtract(2, 'months').toISOString()
      }
    });
    expect(res).to.be.a('object');
    expect(res.ItemData).to.be.a('array');
  });

});