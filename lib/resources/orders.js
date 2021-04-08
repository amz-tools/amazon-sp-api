module.exports = {
   orders:{
    __versions:[
      'v0'
    ],
    __operations:[
      'getOrders',
      'getOrder',
      'getOrderBuyerInfo',
      'getOrderAddress',
      'getOrderItems',
      'getOrderItemsBuyerInfo'
    ],
    ...require('./versions/orders/orders_v0')
  }
};