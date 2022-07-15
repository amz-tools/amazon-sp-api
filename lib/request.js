const CustomError = require('./CustomError');
const https = require('https');
const { URL } = require('url');

module.exports = (req_options) => {
  return new Promise((resolve, reject) => {
    let url = new URL(req_options.url);
    let options = {
      method:req_options.method,
      port:443,
      hostname:url.hostname,
      path:url.pathname + url.search,
      headers:req_options.headers || {}
    };
    let post_params;
    if (req_options.body){
      post_params = req_options.body;
      options.headers['Content-Length'] = Buffer.byteLength(post_params);
    }

    // Set up timeouts if set in request options; destroy request & reject with error if exceeded
    //  - response timeout is time between sending request and receiving the first byte of the response. Includes DNS and connection time.
	//  - deadline is the time from start of the request to receiving response body in full. If the deadline is too short large files may not load at all on slow connections.
    let response_timeout_id = null;
    if (req_options.response_timeout) response_timeout_id = setTimeout(() => {   	
		req.destroy(new CustomError({	// req.destroy will cause an error event to be emitted, rejection is handled in error event handler
			code:'API_RESPONSE_TIMEOUT',
			message:'No data received within specified response timeout (' + req_options.response_timeout + 'ms).',
			timeout: req_options.response_timeout
		}));
    },req_options.response_timeout);   
    let deadline_timeout_id = null;
    if (req_options.deadline_timeout) deadline_timeout_id = setTimeout(() => {   	
		req.destroy(new CustomError({	// req.destroy will cause an error event to be emitted, rejection is handled in error event handler
			code:'API_DEADLINE_TIMEOUT',
			message:'Response was not completely received within specified deadline (' + req_options.deadline_timeout + 'ms).',
			timeout: req_options.deadline_timeout
		}));
    },req_options.deadline_timeout);
 
    let req = https.request(options, (res) => {
      let chunks = [];
      let body = '';
      let response_started = false;
      res.on('data', (chunk) => {
      	if(!response_started && response_timeout_id) {
      		 clearTimeout(response_timeout_id);
      		 response_started = true;
      	}
        body += chunk;
        chunks.push(chunk);
      });
      res.on('end', () => {
      	if(deadline_timeout_id) clearTimeout(deadline_timeout_id);
        resolve({
          body:body,
          chunks:chunks,
          statusCode:res.statusCode,
          headers:res.headers
        });
      });
    });

    req.on('error', (e) => {
      reject(e);
    });
    if (post_params){
      req.write(post_params, 'utf8');
    }
    req.end();
  });
};
