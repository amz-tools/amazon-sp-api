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
      'getOrderItemsBuyerInfo',
      'updateShipmentStatus'
    ],
    ...require('./versions/orders/orders_v0')
  }
};