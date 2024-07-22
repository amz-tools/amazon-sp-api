const utils = require("../../../utils");

module.exports = {
  "2024-03-20": {
    listInboundPlans: (req_params) => {
      return Object.assign(req_params, {
        method: "GET",
        api_path: "/inbound/fba/2024-03-20/inboundPlans",
        restore_rate: 0.5
      });
    },
    createInboundPlan: (req_params) => {
      return Object.assign(req_params, {
        method: "POST",
        api_path: "/inbound/fba/2024-03-20/inboundPlans",
        restore_rate: 0.5
      });
    },
    getInboundPlan: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          inboundPlanId: {
            type: "string"
          }
        }
      });
      return Object.assign(req_params, {
        method: "GET",
        api_path:
          "/inbound/fba/2024-03-20/inboundPlans/" +
          req_params.path.inboundPlanId,
        restore_rate: 0.5
      });
    },
    listInboundPlanBoxes: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          inboundPlanId: {
            type: "string"
          }
        }
      });
      return Object.assign(req_params, {
        method: "GET",
        api_path:
          "/inbound/fba/2024-03-20/inboundPlans/" +
          req_params.path.inboundPlanId +
          "/boxes",
        restore_rate: 0.5
      });
    },
    cancelInboundPlan: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          inboundPlanId: {
            type: "string"
          }
        }
      });
      return Object.assign(req_params, {
        method: "PUT",
        api_path:
          "/inbound/fba/2024-03-20/inboundPlans/" +
          req_params.path.inboundPlanId +
          "/cancellation",
        restore_rate: 0.5
      });
    },
    listInboundPlanItems: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          inboundPlanId: {
            type: "string"
          }
        }
      });
      return Object.assign(req_params, {
        method: "GET",
        api_path:
          "/inbound/fba/2024-03-20/inboundPlans/" +
          req_params.path.inboundPlanId +
          "/items",
        restore_rate: 0.5
      });
    },
    updateInboundPlanName: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          inboundPlanId: {
            type: "string"
          }
        }
      });
      return Object.assign(req_params, {
        method: "PUT",
        api_path:
          "/inbound/fba/2024-03-20/inboundPlans/" +
          req_params.path.inboundPlanId +
          "/name",
        restore_rate: 0.5
      });
    },
    listPackingGroupBoxes: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          inboundPlanId: {
            type: "string"
          },
          packingGroupId: {
            type: "string"
          }
        }
      });
      return Object.assign(req_params, {
        method: "GET",
        api_path:
          "/inbound/fba/2024-03-20/inboundPlans/" +
          req_params.path.inboundPlanId +
          "/packingGroups/" +
          req_params.path.packingGroupId +
          "/boxes",
        restore_rate: 0.5
      });
    },
    listPackingGroupItems: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          inboundPlanId: {
            type: "string"
          },
          packingGroupId: {
            type: "string"
          }
        }
      });
      return Object.assign(req_params, {
        method: "GET",
        api_path:
          "/inbound/fba/2024-03-20/inboundPlans/" +
          req_params.path.inboundPlanId +
          "/packingGroups/" +
          req_params.path.packingGroupId +
          "/items",
        restore_rate: 0.5
      });
    },
    setPackingInformation: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          inboundPlanId: {
            type: "string"
          }
        }
      });
      return Object.assign(req_params, {
        method: "POST",
        api_path:
          "/inbound/fba/2024-03-20/inboundPlans/" +
          req_params.path.inboundPlanId +
          "/packingInformation",
        restore_rate: 0.5
      });
    },
    listPackingOptions: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          inboundPlanId: {
            type: "string"
          }
        }
      });
      return Object.assign(req_params, {
        method: "GET",
        api_path:
          "/inbound/fba/2024-03-20/inboundPlans/" +
          req_params.path.inboundPlanId +
          "/packingOptions",
        restore_rate: 0.5
      });
    },
    generatePackingOptions: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          inboundPlanId: {
            type: "string"
          }
        }
      });
      return Object.assign(req_params, {
        method: "POST",
        api_path:
          "/inbound/fba/2024-03-20/inboundPlans/" +
          req_params.path.inboundPlanId +
          "/packingOptions",
        restore_rate: 0.5
      });
    },
    confirmPackingOption: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          inboundPlanId: {
            type: "string"
          },
          packingOptionId: {
            type: "string"
          }
        }
      });
      return Object.assign(req_params, {
        method: "POST",
        api_path:
          "/inbound/fba/2024-03-20/inboundPlans/" +
          req_params.path.inboundPlanId +
          "/packingOptions/" +
          req_params.path.packingOptionId +
          "/confirmation",
        restore_rate: 0.5
      });
    },
    listInboundPlanPallets: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          inboundPlanId: {
            type: "string"
          }
        }
      });
      return Object.assign(req_params, {
        method: "GET",
        api_path:
          "/inbound/fba/2024-03-20/inboundPlans/" +
          req_params.path.inboundPlanId +
          "/pallets",
        restore_rate: 0.5
      });
    },
    listPlacementOptions: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          inboundPlanId: {
            type: "string"
          }
        }
      });
      return Object.assign(req_params, {
        method: "GET",
        api_path:
          "/inbound/fba/2024-03-20/inboundPlans/" +
          req_params.path.inboundPlanId +
          "/placementOptions",
        restore_rate: 0.5
      });
    },
    generatePlacementOptions: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          inboundPlanId: {
            type: "string"
          }
        }
      });
      return Object.assign(req_params, {
        method: "POST",
        api_path:
          "/inbound/fba/2024-03-20/inboundPlans/" +
          req_params.path.inboundPlanId +
          "/placementOptions",
        restore_rate: 0.5
      });
    },
    confirmPlacementOption: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          inboundPlanId: {
            type: "string"
          },
          placementOptionId: {
            type: "string"
          }
        }
      });
      return Object.assign(req_params, {
        method: "POST",
        api_path:
          "/inbound/fba/2024-03-20/inboundPlans/" +
          req_params.path.inboundPlanId +
          "/placementOptions/" +
          req_params.path.placementOptionId +
          "/confirmation",
        restore_rate: 0.5
      });
    },
    getShipment: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          inboundPlanId: {
            type: "string"
          },
          shipmentId: {
            type: "string"
          }
        }
      });
      return Object.assign(req_params, {
        method: "GET",
        api_path:
          "/inbound/fba/2024-03-20/inboundPlans/" +
          req_params.path.inboundPlanId +
          "/shipments/" +
          req_params.path.shipmentId,
        restore_rate: 0.5
      });
    },
    listShipmentBoxes: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          inboundPlanId: {
            type: "string"
          },
          shipmentId: {
            type: "string"
          }
        }
      });
      return Object.assign(req_params, {
        method: "GET",
        api_path:
          "/inbound/fba/2024-03-20/inboundPlans/" +
          req_params.path.inboundPlanId +
          "/shipments/" +
          req_params.path.shipmentId +
          "/boxes",
        restore_rate: 0.5
      });
    },
    listShipmentContentUpdatePreviews: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          inboundPlanId: {
            type: "string"
          },
          shipmentId: {
            type: "string"
          }
        }
      });
      return Object.assign(req_params, {
        method: "GET",
        api_path:
          "/inbound/fba/2024-03-20/inboundPlans/" +
          req_params.path.inboundPlanId +
          "/shipments/" +
          req_params.path.shipmentId +
          "/contentUpdatePreviews",
        restore_rate: 0.5
      });
    },
    generateShipmentContentUpdatePreviews: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          inboundPlanId: {
            type: "string"
          },
          shipmentId: {
            type: "string"
          }
        }
      });
      return Object.assign(req_params, {
        method: "POST",
        api_path:
          "/inbound/fba/2024-03-20/inboundPlans/" +
          req_params.path.inboundPlanId +
          "/shipments/" +
          req_params.path.shipmentId +
          "/contentUpdatePreviews",
        restore_rate: 0.5
      });
    },
    getShipmentContentUpdatePreview: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          inboundPlanId: {
            type: "string"
          },
          shipmentId: {
            type: "string"
          },
          contentUpdatePreviewId: {
            type: "string"
          }
        }
      });
      return Object.assign(req_params, {
        method: "GET",
        api_path:
          "/inbound/fba/2024-03-20/inboundPlans/" +
          req_params.path.inboundPlanId +
          "/shipments/" +
          req_params.path.shipmentId +
          "/contentUpdatePreviews/" +
          req_params.path.contentUpdatePreviewId,
        restore_rate: 0.5
      });
    },
    confirmShipmentContentUpdatePreview: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          inboundPlanId: {
            type: "string"
          },
          shipmentId: {
            type: "string"
          },
          contentUpdatePreviewId: {
            type: "string"
          }
        }
      });
      return Object.assign(req_params, {
        method: "POST",
        api_path:
          "/inbound/fba/2024-03-20/inboundPlans/" +
          req_params.path.inboundPlanId +
          "/shipments/" +
          req_params.path.shipmentId +
          "/contentUpdatePreviews/" +
          req_params.path.contentUpdatePreviewId +
          "/confirmation",
        restore_rate: 0.5
      });
    },
    getDeliveryChallanDocument: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          inboundPlanId: {
            type: "string"
          },
          shipmentId: {
            type: "string"
          }
        }
      });
      return Object.assign(req_params, {
        method: "GET",
        api_path:
          "/inbound/fba/2024-03-20/inboundPlans/" +
          req_params.path.inboundPlanId +
          "/shipments/" +
          req_params.path.shipmentId +
          "/deliveryChallanDocument",
        restore_rate: 0.5
      });
    },
    listDeliveryWindowOptions: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          inboundPlanId: {
            type: "string"
          },
          shipmentId: {
            type: "string"
          }
        }
      });
      return Object.assign(req_params, {
        method: "GET",
        api_path:
          "/inbound/fba/2024-03-20/inboundPlans/" +
          req_params.path.inboundPlanId +
          "/shipments/" +
          req_params.path.shipmentId +
          "/deliveryWindowOptions",
        restore_rate: 0.5
      });
    },
    generateDeliveryWindowOptions: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          inboundPlanId: {
            type: "string"
          },
          shipmentId: {
            type: "string"
          }
        }
      });
      return Object.assign(req_params, {
        method: "POST",
        api_path:
          "/inbound/fba/2024-03-20/inboundPlans/" +
          req_params.path.inboundPlanId +
          "/shipments/" +
          req_params.path.shipmentId +
          "/deliveryWindowOptions",
        restore_rate: 0.5
      });
    },
    confirmDeliveryWindowOptions: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          inboundPlanId: {
            type: "string"
          },
          shipmentId: {
            type: "string"
          },
          deliveryWindowOptionId: {
            type: "string"
          }
        }
      });
      return Object.assign(req_params, {
        method: "POST",
        api_path:
          "/inbound/fba/2024-03-20/inboundPlans/" +
          req_params.path.inboundPlanId +
          "/shipments/" +
          req_params.path.shipmentId +
          "/deliveryWindowOptions/" +
          req_params.path.deliveryWindowOptionId +
          "/confirmation",
        restore_rate: 0.5
      });
    },
    listShipmentItems: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          inboundPlanId: {
            type: "string"
          },
          shipmentId: {
            type: "string"
          }
        }
      });
      return Object.assign(req_params, {
        method: "GET",
        api_path:
          "/inbound/fba/2024-03-20/inboundPlans/" +
          req_params.path.inboundPlanId +
          "/shipments/" +
          req_params.path.shipmentId +
          "/items",
        restore_rate: 0.5
      });
    },
    updateShipmentName: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          inboundPlanId: {
            type: "string"
          },
          shipmentId: {
            type: "string"
          }
        }
      });
      return Object.assign(req_params, {
        method: "PUT",
        api_path:
          "/inbound/fba/2024-03-20/inboundPlans/" +
          req_params.path.inboundPlanId +
          "/shipments/" +
          req_params.path.shipmentId +
          "/name",
        restore_rate: 0.5
      });
    },
    listShipmentPallets: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          inboundPlanId: {
            type: "string"
          },
          shipmentId: {
            type: "string"
          }
        }
      });
      return Object.assign(req_params, {
        method: "GET",
        api_path:
          "/inbound/fba/2024-03-20/inboundPlans/" +
          req_params.path.inboundPlanId +
          "/shipments/" +
          req_params.path.shipmentId +
          "/pallets",
        restore_rate: 0.5
      });
    },
    cancelSelfShipAppointment: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          inboundPlanId: {
            type: "string"
          },
          shipmentId: {
            type: "string"
          }
        }
      });
      return Object.assign(req_params, {
        method: "PUT",
        api_path:
          "/inbound/fba/2024-03-20/inboundPlans/" +
          req_params.path.inboundPlanId +
          "/shipments/" +
          req_params.path.shipmentId +
          "/selfShipAppointmentCancellation",
        restore_rate: 0.5
      });
    },
    getSelfShipAppointmentSlots: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          inboundPlanId: {
            type: "string"
          },
          shipmentId: {
            type: "string"
          }
        }
      });
      return Object.assign(req_params, {
        method: "GET",
        api_path:
          "/inbound/fba/2024-03-20/inboundPlans/" +
          req_params.path.inboundPlanId +
          "/shipments/" +
          req_params.path.shipmentId +
          "/selfShipAppointmentSlots",
        restore_rate: 0.5
      });
    },
    generateSelfShipAppointmentSlots: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          inboundPlanId: {
            type: "string"
          },
          shipmentId: {
            type: "string"
          }
        }
      });
      return Object.assign(req_params, {
        method: "POST",
        api_path:
          "/inbound/fba/2024-03-20/inboundPlans/" +
          req_params.path.inboundPlanId +
          "/shipments/" +
          req_params.path.shipmentId +
          "/selfShipAppointmentSlots",
        restore_rate: 0.5
      });
    },
    scheduleSelfShipAppointment: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          inboundPlanId: {
            type: "string"
          },
          shipmentId: {
            type: "string"
          },
          slotId: {
            type: "string"
          }
        }
      });
      return Object.assign(req_params, {
        method: "POST",
        api_path:
          "/inbound/fba/2024-03-20/inboundPlans/" +
          req_params.path.inboundPlanId +
          "/shipments/" +
          req_params.path.shipmentId +
          "/selfShipAppointmentSlots/" +
          req_params.path.slotId +
          "/schedule",
        restore_rate: 0.5
      });
    },
    updateShipmentSourceAddress: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          inboundPlanId: {
            type: "string"
          },
          shipmentId: {
            type: "string"
          }
        }
      });
      return Object.assign(req_params, {
        method: "PUT",
        api_path:
          "/inbound/fba/2024-03-20/inboundPlans/" +
          req_params.path.inboundPlanId +
          "/shipments/" +
          req_params.path.shipmentId +
          "/sourceAddress",
        restore_rate: 0.5
      });
    },
    updateShipmentTrackingDetails: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          inboundPlanId: {
            type: "string"
          },
          shipmentId: {
            type: "string"
          }
        }
      });
      return Object.assign(req_params, {
        method: "PUT",
        api_path:
          "/inbound/fba/2024-03-20/inboundPlans/" +
          req_params.path.inboundPlanId +
          "/shipments/" +
          req_params.path.shipmentId +
          "/trackingDetails",
        restore_rate: 0.5
      });
    },
    listTransportationOptions: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          inboundPlanId: {
            type: "string"
          }
        }
      });
      return Object.assign(req_params, {
        method: "GET",
        api_path:
          "/inbound/fba/2024-03-20/inboundPlans/" +
          req_params.path.inboundPlanId +
          "/transportationOptions",
        restore_rate: 0.5
      });
    },
    generateTransportationOptions: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          inboundPlanId: {
            type: "string"
          }
        }
      });
      return Object.assign(req_params, {
        method: "POST",
        api_path:
          "/inbound/fba/2024-03-20/inboundPlans/" +
          req_params.path.inboundPlanId +
          "/transportationOptions",
        restore_rate: 0.5
      });
    },
    confirmTransportationOptions: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          inboundPlanId: {
            type: "string"
          }
        }
      });
      return Object.assign(req_params, {
        method: "POST",
        api_path:
          "/inbound/fba/2024-03-20/inboundPlans/" +
          req_params.path.inboundPlanId +
          "/transportationOptions/confirmation",
        restore_rate: 0.5
      });
    },
    updateItemComplianceDetails: (req_params) => {
      return Object.assign(req_params, {
        method: "PUT",
        api_path: "/inbound/fba/2024-03-20/items/compliance",
        restore_rate: 0.5
      });
    },
    createMarketplaceItemLabels: (req_params) => {
      return Object.assign(req_params, {
        method: "POST",
        api_path: "/inbound/fba/2024-03-20/items/labels",
        restore_rate: 0.5
      });
    },
    getInboundOperationStatus: (req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path: {
          operationId: {
            type: "string"
          }
        }
      });
      return Object.assign(req_params, {
        method: "GET",
        api_path:
          "/inbound/fba/2024-03-20/operations/" + req_params.path.operationId,
        restore_rate: 0.5
      });
    }
  }
};
