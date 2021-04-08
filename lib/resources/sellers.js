module.exports = {
  sellers:{
    __versions:[
    	'v1'
    ],
    __operations:[
    'getMarketplaceParticipations'
    ],
    ...require('./versions/sellers/sellers_v1.js')
  }
};