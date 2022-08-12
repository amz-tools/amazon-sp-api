const utils = require('../../../utils');

module.exports = {
  'v1':{
    getServiceJobByServiceJobId:(req_params) => {
    	req_params = utils.checkAndEncodeParams(req_params, {
    		path:{
    			serviceJobId:{
    				type:'string'
    			}
    		}
    	});
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/service/v1/serviceJobs/' + req_params.path.serviceJobId,
        restore_rate:0.05
      });
    },
    cancelServiceJobByServiceJobId:(req_params) => {
    	req_params = utils.checkAndEncodeParams(req_params, {
    		path:{
    			serviceJobId:{
    				type:'string'
    			}
    		}
    	});
      return Object.assign(req_params, {
        method:'PUT',
        api_path:'/service/v1/serviceJobs/' + req_params.path.serviceJobId + '/cancellations',
        restore_rate:0.2
      });
    },
    completeServiceJobByServiceJobId:(req_params) => {
    	req_params = utils.checkAndEncodeParams(req_params, {
    		path:{
    			serviceJobId:{
    				type:'string'
    			}
    		}
    	});
      return Object.assign(req_params, {
        method:'PUT',
        api_path:'/service/v1/serviceJobs/' + req_params.path.serviceJobId + '/completions',
        restore_rate:0.2
      });
    },
    getServiceJobs:(req_params) => {
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/service/v1/serviceJobs',
        restore_rate:0.1
      });
    },
    addAppointmentForServiceJobByServiceJobId:(req_params) => {
    	req_params = utils.checkAndEncodeParams(req_params, {
    		path:{
    			serviceJobId:{
    				type:'string'
    			}
    		}
    	});
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/service/v1/serviceJobs/' + req_params.path.serviceJobId + '/appointments',
        restore_rate:0.2
      });
    },
    rescheduleAppointmentForServiceJobByServiceJobId:(req_params) => {
    	req_params = utils.checkAndEncodeParams(req_params, {
    		path:{
    			serviceJobId:{
    				type:'string'
    			},
    			appointmentId:{
    				type:'string'
    			}
    		}
    	});
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/service/v1/serviceJobs/' + req_params.path.serviceJobId + '/appointments/' + req_params.path.appointmentId,
        restore_rate:0.2
      });
    },
    assignAppointmentResources:(req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path:{
          serviceJobId:{
            type:'string'
          },
          appointmentId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'PUT',
        api_path:'/service/v1/serviceJobs/' + req_params.path.serviceJobId + '/appointments/' + req_params.path.appointmentId + '/resources',
        restore_rate:1
      });
    },
    setAppointmentFulfillmentData:(req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path:{
          serviceJobId:{
            type:'string'
          },
          appointmentId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'PUT',
        api_path:'/service/v1/serviceJobs/' + req_params.path.serviceJobId + '/appointments/' + req_params.path.appointmentId + '/fulfillment',
        restore_rate:0.2
      });
    },
    getRangeSlotCapacity:(req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path:{
          resourceId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/service/v1/serviceResources/' + req_params.path.resourceId + '/capacity/range',
        restore_rate:0.2
      });
    },
    getFixedSlotCapacity:(req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path:{
          resourceId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/service/v1/serviceResources/' + req_params.path.resourceId + '/capacity/fixed',
        restore_rate:0.2
      });
    },
    updateSchedule:(req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path:{
          resourceId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'PUT',
        api_path:'/service/v1/serviceResources/' + req_params.path.resourceId + '/schedules',
        restore_rate:0.2
      });
    },
    createReservation:(req_params) => {
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/service/v1/reservation',
        restore_rate:0.2
      });
    },
    updateReservation:(req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path:{
          reservationId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'PUT',
        api_path:'/service/v1/reservation/' + req_params.path.reservationId,
        restore_rate:0.2
      });
    },
    cancelReservation:(req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path:{
          reservationId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'DELETE',
        api_path:'/service/v1/reservation/' + req_params.path.reservationId,
        restore_rate:0.2
      });
    },
    getAppointmentSlotsByJobId:(req_params) => {
      req_params = utils.checkAndEncodeParams(req_params, {
        path:{
          serviceJobId:{
            type:'string'
          }
        }
      });
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/service/v1/serviceJobs/' + req_params.path.serviceJobId + '/appointmentSlots',
        restore_rate:0.2
      });
    },
    getAppointmmentSlots:(req_params) => {
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/service/v1/appointmentSlots',
        restore_rate:0.05
      });
    },
    createServiceDocumentUploadDestination:(req_params) => {
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/service/v1/documents',
        restore_rate:0.2
      });
    }
  }
};