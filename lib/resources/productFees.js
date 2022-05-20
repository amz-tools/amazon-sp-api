module.exports = {
   productFees:{
    __versions:[
      'v0'
    ],
    __operations:[
      'getMyFeesEstimateForSKU',
      'getMyFeesEstimateForASIN',
      'getMyFeesEstimates'
    ],
    ...require('./versions/product_fees/productFees_v0')
  }
};