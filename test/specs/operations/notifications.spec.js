const chai = require('chai');
const expect = chai.expect;

describe('notifications', async function(){

	let subscription_id;
	let destination_id;

	it('should return subscriptions for any offer changed', async function(){
		try {
			let res = await this.sellingPartner.callAPI({
				operation:'getSubscription',
				path:{
					notificationType:'ANY_OFFER_CHANGED'
				}
	    });
	    expect(res).to.be.a('object');
	    expect(res.subscriptionId).to.be.a('string');
	    expect(res.payloadVersion).to.be.a('string');
	    expect(res.destinationId).to.be.a('string');
	    if (res.subscriptionId){
	    	subscription_id = res.subscription_id;
	    	destination_id = res.destination_id;
	    }
	  } catch(e){
	  	expect(e).to.have.property('details');
      expect(e.details).to.include('Subscription doesn\'t exist for notification type');
	  }
	});

	it('should return subscriptions for subscription id', async function(){
		if (subscription_id){
			try {
				let res = await this.sellingPartner.callAPI({
					operation:'getSubscriptionById',
					path:{
						subscriptionId:subscription_id,
						notificationType:'ANY_OFFER_CHANGED'
					}
		    });
		    expect(res).to.be.a('object');
		    expect(res.subscriptionId).to.be.a('string');
		    expect(res.payloadVersion).to.be.a('string');
		    expect(res.destinationId).to.be.a('string');
		  } catch(e){
		  	expect(e).to.have.property('details');
	      expect(e.details).to.include('Subscription doesn\'t exist for notification type');
		  }
		} else {
			this.skip();
		}
	});

	it('should return destination for destination id', async function(){
		if (destination_id){
			try {
				let res = await this.sellingPartner.callAPI({
					operation:'getDestination',
					path:{
						destinationId:destination_id
					}
		    });
		    expect(res).to.be.a('object');
		    expect(res.subscriptionId).to.be.a('string');
		    expect(res.payloadVersion).to.be.a('string');
		    expect(res.destinationId).to.be.a('string');
		  } catch(e){
		  	expect(e).to.have.property('details');
	      expect(e.details).to.include('Subscription doesn\'t exist for notification type');
		  }
		} else {
			this.skip();
		}
	});

});