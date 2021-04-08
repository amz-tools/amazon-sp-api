const utils = require('../../../utils');

module.exports = {
  'v1':{
    getServiceJobByServiceJobId:(req_params) => {
    	utils.checkParams(req_params, {
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
    	utils.checkParams(req_params, {
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
    	utils.checkParams(req_params, {
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
    	utils.checkParams(req_params, {
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
    	utils.checkParams(req_params, {
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
    }
  }
};