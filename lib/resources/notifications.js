module.exports = {
   notifications:{
    __versions:[
      'v1'
    ],
    __operations:[
      'getSubscription',
      'createSubscription',
      'getSubscriptionById',
      'deleteSubscriptionById',
      'getDestinations',
      'createDestination',
      'getDestination',
      'deleteDestination'
    ],
    ...require('./versions/notifications/notifications_v1')
  }
};