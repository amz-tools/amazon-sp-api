module.exports = {
 	fbaInboundEligibility:{
    __versions:[
    	'v1'
  	],
    __operations:[
    	'getItemEligibilityPreview'
  	],
    ...require('./versions/fba_inbound_eligibility/fbaInboundEligibility_v1')
  }
};