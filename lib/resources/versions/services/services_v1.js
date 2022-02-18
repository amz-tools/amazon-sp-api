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
        api_path:'/service/v1/serviceResources/' + req_params.path.resourceId + '/schedules'
      });
    },
    createReservation:(req_params) => {
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/service/v1/reservation'
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
        api_path:'/service/v1/reservation/' + req_params.path.reservationId
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
        api_path:'/service/v1/reservation/' + req_params.path.reservationId
      });
    },
    createServiceDocumentUploadDestination:(req_params) => {
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/service/v1/documents'
      });
    }
  }
};