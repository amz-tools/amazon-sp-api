module.exports = {
   solicitations:{
    __versions:[
      'v1'
    ],
    __operations:[
      'getSolicitationActionsForOrder',
      'createProductReviewAndSellerFeedbackSolicitation'
    ],
    ...require('./versions/solicitations/solicitations_v1')
  }
};