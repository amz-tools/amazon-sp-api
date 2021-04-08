module.exports = {
   productFees:{
    __versions:[
      'v0'
    ],
    __operations:[
      'getMyFeesEstimateForSKU',
      'getMyFeesEstimateForASIN'
    ],
    ...require('./versions/product_fees/productFees_v0')
  }
};