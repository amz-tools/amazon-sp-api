module.exports = {
  amazonWarehousingAndDistribution: {
    __versions: ['2024-05-09'],
    __operations: [
      'createInbound',
      'getInbound',
      'updateInbound',
      'cancelInbound',
      'confirmInbound',
      'getInboundShipment',
      'getInboundShipmentLabels',
      'updateInboundShipmentTransportDetails',
      'checkInboundEligibility',
      'listInboundShipments',
      'listInventory'
    ],
    ...require('./versions/amazon_warehousing_and_distribution/amazonWarehousingAndDistribution_2024-05-09')
  }
};
