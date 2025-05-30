module.exports = {
  services: {
    __versions: ['v1'],
    __operations: [
      'getServiceJobByServiceJobId',
      'cancelServiceJobByServiceJobId',
      'completeServiceJobByServiceJobId',
      'getServiceJobs',
      'addAppointmentForServiceJobByServiceJobId',
      'rescheduleAppointmentForServiceJobByServiceJobId',
      'assignAppointmentResources',
      'setAppointmentFulfillmentData',
      'getRangeSlotCapacity',
      'getFixedSlotCapacity',
      'updateSchedule',
      'createReservation',
      'updateReservation',
      'cancelReservation',
      'getAppointmentSlotsByJobId',
      'getAppointmentSlots',
      'createServiceDocumentUploadDestination'
    ],
    ...require('./versions/services/services_v1')
  }
};
