module.exports = {
   sales:{
    __versions:[
      'v1'
    ],
    __operations:[
      'getOrderMetrics'
    ],
    ...require('./versions/sales/sales_v1')
  }
};