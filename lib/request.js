const TimeoutManager = require('./TimeoutManager');
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
      headers:req_options.headers || {}
    };

    let post_params;
    if (req_options.body){
      post_params = req_options.body;
      options.headers['Content-Length'] = Buffer.byteLength(post_params);
    }

    let timeouts = new TimeoutManager(req_options.timeouts);
 
    let req = https.request(options, (res) => {
      let chunks = [];
      let body = '';
      res.on('data', (chunk) => {
        timeouts.onResData();
        body += chunk;
        chunks.push(chunk);
      });
      res.on('end', () => {
        timeouts.onResEnd();
        resolve({
          body:body,
          chunks:chunks,
          statusCode:res.statusCode,
          headers:res.headers
        });
      });
    });

    timeouts.init(req);

    req.on('error', (e) => {
      timeouts.onResEnd();
      reject(e);
    });
    if (post_params){
      req.write(post_params, 'utf8');
    }
    req.end();
  });
};
