module.exports = {
   replenishment:{
    __versions:[
      '2022-11-07'
    ],
    __operations:[
      'getSellingPartnerMetrics',
      'listOfferMetrics',
      'listOffers'
    ],
    ...require('./versions/replenishment/replenishment_2022-11-07')
  }
};