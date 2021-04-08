module.exports = {
   productPricing:{
    __versions:[
      'v0'
    ],
    __operations:[
      'getPricing',
      'getCompetitivePricing',
      'getListingOffers',
      'getItemOffers'
    ],
    ...require('./versions/product_pricing/productPricing_v0')
  }
};