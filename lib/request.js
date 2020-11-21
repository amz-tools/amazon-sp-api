const https = require('https');

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
    let req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        resolve({
          body:body,
          statusCode:res.statusCode
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