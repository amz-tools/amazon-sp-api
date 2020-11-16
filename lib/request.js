const https = require('https');

module.exports = (req_options) => {
  return new Promise((resolve, reject) => {
    let url = new URL(req_options.url);
    let options = {
      method:req_options.method || 'GET',
      port:443,
      hostname:url.hostname,
      path:url.pathname + url.search,
      headers:req_options.headers || {}
    };
    let post_params;
    if (['post','put'].includes(req_options.method.toLowerCase()) && req_options.query){
      post_params = req_options.query;
      options.headers['Content-Length'] = post_params.length;
    }
    let req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        resolve(body);
      });
    });

    req.on('error', (e) => {
      reject(e);
    });
    if (post_params){
      req.write(post_params);
    }
    req.end();
  });
};