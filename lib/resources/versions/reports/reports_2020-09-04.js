const utils = require('../../../utils');

module.exports = {
  '2020-09-04':{
    getReports:(req_params) => {
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/reports/2020-09-04/reports',
        restore_rate:45,
        deprecation_date: '2023-10-18'
      });
    },
    createReport:(req_params) => {
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/reports/2020-09-04/reports',
        restore_rate:60,
        deprecation_date: '2023-10-18'
      });
    },
    getReport:(req_params) => {
    	req_params = utils.checkAndEncodeParams(req_params, {
    		path:{
    			reportId:{
    				type:'string'
    			}
    		}
    	});
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/reports/2020-09-04/reports/' + req_params.path.reportId,
        restore_rate:0.5,
        deprecation_date: '2023-10-18'
      });
    },
    cancelReport:(req_params) => {
    	req_params = utils.checkAndEncodeParams(req_params, {
    		path:{
    			reportId:{
    				type:'string'
    			}
    		}
    	});
      return Object.assign(req_params, {
        method:'DELETE',
        api_path:'/reports/2020-09-04/reports/' + req_params.path.reportId,
        restore_rate:45,
        deprecation_date: '2023-10-18'
      });
    },
    getReportSchedules:(req_params) => {
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/reports/2020-09-04/schedules',
        restore_rate:45,
        deprecation_date: '2023-10-18'
      });
    },
    createReportSchedule:(req_params) => {
      return Object.assign(req_params, {
        method:'POST',
        api_path:'/reports/2020-09-04/schedules',
        restore_rate:45,
        deprecation_date: '2023-10-18'
      });
    },
    getReportSchedule:(req_params) => {
    	req_params = utils.checkAndEncodeParams(req_params, {
    		path:{
    			reportScheduleId:{
    				type:'string'
    			}
    		}
    	});
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/reports/2020-09-04/schedules/' + req_params.path.reportScheduleId,
        restore_rate:45,
        deprecation_date: '2023-10-18'
      });
    },
    cancelReportSchedule:(req_params) => {
    	req_params = utils.checkAndEncodeParams(req_params, {
    		path:{
    			reportScheduleId:{
    				type:'string'
    			}
    		}
    	});
      return Object.assign(req_params, {
        method:'DELETE',
        api_path:'/reports/2020-09-04/schedules/' + req_params.path.reportScheduleId,
        restore_rate:45,
        deprecation_date: '2023-10-18'
      });
    },
    getReportDocument:(req_params) => {
    	req_params = utils.checkAndEncodeParams(req_params, {
    		path:{
    			reportDocumentId:{
    				type:'string'
    			}
    		}
    	});
      return Object.assign(req_params, {
        method:'GET',
        api_path:'/reports/2020-09-04/documents/' + req_params.path.reportDocumentId,
        restore_rate:60,
        deprecation_date: '2023-10-18'
      });
    }
  }
};