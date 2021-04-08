module.exports = {
   finances:{
    __versions:[
      'v0'
    ],
    __operations:[
      'listFinancialEventGroups',
      'listFinancialEventsByGroupId',
      'listFinancialEventsByOrderId',
      'listFinancialEvents'
    ],
    ...require('./versions/finances/finances_v0')
  }
};