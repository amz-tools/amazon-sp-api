module.exports = {
  finances: {
    __versions: ['v0', '2024-06-19'],
    __operations: [
      'listFinancialEventGroups',
      'listFinancialEventsByGroupId',
      'listFinancialEventsByOrderId',
      'listFinancialEvents',
      'listTransactions'
    ],
    ...require('./versions/finances/finances_v0'),
    ...require('./versions/finances/finances_2024-06-19')
  }
};
