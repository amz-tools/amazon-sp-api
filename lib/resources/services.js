module.exports = {
   services:{
    __versions:[
      'v1'
    ],
    __operations:[
      'getServiceJobByServiceJobId',
      'cancelServiceJobByServiceJobId',
      'completeServiceJobByServiceJobId',
      'getServiceJobs',
      'addAppointmentForServiceJobByServiceJobId',
      'rescheduleAppointmentForServiceJobByServiceJobId'
    ],
    ...require('./versions/services/services_v1')
  }
};