module.exports = {
  vendorShipments: {
    __versions: ['v1'],
    __operations: ['SubmitShipmentConfirmations', 'GetShipmentDetails', 'SubmitShipments', 'GetShipmentLabels'],
    ...require('./versions/vendor_shipments/vendorShipments_v1')
  }
};
