module.exports = {
   fbaSmallAndLight:{
    __versions:[
      'v1'
    ],
    __operations:[
      'getSmallAndLightEnrollmentBySellerSKU',
      'putSmallAndLightEnrollmentBySellerSKU',
      'deleteSmallAndLightEnrollmentBySellerSKU',
      'getSmallAndLightEligibilityBySellerSKU',
      'getSmallAndLightFeePreview'
    ],
    ...require('./versions/fba_small_and_light/fbaSmallAndLight_v1')
  }
};