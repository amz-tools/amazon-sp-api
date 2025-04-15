module.exports = {
  vendorDirectFulfillmentShipping: {
    __versions: ['v1', '2021-12-28'],
    __operations: [
      'getShippingLabels',
      'submitShippingLabelRequest',
      'getShippingLabel',
      'createShippingLabels',
      'submitShipmentConfirmations',
      'submitShipmentStatusUpdates',
      'getCustomerInvoices',
      'getCustomerInvoice',
      'getPackingSlips',
      'getPackingSlip',
      'createContainerLabel'
    ],
    ...require('./versions/vendor_direct_fulfillment_shipping/vendorDirectFulfillmentShipping_v1'),
    ...require('./versions/vendor_direct_fulfillment_shipping/vendorDirectFulfillmentShipping_2021-12-28')
  }
};
