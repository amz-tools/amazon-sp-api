const utils = require('../../../utils');

module.exports = {
  '2020-09-04':{
    getReports:(req_params) => {
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/reports/2020-09-04/reports',
        restore_rate:45
      });
    },
    createReport:(req_params) => {
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/reports/2020-09-04/reports',
        restore_rate:60
      });
    },
    getReport:(req_params) => {
    	utils.checkParams(req_params, {
    		path:{
    			reportId:{
    				type:'string'
    			}
    		}
    	});
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/reports/2020-09-04/reports/' + req_params.path.reportId,
        restore_rate:0.5
      });
    },
    cancelReport:(req_params) => {
    	utils.checkParams(req_params, {
    		path:{
    			reportId:{
    				type:'string'
    			}
    		}
    	});
      return Object.assign(req_params, {
        method:'DELETE',
        api_path:'/reports/2020-09-04/reports/' + req_params.path.reportId,
        restore_rate:45
      });
    },
    getReportSchedules:(req_params) => {
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/reports/2020-09-04/schedules',
        restore_rate:45
      });
    },
    createReportSchedule:(req_params) => {
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/reports/2020-09-04/schedules',
        restore_rate:45
      });
    },
    getReportSchedule:(req_params) => {
    	utils.checkParams(req_params, {
    		path:{
    			reportScheduleId:{
    				type:'string'
    			}
    		}
    	});
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/reports/2020-09-04/schedules/' + req_params.path.reportScheduleId,
        restore_rate:45
      });
    },
    cancelReportSchedule:(req_params) => {
    	utils.checkParams(req_params, {
    		path:{
    			reportScheduleId:{
    				type:'string'
    			}
    		}
    	});
      return Object.assign(req_params, {
        method:'DELETE',
        api_path:'/reports/2020-09-04/schedules/' + req_params.path.reportScheduleId,
        restore_rate:45
      });
    },
    getReportDocument:(req_params) => {
    	utils.checkParams(req_params, {
    		path:{
    			reportDocumentId:{
    				type:'string'
    			}
    		}
    	});
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/reports/2020-09-04/documents/' + req_params.path.reportDocumentId,
        restore_rate:60
      });
    }
  }
};